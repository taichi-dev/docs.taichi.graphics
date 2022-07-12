---
title: "Taichi & Torch 02: Data containers in Torch & Taichi"
date: "2022-03-26"
slug: "Taichi-torch-data-containers"
authors:
  - Ailzhang
tags: [Taichi, Torch, data container, field, tensor, array, elements, data transfer, abstraction]
---

In this blog post I'll briefly talk about the data containers in Taichi and Torch. As you might have already known, both Taichi and Torch have a core concept of multi-dimensional array containers, called taichi.field and torch.Tensor respectively. They, as well as numpy.arrays, share a lot in common so users might think they're exactly the same. Therefore, we want to share a few interesting differences in this blog so that new users don't get confused by similar names or usages.

<!--truncate-->

## 1. Elements of a Taichi field can have a shape or structure.

To be more specific, an element of `torch.Tensor` can only be a scalar or a complex number while a Taichi field element can be a scalar, vector, matrix or a user-defined struct. This difference between the two containers stems from their targeting applications.

For instance, if you need a vector of 3 dimensions (r, g, b) to represent the color of a pixel, then you can create a field of 3d vectors in Taichi:

```python
x = ti.Vector.field(n=3, shape=(12, 13), dtype=ti.f32, layout=ti.Layout.AOS)
```

And in PyTorch you can create a tensor with shape (height , width, 3) where the last dimension implicitly represents the channels:

```python
x = torch.zeros((height, width, 3), dtype=torch.float)
```

A few things that are worth noticing here:

- PyTorch Tensor are generally multi-dimensional arrays and their axes don't usually have an explicit meaning. But Taichi is designed for graphics applications where elements often map to an existing object, like the RGB channels of a pixel in an image or coordinates of a particle in a 2D plane.
- Both Taichi and Torch allow more flexible layout options, so that users can optimize performance according to their memory access pattern.
  - Torch offers different memory formats specifying the mapping from Tensor dimensions to their real meanings, such as NCHW and NHWC.
  - With `ti.Layout.AOS` ,  the 3 scalars in the vector element are placed contiguously in memory, which means accessing all three scalars together will be blazing fast. Moreover, Taichi provides `SOA` layout and hierarchical data structure support through the "structure node". I won't delve into the details here. Please take a look at [this doc](https://docs.taichi-lang.org/docs/layout) if you are interested.

## 2. Different granularity in abstraction

Now let's temporarily ignore the shape of Taichi field elements and focus on the dense arrays of scalars below. Can you tell that there is difference between the two containers in the following case?

The answer is yes. One noticeable difference is that *in* *the* *Torch land you mostly use a Tensor as a whole, while in Taichi* *you* *operate at* *the* *element level*. Let's look a closer look:

```python
# Torch
# x is a Tensor of shape [B, H, W]

def forward(self, x):
    x = self.conv1(x)
    x = F.relu(x)
    x = self.conv2(x)
    x = F.relu(x)
    x = F.max_pool2d(x, 2)
    x = self.dropout1(x)
    x = torch.flatten(x, 1)
    y = x[0][0][0]

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

See? Although you are able to index a tensor, Torch mostly abstracts away the tensor elements. Each torch operator may be parallelized over all elements inside, but the parallelization is a black box for the users. On the other hand, Taichi automatically parallelizes the top-level for-loop in a Taichi kernel. So Taichi users think and operate at the element level and they have to be aware of the parallelization happening inside a Taichi kernel.

## 3. Data transfer between Taichi field and Torch tensor

You can exchange data between Taichi field and Torch tensor easily using the [from_torch](https://docs.taichi-lang.org/api/taichi/#taichi.Field.from_torch) and [to_torch](https://docs.taichi-lang.org/api/taichi/#taichi.Field.to_torch) APIs. But please be mindful that these APIs explicitly deep copy the data during transfer.

Luckily for those who want to save this extra copy, a Taichi kernel can seamlessly take a Torch tensor as input without having to copy it to a Taichi field. We'll show you a demo in the next blog. Please see "[Interacting with external arrays](https://docs.taichi-lang.org/docs/external)" if you are interested.

## Nits:

- Small syntax differences in accessing tensor and field.

```Bash
# Accessing element in a torch tensor

Tensor[i][j]

# Accessing element in a taichi field

field[i, j]
```

- Vectors and matrices are flattened at Taichi compile time. For the sake of performance, Taichi only supports small vectors and matrices instead of those of arbitrary shapes.

In the next blog we'll show you a demo of using taichi kernel inside a torch program to get the best of both worlds. Stay tuned!