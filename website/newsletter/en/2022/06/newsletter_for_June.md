---
title: "Taichi Newsletter for June"
date: "2022-07-04"
description:
  📌 Highlights\n Taichi v1.0.3 was released\nAwesome Taichi repo was launched
---

# Taichi Newsletter for June
<div class="alert--warning alert alert-no-border">

## 📌 Highlights

- Taichi v1.0.3 at your service: `pip install taichi==1.0.3`
- [Awesome Taichi repo](https://github.com/taichi-dev/awesome-taichi) launched: Take a look at the Taichi applications we select for you!
- Your voice valued: Any ideas on small-matrix functions? Tell us [here](https://github.com/taichi-dev/taichi/discussions/5103).

</div>

## ⚙️ Releases & development

- **Taichi v1.0.3 released!**

    Despite being small, this latest version marks a big step towards making Taichi-Lang a superset of CUDA. If you want to utilize miscellaneous CUDA warp-level intrinsics or add a struct_class decorator, [don't miss out](https://github.com/taichi-dev/taichi/releases/tag/v1.0.3?utm_source=twitter). Upgrade now!
  
    `pip install --upgrade taichi`
  
    `ti gallery`

## 🌟 Featured repos & projects

- **Awesome Taichi repo launched**

    Fancy a break from coding and get some tasty visual refreshments? We launched the [Awesome Taichi repo](https://github.com/Taichi-dev/awesome-taichi) to give you easy access to the latest collection of Taichi applications. Be it innovative image processing techniques, refreshing integration with machine learning, realistic simulation projects, or adorable voxel artworks, you shall always find your cup of tea! Or ... Better: Contribute your demos to the [Awesome Taichi repo](https://github.com/Taichi-dev/awesome-taichi) and see your hard work become a source of inspiration.😎

    Now, a really cool starter for your first bite: [Madelbrot Viewer](https://github.com/Y7K4/mandelbrot-viewer) by [Y7K4](https://github.com/Y7K4)

    ![Mandelbrot](./pics/mandelbrot.gif)

- **[YuCrazing](https://github.com/YuCrazing)'s position-based fluid simulation**

    Using Taichi Lang 1.0.3, [YuCrazing](https://github.com/YuCrazing) develops a position-based fluid simulation on 260k particles and runs it on RTX3060Ti at 60fps.

    Acceleration to a staggering number of particles like this is hard, but the warp-level intrinsics introduced in 1.0.3 made it a breeze.👇

    ![pbf](./pics/pbf.gif)

- **Computational Fluid Dynamics resource repo launched**
    If you are interested in numerical fluid simulation, then Taichi is your handy tool. 👉 Star this [resource hub](https://github.com/houkensjtu/taichi-fluid), where you can find useful references, tutorials, and classic Taichi-empowered fluid simulation projects.

## 🎤 New ideas wanted!

- **Call for suggestions on Taichi's small-matrix functions**

    Taichi has implemented some functions relating to small matrices (2x2 or 3x3), such as single value decomposition (SVD) and eigendecomposition. Click [here](https://github.com/taichi-dev/taichi/discussions/5103) for the full list.

    However, it is far from being sufficient. We need your help to expand this function list! If you ever tried to implement a feature from scratch, then very likely many others in the community are also in urgent need of it.

    In that spirit, we encourage you to join in our [discussion](https://github.com/taichi-dev/taichi/discussions/5103) to share your thoughts or discoveries on Taichi's small-matrix functions.

## 🎉 New contributors

- [AD1024](https://github.com/AD1024): Throw exceptions when ndrange gets non-integral arguments ([#5245](https://github.com/taichi-dev/taichi/pull/5245))
- [feisuzhu](https://github.com/feisuzhu): Debug windows CI bot ([#5234](https://github.com/taichi-dev/taichi/pull/5234))
- [olinaaaloompa](https://github.com/Olinaaaloompa): Edited the compilation warnings section ([#5180](https://github.com/taichi-dev/taichi/pull/5180))
- [quadpixels](https://github.com/quadpixels): Redirect global_tmps_buffer_i32 to u32 ([#5151](https://github.com/taichi-dev/taichi/pull/5151))

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

More to expect in the coming month! See you next time👋
