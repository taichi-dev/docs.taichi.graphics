# 场与矩阵

在 Taichi 中，场是全局变量。 场又分为稀疏场和稠密场。 Fields are global variables provided by Taichi. Fields can be either sparse or dense. An element of a field can be either a scalar or a vector/matrix.

::: note
Matrices can be used as field elements, so you can have fields with each element being a matrix. :::
:::

## 标量场

- 每一个全局变量都是一个 N-维场。

  - 全局`标量`被视为0-维的标量场。

- 我们始终使用索引来访问场

  - 例如： E.g. `x[i, j, k]` if `x` is a 3D scalar field.
  - Even when accessing 0-D field `x`, use `x[None] = 0` instead of `x = 0`. Please **always** use indexing to access entries in fields. 请**始终**使用索引访问场中的元素。

- 场的元素初始值全部为0。

- 稀疏场元素的初始状态是未被激活的。

- 请查看[标量场](../api/scalar_field.md)这一章节来了解更多详细信息。

## 矩阵场

场的元素可以是矩阵。

假设你有一个名为`A`的`128 x 64`的场，每一个元素都包含一个形状为`3 x 2`的矩阵。 Suppose you have a `128 x 64` field called `A`, each element containing a `3 x 2` matrix. To allocate a `128 x 64` matrix field which has a `3 x 2` matrix for each of its entry, use the statement `A = ti.Matrix.field(3, 2, dtype=ti.f32, shape=(128, 64))`.

- If you want to get the matrix of grid node `i, j`, please use `mat = A[i, j]`. `mat` is simply a `3 x 2` matrix `mat`是一个`3 x 2`的矩阵
- To get the element on the first row and second column of that matrix, use `mat[0, 1]` or `A[i, j][0, 1]`.
- As you may have noticed, there are **two** indexing operators `[]` when you load an matrix element from a global matrix field: the first is for field indexing, the second for matrix indexing.
- `ti.Vector`其实只是`ti.Matrix`的别名。
- 有关矩阵的更多信息，请参见 [Matrices](../api/matrix.md) 。

## 矩阵大小

出于性能原因，矩阵操作的运算将被展开，因此我们建议仅使用小型的矩阵。 For performance reasons matrix operations will be unrolled, therefore we suggest using only small matrices. For example, `2x1`, `3x3`, `4x4` matrices are fine, yet `32x6` is probably too big as a matrix size.

::: warning
Due to the unrolling mechanisms, operating on large matrices (e.g. `32x128`) can lead to very long compilation time and low performance. :::
:::

如果你的矩阵的某维度很大（例如`64`），则最好定义一个大小为`64`的场。 If you have a dimension that is too large (e.g. `64`), it\'s better to declare a field of size `64`. E.g., instead of declaring `ti.Matrix.field(64, 32, dtype=ti.f32, shape=(3, 2))`, declare `ti.Matrix.field(3, 2, dtype=ti.f32, shape=(64, 32))`. Try to put large dimensions to fields instead of matrices. 始终把大的维度放在场中而非矩阵中。
