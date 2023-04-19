---
title: "Taichi Newsletter for October"
date: "2022-10-31"
description:
  📌 Highlights\n Taichi launched v1.2.0\n Weekly triage meeting notes went online\n Taichi users unleash creativity for DEM simulation
---

# Taichi Newsletter for October
<div class="alert--warning alert alert-no-border">

## 📌 Highlights

- Taichi launched [v1.2.0](https://github.com/taichi-dev/taichi/releases/tag/v1.2.0), supporting offline cache on more backends and providing a global data access checker. `pip install taichi==1.2.0`
- We summarize issues raised by community users in the [weekly triage meeting notes](https://github.com/taichi-dev/taichi/wiki/Issue-Triage-Meeting-Notes). Welcome your contribution!
- Why choose Taichi over other numerical computation acceleration solutions? View the [benchmark report](https://docs.taichi-lang.org/blog/taichi-compared-to-cub-cupy-numba).
- Taichi users exhibit great creativity and prowess as they craft DEM simulations based on [Taichi's template](https://github.com/taichi-dev/taichi_dem).

</div>

## ⚙️ Releases & development

- **Taichi v1.2.0 released**

    Starting from the v1.2.0 release, Taichi follows [semantic versioning](https://semver.org/). Notably, the latest version supports [offline cache](https://docs.taichi-lang.org/docs/performance#offline-cache), which was introduced in v1.1.0 for CPUs and CUDA only and now is available on more backends - Vulkan, OpenGL, and Metal. In addition, a global data access checker is added to validate the kernels captured by `ti.ad.Tape()`; to activate the checker, simply set `validation=True`. More improvements are detailed in the [release note](https://github.com/taichi-dev/taichi/releases/tag/v1.2.0).

    Upgrade to v1.2.0 to have a taste of the new features! `pip install -U taichi==1.2.0`

- **Triage meeting notes went online**

    Each week, we meet and try to solve issues raised by community users. We feel it would be better if anyone interested could participate in the discussion, track problem-solving progress, and share their ideas directly with us. We will update the [meeting notes](https://github.com/taichi-dev/taichi/wiki/Issue-Triage-Meeting-Notes) on a weekly basis, and you can drop in anytime to check what we are busy with.

## 🌟 Featured repos & projects

- **DEM simulations based on Taichi's template**

    Taichi provides a minimal [DEM template](https://github.com/taichi-dev/taichi_dem) and welcomes more refined simulations based on it.

    [Denver Pilphis](https://github.com/Denver-Pilphis) and [MuGdxy](https://github.com/MuGdxy), for example, presented their work with 11 new features, including an upgrade to 3D and the introduction of complex DEM contact models. We select the following sophisticated demo to offer a quick glimpse of their impressive project:

    <center>

    ![rabbit](./pics/rabbit.gif)
    The free fall of a Stanford bunny-shaped bonded agglomerate onto a flat surface
    </center>

    Check out [this repo](https://github.com/Denver-Pilphis/taichi_dem/tree/submit/Denver-Pilphis_MuGdxy) for a detailed description and more demos!

    Inspired by the movie Tai Chi Master, [mrzhuzhe](https://github.com/mrzhuzhe) created this beautiful sandy ball simulation, implementing the neighborhood search with atomic locks, PBF (position-based fluids), and Taichi's [SNode system](https://docs.taichi-lang.org/docs/internal#data-structure-organization). Taking incompressibility and viscosity into consideration, the creator also upgraded the initial version with reference to [Ten Minute Physics](https://matthias-research.github.io/pages/tenMinutePhysics/index.html). See the [project page](https://github.com/mrzhuzhe/taichi_dem) for more information.

    <center>

    ![sandy ball](./pics/sandy_ball.gif)
    sandy ball simulation
    ![PBF version](./pics/ball_PBF.gif)
    Upgraded PBF version
    </center>

- **An Instant NGP renderer implemented with Taichi**

    Instant NGP is a novel view synthesis framework that reduces the model training for a single scene from hours to a few seconds. [Linyou](https://github.com/Linyou) implemented a CUDA-free instant [NGP renderer](https://github.com/Linyou/taichi-ngp-renderer) using Taichi. With Taichi's built-in GUI system, the project supports real-time rendering and camera interaction while consuming less than 1GB of VRAM. It also contains a fully fused multilayer perceptron (MLP) enabled by Taichi's SharedArray. The following are pre-trained NeRF synthesis scenes provided by the creator:

    ![pretrained](./pics/pretrained_scenes.png)

- **HDR image processing with Taichi**

    Tone mapping is used to process HRD (high dynamic range) images into a low dynamic range so that they can be displayed on traditional devices without losing details. [yuanmig-hu](https://github.com/yuanming-hu) implements the bilateral grid with Taichi for local tone mapping, allowing you to adjust the highlights and shadows at your will. The image below is a screenshot of the program. If you want to run this program on your device and play with the parameters to see how the effects change, check [this repo](https://github.com/taichi-dev/image-processing-with-taichi).

    <center>

    ![HDR tone mapping](./pics/HDR_image.jpeg)
    Input image captured at MIT by the creator
    </center>

## 📝 Blogs

- [**How does Taichi Compare to CUB/CuPy/Numba in Numerical Computation**](https://docs.taichi-lang.org/blog/taichi-compared-to-cub-cupy-numba)

    In his [previous blog](https://docs.taichi-lang.org/blog/can-taichi-play-a-part-in-cfd), [Qian Bao](https://github.com/houkensjtu) explains how Taichi facilitates a CFD program with its data container `ti.field`, the automatic parallelization mechanism, and the GUI system. However, Taichi is obviously not the only option available to users. So, how does it compare to other numerical computation acceleration solutions, such as CUB, CuPy, and Numba? Bao and [Haidong Lan](https://github.com/turbo0628) compared their performance in simple summation operations and complex fluid field operations and summarized their findings in [this blog](https://docs.taichi-lang.org/blog/taichi-compared-to-cub-cupy-numba). To put it simply, Taichi can rival and even outperform the highly optimized GPU-accelerated implementations while providing a more intuitive coding experience.

## 🗓 Events

- **Taichi community members invited to top academic conferences**

    Liang Yang and Jianhui Yang are university scholars and active Taichi community members. They have been invited to give an oral presentation on GPU accelerated multiphase flow, particle and solid interaction solver in one-fluid formulation at ICCCI 2022, to be held in Japan. Taichi is used in their research.

    Peng Di, a researcher from the China Academy of Building Research (CABR), is going to share his experience with using Taichi for high-performance DEM computation at the 12th China Congress on Particle Technology, scheduled for November 25-28, 2022.

- **Taichi's Numerical Simulation SIG (Special Interest Group) open to external developers!**

    We have created this dedicated space for anyone interested in using Taichi for numerical simulation. Group members can communicate with each other, have their questions answered by internal engineers promptly, and forge something incredible of their own. You can visit our [Computational Fluid Dynamics repo](https://github.com/houkensjtu/taichi-fluid) to check what Taichi is capable of.

    To get a place in our SIG,  join [Taichi Community on Slack](https://taichicommunity.slack.com/join/shared_invite/zt-14ic8j6no-Fd~wKNpfskXLfqDr58Tddg#/shared-invite/email) and then search for the channel  #sig-numerical-simulation. We hold regular sharing sessions with group members. If you are interested in becoming a lecturer, join the SIG and contact the group administrator; you will be rewarded with a fulfilling experience and nice souvenirs!
    
## 🎉 Community contribution

- [bismarckkk](https://github.com/bismarckkk): Add example "laplace equation" ([#6302](https://github.com/taichi-dev/taichi/pull/6302))

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

All is going well. See you in November! 👋
