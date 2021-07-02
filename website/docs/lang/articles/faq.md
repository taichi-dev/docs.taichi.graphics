---
sidebar_position: 9999
---

# Frequently Asked Questions

## My `pip` complains `package not found` when installing Taichi

You may have a Python interpreter with an unsupported version. Currently, Taichi only supports Python 3.6/3.7/3.8 (64-bit) . For more information about installation related issues, please check [Installation Troubleshooting](./misc/install.md).

## Does Taichi provide built-in constants such as `ti.pi`

There is no built-in type for `pi` currently, `math.pi` is recommended to use in Taichi.

## How to **force** an outer-most loop to be serialized , i.e.,  **not parallelized**

A good practice is adding an additional `ghost` loop with only one iteration outside the loop you care about.

```python {1}
for _ in range(1):  # The 'ghost' loop will be parallelized, but with only one thread i.e., serialized execution
    for i in range(100):  # The loop you actually cares about will not be parallelized
        ...
```

## What's the most convenient way to load images or textures into Taichi fields

One feasible solution is `field.from_numpy(ti.imread('filename.png'))`.

## Can Taichi interact with **other Python packages** such as `matplotlib`?

Yes, Taichi supports various popular Python packages, please check [Interacting with other Python packages](/docs/#interacting-with-other-python-packages).

## How to declare a field with **dynamic length**

The `dynamic` SNode supports variable-length fields. It serves as the role of `std::vector` in C++ or `list` in Python, please check [Working with dynamic SNodes](../api/snode.md#working-with-dynamic-snodes) for more details.

:::tip
An alternative solution is allocating a large enough `dense` field, with another 0-D field
`field_len[None]` tracking its length. In practice, programs allocating memory using `dynamic`
SNode may be less efficient than using `dense` SNode, due to the overhead of
maintaining the sparsity information.
:::

## How to  interact with irregular topologies (e.g., graphs or tetrahedral meshes) 

These structures have to be stored in 1D fields in Taichi. You can traversal them using either `for element in x` or `for index in range(n)`.
