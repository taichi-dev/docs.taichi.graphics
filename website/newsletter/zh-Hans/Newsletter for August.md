---
title: "Taichi 8 月社区月报"
date: "2022-09-01"
description:
  📌 八月高光时刻\n Taichi 发布 v1.1.0 版本\n 文档站全新上线\n GitHub 中获得超 20k stars
---


## ⭐️ 八月高光时刻
- Taichi 发布 v1.1.0 版本！
- Taichi 文档站全新上线，更直观的快速索引、更清晰的内容排布！
- Taichi 项目在 GitHub 中获得超 20k stars，感谢每一位支持 Taichi「献上星星的你」！
  
## 🔧 技术动态
- **Taichi v1.1.0 发布，令人期待的多个新功能正式上线**

    Taichi 在 v1.1.0 中取得了多项进展，程序性能也有所提升，进一步提高了用户的开发效率。诸如： 
  - 量化数据类型：用户可以在不改变计算部分的代码的前提下，将数据以任意低的精确度进行存储，大幅节约显存。
  - 离线缓存：用户可将编译产物存储到磁盘上，极大地减少了程序重复启动 kernel 的编译开销。
  - 前向模式自动微分：当一个函数的输出数量大于输入数量时，前向自动微分的效率比反向微分要高很多。前向模式和反向模式下的 Jacobi 矩阵计算样例即体现这一特点，大家可以在 Taichi v1.1.0 运行 ti example jacobian 示例实际体会。
  
  关于 v1.1.0 功能介绍和更多进展，请参考发版说明 [release notes](https://mp.weixin.qq.com/s?__biz=MzkzNDI3NDY4Mw==&mid=2247502082&idx=1&sn=e7cad8c09a6af9539a64a4ec4ac6b58a&chksm=c2bd3a16f5cab300b58d81942bf74138552acb4e4c4658a3d6b53107441fe685f6579f3cdcfa&scene=21#wechat_redirect)。 
  目前最新版本中也将 v1.1.0 的部分 bug 做了补丁修复，可直接升级到 v1.1.2 版本 `pip install taichi==1.1.2`
  

- **[Taichi 新版文档站](https://docs.taichi-lang.org)正式上线——分类更清晰，内容更简洁** 

  本次文档站升级，在内容的排布、导航栏的体验、网站视觉方面均做出了改善。进入文档站首页，可根据不同需求，找到对应索引卡片，点击卡片即可跳转至指定文档。
  

- **Taichi 助力科研工作者入围 SIGGRAPH 2022!** 
  
  - [Automatic Quantization for Physics-Based Simulation](https://arxiv.org/pdf/2207.04658.pdf)
  作者刘嘉枫等人合作开发了一套自动量化系统，可以根据用户的误差或内存限制的规格生成量化方案。该项目利用 Taichi 的自动微分框架来优化由量化计算带来的仿真误差，并受 Taichi 自身的量化系统启发，采用了内存存储优化策略，节省了大量的人工劳动，内存压缩高达 2.5 倍。 

  - [A General Two-stage Initialization for Sag-Free Deformable Simulations](https://graphics.cs.utah.edu/research/projects/sag-free-simulations/sig22_sagfree_sim.pdf)
  本篇论文由 Jerry Hsu 等人合作完成。通常来说，仿真物体零受力状态的形状和其在动画中的收到重力等外力下的初始帧不吻合，这给艺术家带来了很多麻烦。本文逆向推算了物体的零受力状态，使得艺术家们可以「所见即所得」地初始化物体的初始帧。这个解决方案能工用于多种仿真系统和材料模型中。值得一提的是，文章使用 Taichi 开源了对 MPM 模拟的初始化修正样例。 


## 🌟 社区精选作品
- **[Taichi x 电磁场时域有限差分方法的新尝试 ](https://github.com/lucifer1004/uFDTD-Taichi)**

   uFDTD (Understanding the FDTD Method)是著名的电磁场时域有限差分方法入门教材。社区同学 lucifer1004 在 uFDTD-Taichi 项目中，分别使用原生 Taichi 和 Taichi.jl 实现了原书前六章的有关内容，主要是一维电磁场的时域有限差分模拟，涉及理想导体、电介质、电磁散射、理想匹配层、吸收边界条件等基本概念和方法。 
  ![uFDTD](https://github.com/lucywsq/docs.taichi.graphics/blob/master/website/newsletter/en/08/pics/1d_bare_bones.gif)


- **[如何用 Taichi 实现拉普拉斯方程基本解模拟？](https://forum.taichi.graphics/t/topic/2879/9)**

   社区同学 bismarckkk 创作的 demo 可以模拟点源、点汇、点涡、偶极子等拉普拉斯方程的基本解，即理想不可压流体的一些最基本的平面定常无旋流动。同时，它也可以交互式地创建或更改上述基本解，通过箭头和从边缘出发的物质点显示该流场中的流动情况。 
  ![laplace](https://github.com/lucywsq/docs.taichi.graphics/blob/master/website/newsletter/en/08/pics/laplace.gif)
  
  
- **[有更简单的办法能够重绘 Taichi logo 了？](https://github.com/lgyStoic/taichi_rotation)**

   社区同学 garryling 在学习 Taichi 的过程中，发现 ti example 中的 Taichi logo 的例子代码较为抽象。于是他另辟蹊径，使用了一种更加直观的方法来重画 Taichi logo。该方法逻辑十分简单，只需要画出五个圆，并判断点是否在圆内就能表示出 Taichi Logo。同时通过 SSAA 进行抗锯齿操作，使得结果更加平滑。 
  ![taichi-logo](https://github.com/lucywsq/docs.taichi.graphics/blob/master/website/newsletter/en/08/pics/taichi_logo.gif)

## 💪 贡献者力量
   感谢社区同学在增加新功能、修复问题等方面的贡献。 
  
   **@mshoe**  [#5836 Enable gravity option in stable_fluid_ggui.py](https://github.com/taichi-dev/taichi/pull/5836)
   
   **@Hyiker** [#5654 Add GGUI set_image support for non-Vector fields and NumPy Ndarrays](https://github.com/taichi-dev/taichi/pull/5654) 
  
  
## 🔧 如何成为 Taichi 贡献者
   自开源之初，Taichi 贡献者们积极参与开发，并为打造更好的 Taichi 持续贡献力量。以下是成为 Taichi 贡献者们的一些 Tips，期待更多同学加入贡献者的队伍之中。
 - [Taichi 贡献者指南](https://docs.taichi-lang.org/docs/contributor_guide)
   一文带大家读懂如何成为 Taichi 贡献者，解释了具体的行为规范，也包含了实用小技巧，便于大家快速上手。
 - [Taichi 编程语言的开发进度面板](https://github.com/orgs/taichi-dev/projects/1)
   便于大家快速了解 Taichi 未处理/进展中/已处理/已完成开发的 issue。 
 - [从这里寻找贡献灵感](https://github.com/taichi-dev/taichi/contribute)
   开启向 Taichi 贡献第一步，可从 GitHub 中找到灵感，从 (good first issue)[https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22]（非常容易上手）和 (welcome contribution)[https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22welcome+contribution%22]（稍微带有挑战性）这两类 issues 中找到感兴趣的贡献方向。 
 - [加入 GitHub discussion](https://github.com/taichi-dev/taichi/discussions)
   在这里你可以与海内外开发者一起讨论功能开发、Taichi roadmap 等话题，也欢迎提出你对 Taichi 的建议。 
 - [Awesome Taichi](https://github.com/taichi-dev/awesome-taichi)
   精选社区同学用 Taichi 做出的优质项目，可以从中找到感兴趣的例子尝试运行。 

## 📢 社区活动
-  [Ti example 征集活动](https://forum.taichi.graphics/t/ti-example/2872) 
   本次征集活动将持续至 2022 年 10 月 14 日 下午 5 点，参与即可获得 Taichi 定制周边。希望大家踊跃提交作品。如果你的作品被收录，将会被全球数以十万计的用户和开发者看到哦！ 

-  数值计算 SIG  
   学习分享会将于每周五晚 20:00 进行，后续将邀请到社区同学结合自己的学术成果进行分享，同时也欢迎大家加入到数值计算 SIG 交流群，感兴趣的同学可[填写表单](https://love3d.wjx.cn/vm/PX0LrrP.aspx?udsid=791245)加入其中。
  
