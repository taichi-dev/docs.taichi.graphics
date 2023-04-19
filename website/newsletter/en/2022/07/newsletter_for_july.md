---
title: "Taichi Newsletter for July"
date: "2022-08-01"
description:
  📌 Highlights\n Taichi v1.0.4 was released\nJoin Taichi's Numerical Simulation SIG\n No problem is trivial - become a more sophisticated Taichi user with five practical tips
---

# Taichi Newsletter for July
<div class="alert--warning alert alert-no-border">

## 📌 Highlights

- Taichi v1.0.4 was released: *`pip install taichi==1.0.4`*

- Join Taichi's [Numerical Simulation SIG](https://taichicommunity.slack.com/join/shared_invite/zt-14ic8j6no-Fd~wKNpfskXLfqDr58Tddg#/shared-invite/email), a dedicated space for communication, information sharing, and problem solving.

- No problem is trivial - become a more sophisticated Taichi user with [five practical tips](https://sourl.cn/GnGEEm).

</div>

## ⚙️ Releases & development

- **Fresh improvements come with Taichi v1.0.4!**

  This new version is mostly about language and syntax updates, as well as a handful of doc improvements. Refer to the complete [change log](http://bit.ly/3RBc1Ld) for more details.

  Upgrade to Taichi v1.0.4 with a simple command line: `pip install --upgrade taichi`

  And check out our classy demos: `ti gallery`

- **Clang 15 now works for `COMPILE_LLVM_RUNTIME`([#5831](https://github.com/taichi-dev/taichi/pull/5381))**

  Contributor [python3kgae](https://github.com/python3kgae) proposed adding a DirectX 12 backend to the compiler. So far, they have successfully enabled Clang 15 for `COMPILE_LLVM_RUNTIME` and removed the use of `getPointerElementType`. Well done! Note that Clang 10 is still supported.

  The development is still ongoing, and there's loads to be done to finalize the feature. You can track the progress [here](https://github.com/taichi-dev/taichi/issues/5276) and join the discussion anytime!

## 🗓 Events

- **Taichi's Numerical Simulation SIG (Special Interest Group) open to external developers!**

  We have created this dedicated space for anyone interested in using Taichi for numerical simulation. Group members can communicate with each other, have their questions answered by internal engineers promptly, and forge something incredible of their own. You can visit our [Computational Fluid Dynamics repo](https://github.com/houkensjtu/taichi-fluid) to check what Taichi is capable of.

  To get a place in our SIG,  join [Taichi Community on Slack](https://taichicommunity.slack.com/join/shared_invite/zt-14ic8j6no-Fd~wKNpfskXLfqDr58Tddg#/shared-invite/email) first and then search for the channel  #sig-numerical-simulation.

## 📝 Blogs

- **[ETH Zürich uses Taichi Lang in its Physically-based Simulation course (AS 21)](https://docs.taichi-lang.org/blog/eth-z%C3%BCrich-uses-taichi-lang-in-its-physically-based-simulation-source)**

  The Computer Graphics Laboratory (CGL) at ETHETH Zürich, a world-class university in Europe, used Taichi Lang as the creation tool for a course named [Physically-based Simulation](https://cgl.ethz.ch/teaching/simulation21/fame.php) in the fall of 2021. Taichi's creator, [Yuanming Hu](https://github.com/yuanming-hu), interviewed the students enrolled in the course and summarized why they like Taichi and what to improve in the future. This blog also presents a few representative projects students submitted as coursework. Maybe your research interest also lies in physical simulation, and you might get some inspiration or refreshing ideas from this article!

- **[Training a magic fountain using Taichi's autodiff, an efficient tool for differentiable physical simulation](https://docs.taichi-lang.org/blog/training-a-magic-fountain-using-taichi-autodiff-an-efficient-tool-for-differentiable-physical-simulation)**

  Supporting the reverse-mode automatic differentiation, Taichi allows you to optimize neural network controllers efficiently with brute-force gradient descent. [erizmr](https://github.com/erizmr) wrote this blog to share how to implement a magic fountain that learns to hit a target with the least effort, cleverly using Taichi's autodiff to accelerate the convergence.

  <!-- ![autodiff magic fountain]() -->

- **[Taichi Cookbook 001: Five practical tips on how to master Taichi, a handy parallel programming language embedded in Python](https://docs.taichi-lang.org/blog/taichi-cookbook-001)**
  Have you ever been troubled by the silent array access violation errors? Or have you tried to optimize the performance of your program, only to be perplexed by where to start? Well, though not lethal, these problems are real headaches. If that's the case, you need to take a look at the first Taichi cooking session, tutored by [Yuanming Hu](https://github.com/yuanming-hu). He generously shares five practical tips and one new feature, `ti.dataclass`, to help you use Taichi to its best! For example, you can learn how to auto-debug out-of-bound array accesses and analyze performance with Taichi Profiler. More to discover in [this blog](https://docs.taichi-lang.org/blog/taichi-cookbook-001).

## 🌟 Featured projects

- **Fluid simulation on triangle meshes**

  [yhesper](https://github.com/yhesper) created a real-time fluid simulation on the surface of a triangle mesh, based on a modified version of Elcott's SImplicial Fluids algorithm. [This stunning work of art](https://docs.taichi-lang.org/docs/ggui) is implemented using [Taichi Lang](https://www.taichi-lang.org/) and its UI system [GGUI](https://docs.taichi-lang.org/docs/ggui).

  ![stanford bunny](./pics/unnamed.gif)

- **Embed Taichi Lang in Unreal Engine**

  [cgerchenhp](https://github.com/cgerchenhp) shows it can be pretty effortless to integrate Taichi into Unreal Engine. Making the best of Taichi's high-performance parallel computation and UE's support for Python (via the plugin TAPython), you can also build your breathtaking 3D scenes starting from [here](https://twitter.com/TaichiGraphics/status/1547923209822949378).

  ![Taichi & UE](./pics/ue.gif)

- **Rigid body simulation based on shape matching**

  The shape matching algorithm provides a particle-based approach to rigid body simulation. Thus, it makes coupling with SPH-based fluid simulation easier, enabling fluid-structure interaction and shape transition. Using Taichi Lang to implement shape matching, [chunleili](https://github.com/chunleili) completed a [rigid body simulation](https://github.com/chunleili/tiRigidBody) project, the essential part of which is neatly done within 30 LoCs. This project can also be conveniently adapted to simulate elastic and plastic bodies.

  ![rigid body simulation](./pics/rigid_body.gif)

- **Using Taichi features in Julia**

  [lucifer1004](https://github.com/lucifer1004) managed to export the Python module Taichi as a constant `ti` so that most of Taichi's features can be directly called in Julia. More details are given on the [project page](https://github.com/lucifer1004/Taichi.jl). Try reproducing a Taichi demo in Julia and share with us your work and thoughts!

  ![Taichi & julia](./pics/julia.gif)

## 🧑‍💻 Become a contributor!

Your contribution is indispensable to the prosperity of the Taichi community. Following are some useful references.

- **[Our contribution guidelines](https://docs.taichi-lang.org/docs/contributor_guide)**

  Information about what to contribute and how to contribute to Taichi.

- **[Taichi Lang's Kanban](https://github.com/orgs/taichi-dev/projects/1)**

  Identify untaken, ongoing, closed, or fixed issues at a glance.

- **[Join our discussions](https://github.com/taichi-dev/taichi/discussions)**

  Our global forum for discussions about our features, bugs,  roadmaps, and more.

- **[Good first issues](https://github.com/taichi-dev/taichi/contribute)**

  A great way to start contributing to Taichi is to pick up an issue tagged with **[good first issue](https://github.com/taichi-dev/taichi/issues?q=is:open+is:issue+label:"good+first+issue")** (easy to start with) or with **[welcome contribution](https://github.com/taichi-dev/taichi/issues?q=is:open+is:issue+label:"welcome+contribution")** (slightly more challenging).

- **[Awesome Taichi](https://github.com/taichi-dev/awesome-taichi)**

  A curated list of awesome Taichi applications and resources.



So far so good. Good-bye for now!👋

