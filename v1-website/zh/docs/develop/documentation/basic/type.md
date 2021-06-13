# 类型系统

Taichi 支持常见的数值数据类型。 每种类型都由：一个字符指明它的_类别_和一个数字指明它的_精度位数_，例如 `i32` 和 `f64`。

数据的_类别_可以是以下其中之一：

- `i` 用于有符号整数，例如 233，-666
- `u` 用于无符号整数，例如 233，666
- `f` 用于浮点数，例如 2.33, 1e-4

数据的_精度位数_可以是以下其中之一：

- `8`
- `16`
- `32`
- `64`

它表示存储数据时使用了多少**位**。 位数值越大，则精度越高。

例如，下面是两种最常用的数据类型：

- `i32` 表示一个 32 位有符号整数。
- `f32` 表示一个 32 位浮点数。

## 支持的类型

目前，Taichi 支持的基本类型有

- int8 `ti.i8`
- int16 `ti.i16`
- int32 `ti.i32`
- int64 `ti.i64`
- uint8 `ti.u8`
- uint16 `ti.u16`
- uint32 `ti.u32`
- uint64 `ti.u64`
- float32 `ti.f32`
- float64 `ti.f64`

::: note

每种后端支持的类型分别有：

| 类型  | CPU/CUDA | OpenGL | Metal | C source |
| --- | -------- | ------ | ----- | -------- |
| i8  | > OK     | > N/A  | > OK  | > OK     |
| i16 | > OK     | > N/A  | > OK  | > OK     |
| i32 | > OK     | > OK   | > OK  | > OK     |
| i64 | > OK     | > EXT  | > N/A | > OK     |
| u8  | > OK     | > N/A  | > OK  | > OK     |
| u16 | > OK     | > N/A  | > OK  | > OK     |
| u32 | > OK     | > N/A  | > OK  | > OK     |
| u64 | > OK     | > N/A  | > N/A | > OK     |
| f32 | > OK     | > OK   | > OK  | > OK     |
| f64 | > OK     | > OK   | > N/A | > OK     |

（OK：已支持，EXT：需要扩展支持，N/A：目前不支持）

::: note
布尔类型使用 `ti.i32` 表示。
:::

## 类型提升

不同类型间的二元运算将会发生数据类型提升，提升遵循 C 语言下的转换规则，例如：

- `i32 + f32 = f32` (integer + float = float)
- `i32 + i64 = i64` (less-bits + more-bits = more-bits)

简单地说，在发生数据提升时会尝试选择更精确的数据类型来包含结果值。

## 默认精度

默认情况下，所有的数值都具有 32 位精度。 例如，`42` 的类型为 `ti.i32` 而 `3.14` 的类型为 `ti.f32`。

可以在 Taichi 初始化时，（分别使用 `default_ip` 和 `default_fp` ）指定默认的整数和浮点精度：

```python
ti.init(default_fp=ti.f32)
ti.init(default_fp=ti.f64)

ti.init(default_ip=ti.i32)
ti.init(default_ip=ti.i64)
```

另外需要注意的是，你可以在类型定义时使用 `float` 或 `int` 作为默认精度的别名，例如：

```python
ti.init(default_ip=ti.i64, default_fp=ti.f32)

x = ti.field(float, 5)
y = ti.field(int, 5)
# 相当于:
x = ti.field(ti.f32, 5)
y = ti.field(ti.i64, 5)

def func(a: float) -> int:
    ...

# 相当于:
def func(a: ti.f32) -> ti.i64:
    ...
```

## 类型转换

### 隐式类型转换

变量的类型在它**初始化时决定**。
:::

当一个_低精度_变量被赋值给_高精度_变量时，它将被隐式提升为_高精度_类型，并且不会发出警告：

```python {3}
a = 1.7
a = 1
print(a)  # 1.0
```

当一个_高精度_变量被赋值给_低精度_类型时，它会被隐式向下转换为_低精度_类型，并且不会发出警告：

```python {3}
a = 1
a = 1.7
print(a)  # 1
```

### 显式类型转换

你可以使用 `ti.cast` 在不同类型之间显式地强制转换标量值：

```python {2-3}
a = 1.7
b = ti.cast(a, ti.i32)  # 1
c = ti.cast(b, ti.f32)  # 1.0
```

同样，可以使用 `int()` 和 `float()` 将标量值转换为默认精度的浮点或整数类型：

```python {2-3}
a = 1.7
b = int(a)    # 1
c = float(a)  # 1.0
```

### 向量和矩阵的类型转换

应用于向量/矩阵中的类型转换是逐元素的：

```python {2,4}
u = ti.Vector([2.3, 4.7])
v = int(u)              # ti.Vector([2, 4])
# 如果你使用的是 ti.i32 作为默认整型精度, 那么这相当于:
v = ti.cast(u, ti.i32)  # ti.Vector([2, 4])
```

### 位强制类型转换

使用 `ti.bit_cast` 将一个值按位转换为另一种数据类型。 基础位将在此转换中保留。 新类型的宽度必须与旧类型的宽度相同。 例如，不允许将 `i32` 转换成 `f64`。 请谨慎使用此操作。

::: note
对于熟悉 C++ 的开发者来说，`ti.bit_cast` 相当于 `reinterpret_cast`。
:::
