---
title: "User Story: Oppo"
date: 2022-12-05
slug: "oppo-user-story"
---

> Gabriel Huau (OPPO Senior Engineering Manager): Creating beautiful and physical-based algorithms has never been so easy with Taichi!

## Background:

From the refreshing water droplet wallpaper unveiled together with the iPhone 4 in 2010, to the interactive dandelion wallpaper shipped with Samsung Galaxy S3 in 2012, wallpapers have become the epitome of technological advances and can even recall the common memory shared by a generation.

<center>

![droplet](./oppo_pics/droplet.jpeg)
![dandelion](./oppo_pics/dandelion.jpeg)

</center>

Fast forward to August 2022. A series of 3D physical simulation wallpapers co-developed by Oppo and Taichi Lang was officially launched, now available for download in OPPO App Store (China). The initial set of six wallpapers innovatively employs gravity sensing and touch control, simulating the movements of objects in the real world. This is yet another step forward in the industrial deployment of Taichi-powered physical simulation.

## Showtime

<p align="center">
<video src="/video/oppo.mp4" controls></video>
</p>

- Simulation prototype: Based on the classic material point method (MPM), the prototype simulates snow, water, and jelly and reproduces collisions vividly with 128 lines of code only.
- Fluid simulation: Use your finger to create colorful vortices and see how the streams meet and blend. 
- Water droplet: Appreciate the Shanghai landmark on a rainy day through your window (screen). The droplets are so realistic that you almost cannot help but wipe them away. 
- Galaxy: A particle-based simulation of the awestricking whale, rose, and butterfly.
- Sand clock: Gravity sensing is the key to the naturally flowing liquid as you move your phone. The changing colors of the liquid are represented based on the particle methods.  
- Space: Combining physical simulation and ray tracing, the wallpaper depicts an astronaut drifting in space and bouncing up and down. You can see his reflection on the spacecraft clearly.

## Why Taichi AOT (ahead-of-time) matters

Notably, all the wallpapers demonstrated above were developed and tuned in Python and then made available on mobile devices through `ti.aot.Module`, which exports shaders for deployment out of the Python environment. 
Starting from v1.0.0, Taichi offers the AOT module, which serves as a bridge between the stunning visual effects of physical simulation and mobile deployment. Previously, the development of mobile visual effects entails a laborious and arduous process of writing shaders. Now, with Taichi, users can debug and iterate algorithms in Python for real-time results before easily offloading them to mobile devices mounted with different hardware. 
However, AOT alone cannot make it. Taichi's important features like readability, GPU-based acceleration, and cross-platform portability are all indispensable to materialize industrial applications.

## Going forward, what to expect

- Further streamline the deployment process 
- Provide a more stable API with support for textures
- Test AOT on more mobile models and improve compatibility
- Optimize the performance of the runtime library

## Learn more about Taichi AOT: 

[Taichi AOT, the solution for deploying kernels in mobile devices](https://docs.taichi-lang.org/blog/taichi-aot-the-solution-for-deploying-kernels-in-mobile-devices)
[Load and destroy a Taichi AOT module](https://docs.taichi-lang.org/docs/taichi_core#load-and-destroy-a-taichi-aot-module)