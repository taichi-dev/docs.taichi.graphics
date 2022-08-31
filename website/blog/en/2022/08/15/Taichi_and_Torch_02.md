---
title: "Taichi & PyTorch 02: Data containers"
date: "2022-08-15"
slug: "taichi_vs_torch_02"
authors:
  - Ailzhang
tags: [beginner, PyTorch]
---

In my last blog, I compared the purposes and design philosophies of Taichi Lang and PyTorch. Now, it's time to take a closer look at their data containers - the most essential part of any easy-to-use programming language.

Taichi calls its multi-dimensional array container `field`, and its counterpart in PyTorch is `tensor`. Speaking from my experience (as a former PyTorch developer and current Taichi compiler engineer), I think their major difference boils down to data types accommodated - `torch.Tensor` can only store scalars, while `ti.field` takes scalars, vectors, and matrices.

With this in mind, I am going to take a more micro perspective and elaborate on the usage of the two kinds of data containers in detail.

## Data interfaces

**Taichi's data interfaces**

Computer graphics engineers often find themselves in situations where they need to use multiple channels to represent a single attribute. The concept of "channel" is shared by many shading languages, such as GLSL. For example, we can describe a color with four channels - R, G, B, and A - and specify a 3D position with x, y, and z coordinates. 

To better serve computer graphics-related scenarios, Taichi's fields can take scalars, vectors, or matrices to allow more flexibility. We can access an element in a vector field either by indexing (such as `field[0]`) or by Swizzling (such as `field.r`, `field.g`, `field.x`, and `field.y`).

The following code block creates a field composed of 3D vectors, which represent pixels in a 512 x 512 frame with RGB color values:

```python
ti_image = ti.Vector.field(n=3, shape=(512, 512), dtype=ti.f32)
```

You can use `x[10, 20]` to easily access the color of the pixel whose position is (10, 20) and use `x[10, 20].r` to access the R value of this pixel. This provides an intuitive way to conduct math operations based on coordinates, vectors, or color values.

Considering that the elements of a vector or a matrix are unrolled at compile time, Taichi fields only support vectors and matrices of small sizes, such as vec3 and mat4x4.

**PyTorch's data interfaces**

PyTorch is designed for machine learning, and the tensor-based operations, including matrix multiplication, is the most essential feature it supports. The mathematical concept of tensor requires that `torch.Tensor` accepts scalars (including complex numbers) only. Users need to remember the physical attributes, if any, of a tensor's dimensions. 

To create a PyTorch data structure similar to the field `ti_image` as specified above, you can set a 3D tensor and implicitly denote RGB channels with the three values of the last dimension:

```python
torch_image = torch.zeros((height, width, 3), dtype=torch.float)
```

## Memory access

Despite their different data interfaces, both Taichi and PyTorch support flexible memory layouts for the sake of performance optimization.

In PyTorch, a tensor arranges memory access in the format of NCHW by default. However, users can change it by designating memory_format. The most used formats in machine learning are NHWC and NCHW:

- The order of the tensor values for NHWC: [batch, height, width, channels] (such as torch.channels_last)
- The order of the tensor values for NCHW: [batch, channels, height, width] (such as torch.contiguous_format)

In most cases, memory layout formats directly influence the performance of layers in a neural network. For instance, the convolutional layers on an NVDIA's Tensor Core GPU achieve the highest computing efficiency when the input tensors adopt the NHWC format¹, which grants the simultaneous access to all the channel values of each pixel. However, the Batchnorm layers perform better under the NCHW format. PyTorch enables flexible memory layout shifts so that users can choose whatever suits their scenarios best.

```python
input = torch.randn(1, 10, 32, 32)
model = torch.nn.Conv2d(10, 20, 1, 1)
model = model.to(memory_format=torch.channels_last)
output = model(input)
```

When it comes to Taichi, its default memory layout is `ti.Layout.AOS` (array of structures), which stores scalars in vector elements continuously. You should stick to the AOS layout when expecting fastest memory access - say, adding 1 to the x, y, and z coordinates of a positional vector. On top of it, Taichi invented a structural node (SNode) tree system to support `SOA`(structure of arrays) and more advanced hierarchical data structures, including the sparse data structure. Let me give a simple example of defining memory layout patterns in Taichi.

If we intend to traverse a bunch of 8x8 frames, we can treat each 8x8 pixel as a cell and place such cells continuously to maximize the speed of reading and writing data. At the same time, we are not obliged to stick to a certain layout thoughout as Taichi processes algorithms and data separately. Users are allowed to change the memory layout halfway without recoding `ti.kernel`, making it more than convenient to experiment on different layout patterns and test how performance is affected.

```python
import taichi as ti
ti.init(ti.cpu)
M = 64
N = 64
val = ti.field(ti.f32)
# 8x8 block major field
ti.root.dense(ti.ij, (M // 8, N // 8)).dense(ti.ij, (8, 8)).place(val)
# Or 16x16 block major field
# ti.root.dense(ti.ij, (M // 16, N // 16)).dense(ti.ij, (16, 16)).place(val)
# No need to update func kernel when you update `val`'s layout
@ti.kernel
def func():
    for i,j in val:
        val[i, j] = i + j
func()
print(val.to_numpy())
```

This is just a most straightforward case to give a basic understanding of how Taichi handles memory access. If you feel the example I provide here is short of the complexity of real-life scenarios, you are recommended to get more details on Taichi's doc [Fields (advanced)](https://docs.taichi-lang.org/docs/layout).

## Granularity of parallelism

Let's put aside the element shape of data containers for the moment and focus on the granularity of math operations allowed in Taichi and PyTorch.

Read the code block below before I reveal the answer:

```python
N = 64
m = 10
dt = 0.1
# Torch
vel = torch.randn(N, 2)
force = torch.randn(N, 2)
def forward(self, vel, force):
    vel += dt * force / m
    pos += vec * dt
    return pos
# Taichi
pos = ti.Vector.field(2, ti.f32, N)
vel = ti.Vector.field(2, ti.f32, N)
force = ti.Vector.field(2, ti.f32, N)
@ti.kernel
def update():
    dt = h / substepping
    for i in range(N):
        vel[i] += dt * force[i] / m
        pos[i] += dt * vel[i]
```

You may have noticed that Taichi and PyTorch iterate data on different levels. PyTorch prefers operations where a tensor is processed as a whole, such as the addition, subtraction, multiplication, and division of tensors or matrix multiplication. The operators are parallelized internally, but the implementation process is invisible to users. As a consequence, users have to combine operators in various ways if they want to manipulate elements in tensors. Unlike PyTorch, Taichi makes element-level operations transparent. The responsibility to decide which for loop should be parallelized lies with users.

The difference in the granularity level of parallelism is determined by the application scenarios they are designed for, hence the pros and cons of their own. For example, though it is cumbersome to operate on the element level in PyTorch, tensors remain a better option than Taichi fields when it comes to the multiplication of big matrices. 

## Data transfer between Taichi and PyTorch

Users can integrate Taichi and PyTorch to get the best out of both. Taichi provides two interfaces - from_torch() and to_torch() - to enable data transfer between the two frameworks. Please note that the data transfer we are talking about here is a deep copy in essence.

Deep copies, when conducted frequently, would impact the program performance significantly. Luckily, Taichi offers a way out - by importing tensors as Taichi kernels. In this way, Taichi kernels directly handle the memory of tensors without the need of deep copies, and the interaction between Taichi and PyTorch can bring out the best performance.

In my next blog, I will show you how to *call a Taichi kernel in a PyTorch program* to accelerate the pre-processing of training data and give the full play to the respective advantages of Taichi and PyTorch in the context of machine learning. But of course, you don't have to wait. Refer to Taichi's doc [Interacting with external arrays](https://docs.taichi-lang.org/docs/external) for detailed instructions and try it out first! Until then, stay tuned!

---
**Reference**

1. <https://docs.nvidia.com/deeplearning/performance/dl-performance-convolutional/index.html#tensor-layout>