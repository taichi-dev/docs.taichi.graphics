---
title: "Taichi 2022 年 10 月社区月报"
date: "2022-11-01"
description:
  📌 十月高光时刻\ Taichi 发布 v1.2.0 版本\Taichi 中文论坛改版，体验升级\ Issue Triage Meeting Notes 上线\社区成员在全球会议分享基于 Taichi 的科研成果
---

# Taichi 2022 年 10 月社区月报

## 📌十月高光时刻

- Taichi 发布 v1.2.0 版本
- Taichi 中文论坛改版，体验升级，欢迎访问新域名解锁更多优质内容：forum.taichi-lang.cn
- Issue Triage Meeting Notes 上线，我们会每周跟进来自社区的问题并将 issue 的状态更新在 [GitHub Wiki](http://github.com/taichi-dev/taichi/wiki/Issue-Triage-Meeting-Notes)
中，也欢迎社区同学的参与
- 社区成员在全球会议分享基于 Taichi 的科研成果，将在十一月的全国颗粒大会、日本第七届高品质先进材料界面表征与控制国际会议与大家见面

##  ⚙️ 技术动态

**🔧 Taichi v1.3.0 发布！看看有哪些重要更新**

- Taichi 从 v1.2.0 版本开始遵循语义版本管理（semantic versioning）。
- 在上一版本（v1.1.0）中只有 CPUs 和 CUDA 引入了离线缓存，最新版本支持更多后端，如 Vulkan、OpenGL 和 Metal。
- 此外，v1.2.0 还增加了一个自动微分的检查器，可以自动检测违反全局数据访问规则（Global Data Access Rule）的行为。

赶快安装最新版 Taichi 体验吧！（Taichi 工程师又悄悄更新了，截止发稿时为 v1.2.1） 👉 `pip install taichi==1.2.1`

## 🌟 社区精选作品
### 🚀 DEM 挑战赛投稿
- **[使用 Taichi DEM 进行工程定量离散单元法仿真](http://github.com/Denver-Pilphis/taichi_dem/tree/dev/denver)**

感谢作者 Denver_Pilphis & MuGdxy。

本例提供了一个完整的离散单元法 (DEM) 仿真的实现，考虑了复杂的颗粒物动力学行为，使仿真结果达到工程定量精度。相比原始的 Taichi DEM 版本，该例增加了 11 个新功能。作者使用 Taichi 加上适当的数据结构和算法，以提升计算效率。

![](https://user-images.githubusercontent.com/124654014/218961765-46cd3e88-8822-41c5-b108-abaa747a071b.gif)

- **[偷功：用 Taichi 实现旋转小球](http://github.com/mrzhuzhe/taichi_dem)**

感谢作者 mrzhuzhe，作品名为「偷功」，灵感来源于香港电影「太极张三丰」中的老歌名。歌曲中李连杰伴着音乐用手搓出流体和沙土球。

作品使用了以下技术：原子锁临域搜索、PBF 领域搜索、Snode 临域搜索。PBF 的版本同时考虑了材料的不可压缩性和粘度。实现参考了 Ten Minute Physics 中的实现。

![](https://user-images.githubusercontent.com/124654014/218963835-7462d222-1f8d-4b3d-9c1a-332020241b96.gif)

![](https://user-images.githubusercontent.com/124654014/218963844-1470ded5-425c-4691-a0da-f574a8e5f846.gif)

### 📈 Ti example 投稿

- **[用 Taichi 实现 Instant NGP (NeRF) 的渲染器](http://github.com/Linyou/taichi-ngp-renderer)**

注：Instant NGP 是加速 NeRF 训练和渲染的新方法 (SIGGRAPH 2022)

这份作品来自 ti example 投稿，感谢作者 LoYoT。本项目使用 Taichi 实现了 Instant NGP 渲染器，其中的 GUI 界面可以实现相机的交互、深度图可视化以及控制每条光线的采样数。

主要实现内容：实现了 Instant NGP 的 forward 部分，只需要 1 GB 内存便可以实时渲染交互，使用 SharedArray 利用 GPU 片上储存实现了 Fully Fused MLP，提供了 8 个预训练的 Blender 渲染场景。

![](https://user-images.githubusercontent.com/124654014/218966034-84110adf-5e5a-49d7-bd01-b350ad4de7c3.jpg)

## 📢 社区活动

**🎤 数值计算 SIG 在 10 月进行了两次线上分享**

感谢 KAIST Civil 在读博士生赵忆冬带来的「Taichi 在计算岩土中的应用」和武汉大学博士研究生焦鹿怀带来的「使用 Taichi 实现等离子体模拟」。

视频回放可以 [点击这里](https://www.bilibili.com/video/BV1mg411y7i9/?spm_id_from=333.999.0.0&vd_source=7e8cfbc83bcd0c8522627c6544d35724)

**👨‍🏫 社区成员在全球会议分享基于 Taichi 的科研成果**

Cranfield 大学教授 Liang Yang 和社区成员 Jianhui Yang 将在日本召开的第七届高品质先进材料界面表征与控制国际会议中演讲使用 Taichi 实现的 GPU 加速多相流和单流体方程中颗粒与固体相互作用的求解。

## 📝 贡献者力量

感谢社区同学在 Taichi 项目中的贡献：

@bismarckkk:

Add example "laplace equation"  [#6302](https://github.com/taichi-dev/taichi/pull/6302)

## 🧑‍💻 如何成为 Taichi 贡献者

**期待更多同学加入贡献者的队伍之中，特别送上几则小贴士：**

- **[Taichi 贡献者指南](https://docs.taichi-lang.org/docs/contributor_guide)**
 
   一文带大家读懂如何成为 Taichi 贡献者，解释了具体的行为规范，也包含了实用小技巧，便于大家快速上手。

- **[Taichi 编程语言的开发进度面板](https://github.com/orgs/taichi-dev/projects/1)**
 
   便于大家快速了解 Taichi 未处理/进展中/已处理/已完成开发的 issue。 
   
- **[加入 GitHub discussion](https://github.com/taichi-dev/taichi/discussions)**
 
   在这里你可以与海内外开发者一起讨论功能开发、Taichi roadmap 等话题，也欢迎提出你对 Taichi 的建议。
 
- **[Awesome Taichi](https://github.com/taichi-dev/awesome-taichi)**
 
   精选社区同学用 Taichi 做出的优质项目，可以从中找到感兴趣的例子尝试运行。 
