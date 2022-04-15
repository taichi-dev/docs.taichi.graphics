---
title: "AST refactoring"
date: "2022-04-13"
slug: "ast-refactoring"
authors:
  - lin-hitonami
tags: [Taichi, AST, abstract syntax tree]
---

```python
Simple is better than complex.
```

In the previous blog post, we mentioned this sentence, which is a part of the zen of Python. In this post, we will show you how we simplified the code of Taichi.
We have refactored the Abstract Syntax Tree (AST) transformer of taichi in the past few months. The error reporting experience has improved dramatically after the refactor. This blog mainly talks about why and how we did that.

<!--truncate-->

As shown in this picture from [Life of a kernel](https://docs.taichi-lang.org/lang/articles/compilation), the AST transformer (currently the `ASTTransformer` class in `taichi/python/taichi/lang/ast/ast_transformer.py`) traverses the AST of a python function decorated by `@ti.kernel` and `@ti.func`, and generates the corresponding Taichi AST in C++.

The C++ part of taichi provides interfaces for python to build the Taichi AST through [pybind11](https://github.com/pybind/pybind11), a foreign function interface (FFI) library between C++ and python. Pybind11 generates a dynamic library file (`taichi_core.so` on linux and mac, and `taichi_core.pyd` on Windows), and Python can import the file and use the file as a module (currently `taichi._lib.core`). 

In Python, we can call functions in the FFI module to form the Taichi AST in C++.

For example, to build the Taichi AST of the following program:

```python
@ti.kernel
def absolute(a: ti.i32) -> ti.i32:
    ret = 0
    if a >= 0:
        ret = a
    else:
        ret = -a
    return ret
```

We need to execute the following code sequentially (simplified):

```python
import taichi as ti
from taichi._lib import core

# return type
core.decl_ret(ti.i32)

# kernel arguments
a = core.make_arg_load_expr(0, ti.i32)

# local variable
ret = core.expr_var(Expr(0).ptr)

# if condition
core.begin_frontend_if(Expr(a >= 0).ptr)

# if true
core.begin_frontend_if_true()
ret.assign(a)
core.pop_scope()

# else
core.begin_frontend_if_false()
ret.assign(-a)
core.pop_scope()

# return
core.create_kernel_return(Expr(ret).ptr)
```

### `Expr` class

`Expr` is a class that represents all expressions in the python frontend. For example, `a`, and `ret` are both `Expr`s. 

When `Expr` is initialized, it typically calls the functions in `core` to generate the corresponding Taichi AST node and stores the pointer to the node in `ptr`. If it is initialized with an `Expr`, it just copies the pointer of the source `Expr`.

An expression in which `Expr` operates with another `Expr` or python variable, for example `a >= 0`, is also an `Expr`.

## The transformer before refactoring and its drawbacks

The transformer before refactoring works as follows. The transformer first transforms the original AST of the program to the AST representing the code above. After that, we compile the AST to a function, and then execute the function to get the Taichi AST. 

However, this process has several drawbacks. 

First, it makes the code hard to understand. Writing code that manipulates Python AST is not trivial, and it often involves many magic numbers. What you get is not what you see. 

Second, it is hard to get a clean and accurate error message. Before refactoring, the original traceback was very long, and the place where the error occurs hide in the middle of the long traceback. Shortening traceback while preserving the useful information about where the exception is from is hard by catching and re-raising the exception with no traceback because the exception often occurs inside a compiled function, and catching exceptions inside it is difficult. We tried to customize an exception hook to filter out the frames of unnecessary internal function calls, but we need to mark the functions that need to be filtered one by one, which is hard labor. 

## The new transformer

Instead of transforming the AST of the original function to a function that generates the Taichi AST, the new transformer traverses the AST and generates the Taichi AST on the fly. Instead of using Python to evaluate, the transformer evaluates all the expressions by itself.

### Variable set to variable dictionary

#### Old transformer

To simulate a C-like scope in Python, the old transformer uses a variable set to track the defined variable names of each scope, and add `del` statements of the variables when exiting the scope . Because the code is eventually executed by Python, we do not need to store the real variable in the old transformer.

```python
@ti.kernel
def square_sum(n: ti.i32) -> ti.i32:
    s = 0
    for i in range(n):
        a = i * i
        s += a
        del a  # inserted del
        del i  # inserted del
    return s
```

##### Old code

```python
class ScopeGuard:
    def __init__(self, scopes, stmt_block=None):
        self.scopes = scopes
        self.stmt_block = stmt_block

    def __enter__(self):
        self.scopes.append([])

    def __exit__(self, exc_type, exc_val, exc_tb):
        local = self.scopes[-1]
        if self.stmt_block is not None:
            for var in reversed(local):
                stmt = parse_stmt('del var')
                stmt.targets[0].id = var
                self.stmt_block.append(stmt)
        self.scopes.pop()

class BuilderContext:
    def __init__(self, ...)
        ...
        self.local_scopes = []       
    def variable_scope(self, *args):
        return ScopeGuard(self.local_scopes, *args)
       
    def current_scope(self):
        return self.local_scopes[-1]
       
    def var_declared(self, name):
        for s in self.local_scopes:
            if name in s:
                return True
        return False

    def create_variable(self, name):
        if name in self.current_scope():
            raise TaichiSyntaxError("Recreating variables is not allowed")
        self.current_scope().append(name)
```

#### New transformer

However, the new transformer needs to manage the variables by itself. Therefore, it needs a stack of variable dictionaries that can find the variable in the scope by name. A new dictionary is pushed in to the stack when entering a new scope, and the dictionary on the top is popped when exiting a scope.

```python
@ti.kernel
def square_sum(n: ti.i32) -> ti.i32:
    # [{"n": Expr_n}]
    s = 0
    # [{"n": Expr_n, "s": Expr_s}]
    for i in range(n):  # Entering scope, push stack
        # [{"n": Expr_n, "s": Expr_s}, {"i": Expr_i}]
        a = i * i
        # [{"n": Expr_n, "s": Expr_s}, {"i": Expr_i, "a": Expr_a}]
        s += a
        # [{"n": Expr_n, "s": Expr_s}, {"i": Expr_i, "a": Expr_a}]
        # leaving scope, pop stack
    # [{"n": Expr_n, "s": Expr_s}]
    return s
```

##### New code

```python
class VariableScopeGuard:
    def __init__(self, scopes):
        self.scopes = scopes
        
    def __enter__(self):
        self.scopes.append({})

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.scopes.pop()
       
class ASTTransformerContext:
    def __init__(self, ...)
        ...
        self.local_scopes = []
       
    def variable_scope_guard(self):
        return VariableScopeGuard(self.local_scopes)
        
    def current_scope(self):
        return self.local_scopes[-1]

    def is_var_declared(self, name):
        for s in self.local_scopes:
            if name in s:
                return True
        return False

    def create_variable(self, name, var):
        if name in self.current_scope():
            raise TaichiSyntaxError("Recreating variables is not allowed")
        self.current_scope()[name] = var

    def get_var_by_name(self, name):
        for s in self.local_scopes:
            if name in s:
                return s[name]
        if name in self.global_vars:
            return self.global_vars[name]
        try:
            return getattr(builtins, name)
        except AttributeError:
            raise TaichiNameError(f'Name "{name}" is not defined')
```

As shown in the code, when we meet a name in the code, we first search in the variable dictionary of every scope, and then in the global variables of the kernel/function when it is called, and finally in the built-in functions. 

## Translating nodes from the previous AST builder

Unlike the previous transformer, the new transformer processes expressions by itself. So, we need to maintain the expression of every node in the transformer. We record the expression of a node in `node.ptr`. The return value of `build_xxx` is `node.ptr` if the node is an expression node, and `None` if the node is a statement node.

```python
@staticmethod
def build_BinOp(ctx, node):
    build_stmt(ctx, node.left)
    build_stmt(ctx, node.right)
    op = {
        ast.Add: lambda l, r: l + r,
        ast.Sub: lambda l, r: l - r,
        ast.Mult: lambda l, r: l * r,
        ast.Div: lambda l, r: l / r,
        ...
    }.get(type(node.op))
    node.ptr = op(node.left.ptr, node.right.ptr)
    return node.ptr
```

We use `build_stmt` and `build_stmts` to process and record the expressions. They call the `__call__` function in AST transformer which calls `build_xxx` functions in the transformer corresponding to the type of `node`.  

Then, we need to translate the code generated by the previous transformer to the new transformer.

For example, this is the `build_If` function in the previous transformer. 

```python
    @staticmethod
    def build_If(ctx, node):
        node.test = build_expr(ctx, node.test)
        node.body = build_stmts(ctx, node.body)
        node.orelse = build_stmts(ctx, node.orelse)

        is_static_if = StmtBuilder.get_decorator(node.test) == "static"

        if is_static_if:
            # Do nothing
            return node

        template = '''
if 1:
  __cond = 0
  ti.begin_frontend_if(__cond)
  ti.core.begin_frontend_if_true()
  ti.core.pop_scope()
  ti.core.begin_frontend_if_false()
  ti.core.pop_scope()
'''
        t = ast.parse(template).body[0]
        cond = node.test
        t.body[0].value = cond
        t.body = t.body[:5] + node.orelse + t.body[5:]
        t.body = t.body[:3] + node.body + t.body[3:]
        return ast.copy_location(t, node)
```

And this is the function in the new transformer.

```python
@staticmethod
def build_If(ctx, node):
    build_stmt(ctx, node.test)
    is_static_if = ASTTransformer.get_decorator(ctx, node.test) == "static"

    if is_static_if:
        if node.test.ptr:
            build_stmts(ctx, node.body)
        else:
            build_stmts(ctx, node.orelse)
        return node

    with ctx.non_static_control_flow_guard():
        impl.begin_frontend_if(node.test.ptr)
        core.begin_frontend_if_true()
        build_stmts(ctx, node.body)
        core.pop_scope()
        core.begin_frontend_if_false()
        build_stmts(ctx, node.orelse)
        core.pop_scope()
    return None
```

We can see that magic numbers have gone, and we do not need to convert strings to ASTs anymore. The code becomes easier to understand.

In line 13, there is a non-static control flow guard. It is for dealing with return statements, which we will elaborate in the next section.

## Dealing with return

Currently, Taichi only supports one return statement, and the return statement must not appear in scopes inside non-static if/for/while. 

To enforce this rule, we added `NonStaticControlFlowGuard` to record whether the current scope is inside a non-static control flow. 

```python
class NonStaticControlFlowStatus:
    def __init__(self):
        self.is_in_non_static_control_flow = False

class NonStaticControlFlowGuard:
    def __init__(self, status):
        self.status = status

    def __enter__(self):
        self.prev = self.status.is_in_non_static_control_flow
        self.status.is_in_non_static_control_flow = True

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.status.is_in_non_static_control_flow = self.prev

class ASTTransformerContext:
    def __init__(self, ...):
        ...
        self.non_static_control_flow_status = NonStaticControlFlowStatus()

    def is_in_non_static_control_flow(self):
        return self.non_static_control_flow_status.is_in_non_static_control_flow
```

We maintain a flag in the context, which indicates whether the transformer has met a return statement. After meeting a return statement, the transformer stops processing statements after the return statement.

```python
@staticmethod
def build_Return(ctx, node):
    if ctx.is_in_non_static_control_flow():
        raise TaichiSyntaxError(
            "Return inside non-static if/for is not supported")
    ...
    ctx.returned = True
def build_stmts(ctx, stmts):
    with ctx.variable_scope_guard():
        for stmt in stmts:
            if ctx.returned or ctx.loop_status() != LoopStatus.Normal:
                break
            else:
                build_stmt(ctx, stmt)
    return stmts
```

In line 4 of `build_stmts`, we can see that besides `ctx.returned`, `ctx.loop_status()` can also make the transformer stop processing statements in a scope. This is for dealing with `break` and `continue` statements in compile-time loop unrolling, which we will elaborate in the following section.

## Dealing with break and continue in compile-time loop unrolling

Taichi supports compile-time evaluation, including [compile-time loop unrolling](https://docs.taichi.graphics/lang/articles/advanced/meta#when-to-use-tistatic-with-for-loops) with `break` and `continue`. You can wrap the loop iterator with `ti.static` in `for` to let the compiler unroll the loop for you, like `for i in ti.static(range(10))`. It is also called static loop.

In the previous transformer, the logic of `for`, `break`, and `continue` are all handled by the Python interpreter when running the compiled function, and the transformer does not need to deal with it. However, the new transformer must handle it by itself. 

### Distinction between normal loop and static loop

In order to determine whether we are in a static loop, we introduce `LoopScopeGuard` to track the loop type of every loop. `LoopScopeGuard` manages the stack of loops in the transformer context which records whether a loop is static or not. A normal loop is also a non-static control flow, so we embed a `NonStaticControlFlowGuard` inside `LoopScopeGuard` if the loop is a normal loop.

### Stop processing after static break/continue

For normal loops, we only need to insert a statement to the program and process normally.

However, for static loops, we need to tell the transformer to stop processing statements after the break or continue statements inside the loop. Therefore, we also keep a `LoopStatus` in the stack to record if a static loop encounters break or continue statements. 

```python
class LoopStatus(Enum):
    Normal = 0
    Break = 1
    Continue = 2

class LoopScopeAttribute:
    def __init__(self, is_static):
        self.is_static = is_static
        self.status = LoopStatus.Normal

class LoopScopeGuard:
    def __init__(self, scopes, non_static_guard=None):
        self.scopes = scopes
        self.non_static_guard = non_static_guard

    def __enter__(self):
        self.scopes.append(LoopScopeAttribute(self.non_static_guard is None))
        if self.non_static_guard:
           self.non_static_guard.__enter__()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.scopes.pop()
        if self.non_static_guard:
            self.non_static_guard.__exit__(exc_type, exc_val, exc_tb)

class ASTTransformerContext:
    def __init__(self, ...):
        ...
        self.loop_scopes = []

    def loop_scope_guard(self, is_static=False):
        if is_static:
            return LoopScopeGuard(self.loop_scopes)
        return LoopScopeGuard(self.loop_scopes,
                              self.non_static_control_flow_guard())

    def loop_status(self):
        if self.loop_scopes:
            return self.loop_scopes[-1].status
        return LoopStatus.Normal
@staticmethod

def build_static_for(ctx, node, ...):
    with ctx.loop_scope_guard(is_static=True):
        ...
        for target_values in node.iter.ptr:
            with ctx.variable_scope_guard():
                ...
                build_stmts(ctx, node.body)
                status = ctx.loop_status()
                if status == LoopStatus.Break:
                    break
                elif status == LoopStatus.Continue:
                    ctx.set_loop_status(LoopStatus.Normal)

@staticmethod
def build_Break(ctx, node):
    if ctx.is_in_static_for():
        ctx.set_loop_status(LoopStatus.Break)
    else:
        core.insert_break_stmt()
    return None
```

## Function inlining

Because different functions have different variable scopes, the inlined function does not have to know anything about the functon that calls it. We only need to pass arguments to it and then transform it just as we transform a kernel, and finally collect the return value from it.

First of all, we store the return value of the inlined function in the transformer context.

```python
@staticmethod
def build_Return(ctx, node):
    ...
    build_stmt(ctx, node.value)
    if not ctx.is_kernel:  # Transforming a function instead of a kernel
        ctx.return_data = node.value.ptr
    else:
        ...
    ...
    return None
```

Then, we make class `Func` (which is the object that a function transforms to after being decorated by `@``ti.func`) callable, and let it return the return value.

```python
def transform_tree(tree, ctx: ASTTransformerContext):
    ASTTransformer()(ctx, tree)
    return ctx.return_data

class Func:
    ...
    def __call__(self, *args):
        ...
        tree, ctx = _get_tree_and_ctx(self, is_kernel=False, args=args)
        ret = transform_tree(tree, ctx)
        ...
        return ret
```

Then, when the transformer meets a call to function decorated with `@ti.func`, we can inline the function and get the return value simply by making a call as if it is a normal Python function.

```python
@staticmethod
def build_Call(ctx, node):
    ...
    build_stmt(ctx, node.func)
    build_stmts(ctx, node.args)
    build_stmts(ctx, node.keywords)

    args, keywords = process_args(node.args, node.keywords)
    func = node.func.ptr  # The Func object
    ...
    node.ptr = func(*args, **keywords)  # returns the return value
    ...
    return node.ptr
```

## Error reporting

### Place to catch exceptions

The best place to catch exceptions is the `__call__` function in AST transformer because it is called when visiting every nodes in the AST.

```python
def __call__(self, ctx, node):
    method = getattr(self, 'build_' + node.__class__.__name__, None)
    try:
        ...
        return method(ctx, node)
    except Exception as e:
        if ctx.raised or not isinstance(node, (ast.stmt, ast.expr)):
            raise e.with_traceback(None)
        ctx.raised = True
        e = handle_exception_from_cpp(e)
        if not isinstance(e, TaichiCompilationError):
            msg = ctx.get_pos_info(node) + traceback.format_exc()
            raise TaichiCompilationError(msg) from None
        msg = ctx.get_pos_info(node) + str(e)
        raise type(e)(msg) from None
```

### Generating the stack information

AST nodes in Python after version 3.8 have detailed information about the node like the line number and column number that the code of the node starts and ends in the file, and we can get the file name and the code using inspect module in python. Therefore, we can show the accurate position to users when an exception happens.

For the following program, 

```python
import taichi as ti

ti.init()
@ti.func
def baz():
    a = 1 + 2j

@ti.func
def bar():
    baz()

@ti.kernel
def foo():
    bar()

foo()
```

The traceback of Taichi 0.8.11 looks like this:

```
Traceback (most recent call last):
  File "/home/lin/tmp/error.py", line 17, in <module>
    foo()
  File "/home/lin/taichi2/python/taichi/lang/kernel_impl.py", line 739, in wrapped
    raise type(e)('\n' + str(e)) from None
taichi.lang.exception.TaichiTypeError: 
On line 15 of file "/home/lin/tmp/error.py":
    bar()
    ^^^^^
On line 11 of file "/home/lin/tmp/error.py":
    baz()
    ^^^^^
On line 7 of file "/home/lin/tmp/error.py":
    a = 1 + 2j
    ^^^^^^^^^^
Invalid constant scalar data type: <class 'complex'>
```

The traceback of Taichi 0.8.2 (before refactoring) looks like this:

```
Traceback (most recent call last):
  File "error.py", line 17, in <module>
    foo()
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 709, in wrapped
    return primal(*args, **kwargs)
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 636, in __call__
    key = self.ensure_compiled(*args)
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 627, in ensure_compiled
    self.materialize(key=key, args=args, arg_features=arg_features)
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 493, in materialize
    taichi_kernel = _ti_core.create_kernel(taichi_ast_generator,
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 488, in taichi_ast_generator
    compiled()
  File "error.py", line 15, in foo
    bar()
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 76, in decorated
    return fun.__call__(*args)
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 156, in __call__
    ret = self.compiled(*args)
  File "error.py", line 11, in bar
    baz()
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 76, in decorated
    return fun.__call__(*args)
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py", line 156, in __call__
    ret = self.compiled(*args)
  File "error.py", line 7, in baz
    a = 1 + 2j
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/util.py", line 196, in wrapped
    return func(*args, **kwargs)
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/impl.py", line 57, in expr_init
    return Expr(_ti_core.expr_var(Expr(rhs).ptr))
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/expr.py", line 33, in __init__
    self.ptr = impl.make_constant_expr(arg).ptr
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/util.py", line 196, in wrapped
    return func(*args, **kwargs)
  File "/home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/impl.py", line 414, in make_constant_expr
    raise ValueError(f'Invalid constant scalar expression: {type(val)}')
ValueError: Invalid constant scalar expression: <class 'complex'>
```

The traceback of Taichi 0.8.2 using the customized exception hook looks like this:

```
========== Taichi Stack Traceback ==========
In <module>() at ./error.py:17:
--------------------------------------------
@ti.kernel
def foo():
    bar()

foo()  <--
--------------------------------------------
In ensure_compiled() at /home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/kernel_impl.py:627:
--------------------------------------------

    def ensure_compiled(self, *args):
        instance_id, arg_features = self.mapper.lookup(args)
        key = (self.func, instance_id)
        self.materialize(key=key, args=args, arg_features=arg_features)  <--
        return key
--------------------------------------------
In foo() at ./error.py:15:
--------------------------------------------
    baz()
@ti.kernel
def foo():
    bar()  <--
foo()
--------------------------------------------
In bar() at ./error.py:11:
--------------------------------------------
    a = 1 + 2j
@ti.func
def bar():
    baz()  <--
@ti.kernel
--------------------------------------------
In baz() at ./error.py:7:
--------------------------------------------
ti.init(excepthook=True)

@ti.func
def baz():
    a = 1 + 2j  <--
@ti.func
--------------------------------------------
In expr_init() at /home/lin/anaconda3/envs/test38/lib/python3.8/site-packages/taichi-0.8.2-py3.8-linux-x86_64.egg/taichi/lang/impl.py:57:
--------------------------------------------
            return rhs
        elif hasattr(rhs, '_data_oriented'):
            return rhs
        else:
            return Expr(_ti_core.expr_var(Expr(rhs).ptr))  <--

--------------------------------------------
ValueError: Invalid constant scalar expression: <class 'complex'>
```

We can see that the traceback of Taichi 0.8.11 is significantly shorter than that of Taichi 0.8.2, and it contains all the information the user needs to know. The traceback of Taichi 0.8.2 is very long, and it hides the real cause inside a lot of redundant information. The traceback using the customized exception hook filters out many unnecessary stack frames but still exposes certain internal functions because the functions are marked manually, and it is hard to make sure every internal function is marked.

## Boundaries between Taichi and Python

### External functions

Expressions in Taichi kernels and Taichi functions are all evaluated in the transformer. However, if you call a function that is not decorated with `@ti.kernel` or `@ti.func`, the code within the function is executed directly by Python interpreter, and the transformer does not process it. The transformer calls internal functions when encountering some nodes, so the code may not work as expected if it is not processed by the transformer. 