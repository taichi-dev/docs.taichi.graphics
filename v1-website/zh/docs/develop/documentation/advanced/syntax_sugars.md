# 语法糖

## 别名

有时为命名繁琐的全局变量和函数创建别名可以提高可读性。 在 Taichi 中，这可以通过使用 `ti.static()` 分配内核和函数局部变量实现，这会迫使 Taichi 使用标准的 python 指针分配。

例如，考虑下面这个简单的内核：

```python
@ti.kernel
def my_kernel():
    for i, j in field_a:
        field_b[i, j] = some_function(field_a[i, j])
```

场和函数使用 `ti.static` 别名为新名称：

```python {3}
@ti.kernel
def my_kernel():
    a, b, fun = ti.static(field_a, field_b, some_function)
    for i, j in a:
        b[i, j] = fun(a[i, j])
```

还可以为类成员和方法创建别名，这有助于防止含有 `self` 的面向对象编程代码混乱。

例如，考虑使用类内核来计算某个场的二维拉普拉斯算子：

```python
@ti.kernel
def compute_laplacian(self):
  for i, j in a:
    self.b[i, j] = (self.a[i + 1, j] - 2.0*self.a[i, j] + self.a[i-1, j])/(self.dx**2) \
                 + (self.a[i, j + 1] - 2.0*self.a[i, j] + self.a[i, j-1])/(self.dy**2)
```

使用 `ti.static()`，这可以简化为：

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

- `if`（编译时分支）和
- `for`（编译时展开）

更多相关详细信息，请参见[元编程](./meta.md)章节。

在这里，我们将其用于_编译时常量值_，即 **场/函数句柄** 在编译时是常量。
:::
