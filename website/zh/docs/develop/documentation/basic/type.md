# 类型系统

Taichi 支持常见的数值数据类型。 Taichi supports common numerical data types. Each type is denoted as a character indicating its _category_ and a number of _precision bits_, e.g., `i32` and `f64`.

数据的 _类别_ 可以是以下其中之一：

- `i`用于有符号整数，例如233，-666
- `u`用于无符号整数，例如233，666
- `f`用于浮点数，例如2.33, 1e-4

数据的 _精度位数_ 可以是以下其中之一：

- `8`
- `16`
- `32`
- `64`

It represents how many **bits** are used in storing the data. The larger the bit number, the higher the precision is. 位数值越大，则精度越高。

例如，下面是两种最常用的数据类型：

- `i32`表示一个32位有符号整数。
- `f32`表示一个32位浮点数。

## 支持的类型

目前，Taichi支持的基本类型有

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
Boolean types are represented using `ti.i32`. :::
:::

## 类型提升

Binary operations on different types will give you a promoted type, following the C programming language convention, e.g.:

- `i32 + f32 = f32` (integer + float = float)
- `i32 + i64 = i64` (less-bits + more-bits = more-bits)

Basically it will try to choose the more precise type to contain the result value.

## 默认精度

By default, all numerical literals have 32-bit precisions. For example, `42` has type `ti.i32` and `3.14` has type `ti.f32`. 例如，`42`的类型为`ti.i32`而`3.14`的类型为`ti.f32`。

Default integer and float-point precisions (`default_ip` and `default_fp`) can be specified when initializing Taichi:

```python
ti.init(default_fp=ti.f32)
ti.init(default_fp=ti.f64)

ti.init(default_ip=ti.i32)
ti.init(default_ip=ti.i64)
```

Also note that you may use `float` or `int` in type definitions as aliases for default precisions, e.g.:

```python
ti.init(default_ip=ti.i64, default_fp=ti.f32)

x = ti.field(float, 5)
y = ti.field(int, 5)
# is equivalent to:
x = ti.field(ti.f32, 5)
y = ti.field(ti.i64, 5)

def func(a: float) -> int:
    ...

# is equivalent to:
def func(a: ti.f32) -> ti.i64:
    ...

# 相当于:
def func(a: ti.f32) -> ti.i64:
    ...
```

## 类型转换

### 隐式类型转换

::: warning
The type of a variable is **determinated on it\'s initialization**. :::
:::

When a _low-precision_ variable is assigned to a _high-precision_ variable, it will be implicitly promoted to the _high-precision_ type and no warning will be raised:

```python {3}
a = 1.7
a = 1
print(a)  # 1.0
```

When a _high-precision_ variable is assigned to a _low-precision_ type, it will be implicitly down-cast into the _low-precision_ type and Taichi will raise a warning:

```python {3}
a = 1
a = 1.7
print(a)  # 1
```

### 显式类型转换

You may use `ti.cast` to explicitly cast scalar values between different types:

```python {2-3}
a = 1.7
b = ti.cast(a, ti.i32)  # 1
c = ti.cast(b, ti.f32)  # 1.0
```

Equivalently, use `int()` and `float()` to convert values to float-point or integer types of default precisions:

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

Use `ti.bit_cast` to bit-cast a value into another data type. The underlying bits will be preserved in this cast. The new type must have the same width as the the old type. For example, bit-casting `i32` to `f64` is not allowed. Use this operation with caution. 基础位将在此转换中保留。 新类型的宽度必须与旧类型的宽度相同。 例如，不允许将 `i32` 转换成 `f64`。 请谨慎使用此操作。

::: note
For people from C++, `ti.bit_cast` is equivalent to `reinterpret_cast`. :::
:::
