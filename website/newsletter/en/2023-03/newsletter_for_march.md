---
title: "Taichi Newsletter for November"
date: "2023-04-01"
description:
  📌 Highlights\Taichi NeRF is released\Taichi v1.5.0：Taichi Runtime (TiRT) now supports Apple's Metal API and OpenGL ES for compatibility on old mobile platforms
---

# Taichi Newsletter for March
<div class="alert--warning alert alert-no-border">

## 📌Highlights
 
- Upgrade to v1.5.0: `pip install -U taichi==1.5.0`
- [Taichi NeRF](https://github.com/taichi-dev/taichi-nerfs) is released. Train your own 3D world!
- [Taichi v1.5.0](https://github.com/taichi-dev/taichi/releases/tag/v1.5.0): Taichi Runtime (TiRT) now supports Apple's Metal API and OpenGL ES for compatibility on old mobile platforms. 
 

</div>

##  ⚙️ Releases & Development

- **See what's new in the latest Taichi release**

    Taichi v1.5.0 is now available 👉 `pip install -U taichi==1.5.0`
    - Taichi Runtime (TiRT) now supports Apple's Metal API and OpenGL ES for compatibility on old mobile platforms.
    - Taichi AOT fully supports float16 dtype.
    - Out-of-bound checks are now supported on ndarrays.
    - Python Frontend: LLVM-based backends (CPU and CUDA) now support returning structs, including nested structs containing vectors and matrices.
    - The atomic operations for half2 data type (used for half-precision floating-point numbers) have been optimized in CUDA backend.
    - Metal, OpenGL, AMDGPU, DirectX 11, CPU, and CUDA are supported on GGUI backend.

    For more details of the release, check out the [changelog](https://github.com/taichi-dev/taichi/releases/tag/v1.5.0).
    
- **37 issues and 193 PRs have been closed this month**

## 🌟 Featured Repos & Projects

- **A 2D Eulerian fluid solver implemented**

    This is a [2D Eulerian fluid solver implemented](http://github.com/Lee-abcde/2DEulerianFluidSolver/tree/main) using the Taichi programming language, which achieves advanced functionality with a implementation of only 300 lines of code. Specifically, this solver enables interactive manipulation of the water surface through mouse interactions, as well as enhanced fluid dynamics through the addition of vorticity calculations. Additionally, this solver supports the flexibility to switch the fluid’s background image, with the images located in the designated img directory.

![](https://user-images.githubusercontent.com/124654014/231320221-db5038ea-6e18-4f9e-98e3-801d0eae21e0.gif)

- **A project is based on SPH Taichi**

    [This project](https://github.com/sillsill777/SPH-Fluid-Simulation) is based on SPH Taichi. In this project with the SPH formalism, [sillsill777](https://github.com/sillsill777) will numerically solve fluid equations which govern the movement of fluid flow. Furthermore, they will consider several effects governing fluid motion such as viscosity and surface tension. The author will also handle the issue of Fluid-Rigid coupling.

![](https://user-images.githubusercontent.com/124654014/231322232-21962c8e-40fa-4c20-ab83-0b0c37de75e6.gif)

High Viscosity case with viscosity set to 0.5

![](https://user-images.githubusercontent.com/124654014/231322239-e9494f74-0943-492a-8f25-63f12f9a60f3.gif)

Two fluid block setting


- **Taichi NeRF**

   We utilized [Taichi NeRF](http://github.com/taichi-dev/taichi-nerfs) to reconstruct a corner of the Taichi office in 3D. NeRF is a technique that allows for accurate and detailed reconstruction of scenes from a series of 2D images. By capturing multiple images of the office corner from different angles, we were able to use Taichi NeRF to generate a high-quality 3D model. The resulting model can be explored and visualized from any viewpoint, providing a realistic and immersive virtual representation of the Taichi office corner.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.

![](https://user-images.githubusercontent.com/124654014/231321710-8313da5a-b45c-49c9-a671-6ed051d1c71b.gif)

## 📝 Blogs

- **[Taichi NeRF (Part 1): Develop and Deploy Instant NGP without writing CUDA](https://docs.taichi-lang.org/blog/taichi-instant-ngp)**

Taichi NeRF enables efficient 3D scene reconstruction and new viewpoint synthesis using neural radiance fields, while providing a Python-based workflow for Instant NGP development and easy deployment on mobile devices.

## 🧑‍💻 New Contributors

Thank you for contributing to Taichi!

- **[taichi-nerfs](https://github.com/taichi-dev/taichi-nerfs):**

@[erjanmx](https://github.com/erjanmx): Fix readme typo #23

@[JiahaoPlus](https://github.com/JiahaoPlus): [bug] Fix utils depth2img by importing cv2 and numpy #17

- **[taichi](https://github.com/taichi-dev/taichi):**

@[ritobanrc](https://github.com/ritobanrc): [doc] Handle 2 digit minor versions correctly #7535

@[NextoneX](https://github.com/NextoneX): [Doc] Update gui_system.md, remove unnecessary example #7487

@[schuelermine](https://github.com/schuelermine): [docs] Reword words of warning about building from source #7488

## 🙋‍♂️ Tips & Tricks
 
How can you perform complex number arithmetic using Taichi's math module?

A: Complex numbers can be represented using 2D vectors (ti.math.vec2). In the vec2, the two numbers represent the real and imaginary parts of the complex number, for example ti.math.vec2(1, 1) represents the complex number 1+1j.

[Join our Discord](https://discord.com/invite/f25GRdXRfg)

Until next time! 
