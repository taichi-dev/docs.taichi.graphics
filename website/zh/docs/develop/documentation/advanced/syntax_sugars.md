# 语法糖

## 别名

有时为命名繁琐的全局变量和函数创建别名可以提高可读性。 Creating aliases for global variables and functions with cumbersome names can sometimes improve readability. In Taichi, this can be done by assigning kernel and function local variables with `ti.static()`, which forces Taichi to use standard python pointer assignment.

例如，考虑下面这个简单的内核：

```python
@ti.kernel
def my_kernel():
    for i, j in field_a:
        field_b[i, j] = some_function(field_a[i, j])
```

场和函数使用`ti.static`别名为新名称：

```python {3}
@ti.kernel
def my_kernel():
    a, b, fun = ti.static(field_a, field_b, some_function)
    for i, j in a:
        b[i, j] = fun(a[i, j])
```

Aliases can also be created for class members and methods, which can help prevent cluttering objective data-oriented programming code with `self`.

例如，考虑使用类内核来计算某个场的二维拉普拉斯算子：

```python
@ti.kernel
def compute_laplacian(self):
  for i, j in a:
    self.b[i, j] = (self.a[i + 1, j] - 2.0*self.a[i, j] + self.a[i-1, j])/(self.dx**2) \
                 + (self.a[i, j + 1] - 2.0*self.a[i, j] + self.a[i, j-1])/(self.dy**2)
```

使用`ti.static()`，这可以简化为：

```python {3-6}
@ti.kernel
def compute_laplacian(self):
    a, b, dx, dy = ti.static(self.a, self.b, self.dx, self.dy)
    for i, j in a:
        b[i, j] = (a[i+1, j] - 2.0*a[i, j] + a[i-1, j])/(dx**2) \
                + (a[i, j+1] - 2.0*a[i, j] + a[i, j-1])/(dy**2)
```

::: note
`ti.static` 还可与其他语法结合使用：

- `if` (compile-time branching) and
- `for`（编译时展开）

更多相关详细信息，请参见[元编程](./meta.md)章节。

Here, we are using it for _compile-time const values_, i.e. the **field/function handles** are constants at compile time. :::
:::
