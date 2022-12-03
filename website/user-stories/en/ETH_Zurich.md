---
title: "User Story: ETH Zurich"
date: 2022-07-08
slug: eth
---

![](./eth_pics/topbg-full.png)

> Taichi, a perfect programming framework for computer graphics courses.

In Fall 2021, the Computer Graphics Laboratory (CGL) at ETH Zurich offered a course on physically based simulation, which requires students to create a small game or a demo scene using techniques they learned in class.
The vast majority of the student groups chose the Taichi programming language for real-time physical simulation.

# Goal

Select an efficient parallel programming language and use it to implement a physically based simulation project.

# Why Taichi

+ Seamlessly embedded in Python: Easier to learn, more intuitive, and as fast as CUDA.

+ Taichi's GGUI system makes 3D rendering a breeze.

+ A single-source framework: Automatically falls back to CPUs if your system doesn't have CUDA or a powerful GPU.

+ An active community and a wide range of reference code make it easy to get started.

# Results

+ 90% of the projects chose Taichi, and all were completed with flying colors.

+ Achieved comparable performance to C++/CUDA with much less code.

<video src="/video/sand.mp4" controls></video>


# Requests for improvement: The future

+ Enriched GGUI tooling.
+ More descriptive error reports.
+ Move comprehensive benchmark reports.
+ Further reduced compile time.