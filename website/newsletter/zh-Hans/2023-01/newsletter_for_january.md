---
title: "Taichi 一月社区月报"
date: "2023-02-01"
description:
  📌 一月高光时刻\n Taichi 发布 v1.4 版本\Taichi Slack 将逐步迁移至 Discord\RAL 论文：基于弹性体形变仿真的视触觉传感器仿真器 Tacchi
---

# Taichi 2023 年 1 月社区月报

## 📌一月高光时刻

- Taichi v1.4 发布，Taichi AOT 正式发布 Vulkan 后端的运行时库 TiRT 及其 C API.

- Taichi Slack 将逐步迁移至 Discord，欢迎来[讨论](https://github.com/taichi-dev/taichi/issues/7206)！

- RAL 论文：基于弹性体形变仿真的视触觉传感器仿真器 Tacchi.

##  ⚙️ 技术动态

- **Taichi v1.4 发布！看看有哪些重要更新：**

- Taichi AOT 已正式启用，并提供了基于 C API 的 Taichi 原生运行时库（TiRT）。现在不需要 Python 解释器也可运行编译好的 Taichi 内核。
- Taichi kernel 编译速度显著提升，在一些大量使用 ti.Matrix 的场景中提升可达 2 倍.
- Taichi ndarray 现已正式发布。这是一种保存连续多维数据的数组对象，可以方便地与外部库进行数据交换。
- 支持所有后端的动态索引。不再需要 dynamic_index=True 来访问具有运行时变量的向量/矩阵。
- 移除了 Metal 后端对 sparse SNode 的支持。

有关此版本的更多更新，请参阅完整的 [变更日志](https://github.com/taichi-dev/taichi/releases)

赶快升级体验新功能吧 👉 `pip install -U taichi==1.4.1`

本月合并 231 个 PR，解决 39 个 Issue。

## 🌟 社区精选作品

- Ti example 投稿：[Cornell box](https://github.com/HK-SHAO/RayTracingPBR/blob/taichi-dev/examples/cornell_box/cornell_box_shortest.py)。

康奈尔盒子是图形学中常用来观察和测试全局光照的场景，社区的烧风同学使用蒙特卡洛路径追踪采样简化程序后只用了 139 行就完成了这个作品.
  
![编辑图片](https://user-images.githubusercontent.com/124654014/217157256-42f178f9-da22-41a9-ba31-d687f963adf4.jpeg)
  
- 使用 Taichi 渲染的 [水晶兔子](https://github.com/HK-SHAO/RayTracingPBR/tree/taichi-dev/examples/bunny)

烧风同学持续高产 ~ 这次的作品是一只水晶兔子，祝社区的小伙伴们兔年吉祥，健康平安！

![ulRgAvKp_video(4)_1 compressed (2)](https://user-images.githubusercontent.com/124654014/217158864-6f596566-c875-4b73-9716-1902545567a2.gif)

4k 分辨率，120 帧，512 spp，光追深度 512

## 📢 社区活动

[编译器优化技术 Equality Saturation 是如何提升运算性能的？](https://www.bilibili.com/video/BV1hG4y1w79u/?spm_id_from=333.999.0.0&vd_source=7e8cfbc83bcd0c8522627c6544d35724)

主讲人何德源是普林斯顿大学一年级博士生，刚刚结束了在太极图形的远程实习。他的主要研究方向是编程语言、形式化方法和深度学习编译器。本次分享讲解了编译优化中的 Equality Saturation 技术以及他在 Taichi 中对其应用的探索。

## 📝 精选论文

[Tacchi: A Pluggable and Low Computational Cost Elastomer Deformation Simulator for Optical Tactile Sensors](https://ieeexplore.ieee.org/document/10017344)

本文利用 Taichi 和 MLS-MPM 方法仿真了真实世界中的机器人光学触觉传感器，利用粒子表示弹性体与刚体，实现了基于物理形变规则的高效仿真。

![20230207-143441](https://user-images.githubusercontent.com/124654014/217166713-2ebef9b6-4d7a-4186-8003-4f808484f824.png)

论文一作陈子熙同学也将录制 Paper Reading 视频来详细解读，敬请关注！

## 🧑‍💻 如何成为 Taichi 贡献者

欢迎大家参与 Taichi 开发，这里有一些 issue 欢迎大家尝试解决：
- GGUI - mouse wheel event #6938
- Supporting tuple types as struct members #6856
- Request for the feature to get the size of ndarray in Taichi kernel. #6799

更多 good first issue（非常容易上手）和  welcome contribution（稍微带有挑战性）的 issue 请查阅[这里](https://github.com/taichi-dev/taichi/contribute)。

**期待更多同学加入贡献者的队伍之中，特别送上几则小贴士：**

- **[Taichi 贡献者指南](https://docs.taichi-lang.org/docs/contributor_guide)**
 
   一文带大家读懂如何成为 Taichi 贡献者，解释了具体的行为规范，也包含了实用小技巧，便于大家快速上手。
   
 - **[Taichi 编程语言的开发进度面板](https://github.com/orgs/taichi-dev/projects/1)**
 
   便于大家快速了解 Taichi 未处理/进展中/已处理/已完成开发的 issue。 
   
 - **[加入 GitHub discussion](https://github.com/taichi-dev/taichi/discussions)**
 
   在这里你可以与海内外开发者一起讨论功能开发、Taichi roadmap 等话题，也欢迎提出你对 Taichi 的建议。
 
 - **[Awesome Taichi](https://github.com/taichi-dev/awesome-taichi)**
 
   精选社区同学用 Taichi 做出的优质项目，可以从中找到感兴趣的例子尝试运行。 
