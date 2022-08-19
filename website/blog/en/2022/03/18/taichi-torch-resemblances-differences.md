---
title: "Taichi & Torch 01: Resemblances and Differences"
date: "2022-03-18"
slug: "Taichi-torch-resemblances-differences"
authors:
  - Ailzhang
tags: [beginner, internals, PyTorch]
---

"What is the advantage of Taichi over Pytorch or Tensorflow when running on GPU?" Not surprisingly, this is one of the top questions we've received in the Taichi user community. In this blog series we will walk you through some major concepts and components in Taichi and Torch, elaborating on the analogies and differences which might not be obvious at the first sight.

Let’s start with a simple fact. Except for some minor intersections, Taichi and Torch target almost completely different users and applications. Torch is always your first choice for deep learning tasks like computer vision, natural language processing and so on. Taichi, on the other hand, specializes in parallel high-performance numerical computational tasks and really comes in handy when it comes to physics simulation and visual computing tasks.

From a high-level perspective, Taichi looks very similar to Torch in the sense that their main goals are both to lower the bar for their users. Compared to the static computation graph-based Tensorflow 1.0, Torch eager mode changes the game by building the graph on the fly as your python program runs. Similarly, Taichi aims to enable more people to write high-performance parallel programs that used to require a lot of domain knowledge in CUDA, OpenGL, or Vulkan.

<!--truncate-->

Taichi and Torch also take a similar path to take advantage of Python's ecosystem by releasing as Python packages. In other words, you can simply type `pip install taichi` or `pip install torch` and install them just like any other well-known Python package.

With those many resemblances noted, here comes my main point in this blog post. There's a fundamental difference between Taichi and Torch, especially for Torch eager mode users. Eager mode PyTorch programs are executed by Python interpreter while Taichi transforms the Python AST to CHI IR and produces corresponding code/executables for the target backend to run. In other words, Taichi programs' execution is largely independent of Python's runtime.

Some of you may have noticed that a more appropriate analog of Taichi in Torch's ecosystem is actually TorchScript - the statically typed DSL which is a subset of Python designed specifically for ML applications, whose execution is also independent of Python's runtime.

Torch users don't often differentiate between eager mode and Torchscript because Torch ships them in one package. To make it easier to follow, I'll use PyTorch to represent Torch eager mode, which relies on Python's runtime, and TorchScript to represent the DSL, whose execution is on its own.

|                                                     | Language used                                                | Execution             |
| --------------------------------------------------- | ------------------------------------------------------------ | --------------------- |
| PyTorch code                                        | Python                                                       | Python's runtime      |
| TorchScript code (decorated by `@torch.jit.script`) | Statically typed, subset of Python.                          | Torchscript's runtime |
| Taichi code (decorated by `@ti.kernel`)             | Statically typed, looks like Python but with minor differences. | Taichi's runtime      |

Note that we only list the DSL part for Taichi programs in the table above. Python is certainly still involved when you run a Taichi program using `python demo.py`. But unlike PyTorch whose execution is driven by Python's runtime all the time, there's a clear boundary (lowering Python AST to CHI IR) where Python hands off the workload to Taichi's compiler.

In other words, Python is one of the many possible hosts for Taichi. Taichi is currently embedded in Python, but is not Python-specific. In case you haven't seen this, our community developer Dunfan Lu is working on a Javascript frontend for Taichi and you can check out some cool preliminary demos on[ ](https://github.com/AmesingFlank/taichi.js)[taichi.js github repo](https://github.com/AmesingFlank/taichi.js).

P.S. You might wonder why Taichi and TorchScript are both designed to be independent of Python's runtime. Python is great, no? Well, production infra doesn't like GIL, Python's performance, and the size of Python binary, so it's indeed critical for users to be able to deploy without Python's runtime while not having to change too much of their Python code!

What does this mean to normal PyTorch users when they first try out TorchScript or Taichi? Nothing in Python comes for free! In PyTorch you can easily mix with NumPy, PIL and all your favorite Python tools together, but TorchScript's or Taichi's runtime doesn't know them at all. Be cautious as this might bite you many many times.

To recap, Taichi and Torchscript are statically typed DSLs that both look like Python code but target completely different areas. Let's conclude the first blog with a key difference driven by their design principles:

- One of the core design philosophies of TorchScript is a smooth transition from Torch eager mode to TorchScript. So TorchScript is designed to be a strict subset of Python. Yes, the code decorated by `torch.jit.script` is valid python code.
- Taichi, however, doesn't have such a Python counterpart, so it can diverge from Python a bit to better accommodate its applications. The most obvious one is the top-level for loops in Taichi kernels are automatically parallelized. This is very different from Python and TorchScript, right? ;)

All right, that's enough to spark some discussion. In the next blog we'll dive into the data containers in Taichi and Torch - tensors and fields!
