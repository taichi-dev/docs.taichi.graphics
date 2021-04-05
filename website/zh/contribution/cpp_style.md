# C++ 代码风格规范

我们大体上遵循 [Google C++ 代码风格规范](https://google.github.io/styleguide/cppguide.html)。

## 命名规则

- 变量名称应当由小写词语通过下划线连接组成，例如 `llvm_context`。

- 类和结构体应当由首字母大写的词语组成，例如 `CodegenLLVM`。

- 请用由 `TI` 开头的形式来命名宏， 例如 `TI_INFO`，`TI_IMPLEMENTATION`。

  - 在碰到不可避免的情况以外我们不提倡在代码中使用宏。

- 文件名称应当由小写词语通过下划线连接组成，例如 `ir_printer.cpp`。

## 提倡的使用方法

- 在适当的情况下对局部变量添加 `auto` 关键字。
- 在必要的情况下添加 `override` 和 `const` 关键字。

## 不提倡的使用方法

- C语言中的既有范式：

  - `printf`（请使用 `fmtlib::print` ）。
  - `new` 和 `free`。 （请使用智能指针，例如 `std::unique_ptr，std::shared_ptr`，而不是手动管理所有关系）。
  - `#include <math.h>` （请使用 `#include <cmath>` ）。

- 异常 （我们正在**移除** Taichi 中所有 C++ 异常的使用）。

- 前缀成员函数，例如 `m_`，`_` 等。

- 在构造函数和析构函数中调用虚函数。

- 空指针 `NULL`（应当使用 `nullptr` ）。

- 在全局环境下使用 `using namespace std;`。

- `typedef`（应当使用 `using` ）。

## 自动格式化代码

- 请运行 `ti format`
