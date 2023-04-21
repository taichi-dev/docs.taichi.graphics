---
title: "Taichi 2022 年 9 月社区月报"
date: "2022-10-01"
description:
  📌 九月高光时刻\ Taichi 更新至 v1.1.3 版本\Taichi 研究员们的最新成果 MeshTaichi 论文已被 SIGGRAPH Asia 2022 接收\使用 Taichi 进行流体仿真的新攻略出炉
---

# Taichi 2022 年 9 月社区月报

## 📌九月高光时刻

- Taichi 更新至 v1.1.3 版本！
- Taichi 研究员们的最新成果 MeshTaichi 论文已被 SIGGRAPH Asia 2022 接收。未来在 Taichi 中进行 Mesh 相关操作将更为容易。
- 使用 Taichi 进行流体仿真的新攻略出炉，欢迎尝试～

##  ⚙️ 技术动态

**🔧 Taichi v1.3.0 发布！看看有哪些重要更新**

- 八月发布的 v1.1.0 版本增加了令人期待的新功能，如量化数据类型和离线缓存。
- 随后发布的补充版本对一些报错信息进行改进，让大家的体验更顺滑。
- 近期 Taichi 更新至 v1.1.3 版本，部分功能做了一些微调，包括在 C-API 中加入了新的纹理接口 [#5520](https://github.com/taichi-dev/taichi/pull/5520)、修复了存储浮点数的 codegen 中的错误类型转换 [#5818](https://github.com/taichi-dev/taichi/pull/5818)。

赶快升级体验新功能吧 👉 `pip install taichi==1.1.3`

**🚀 新的非结构化网格（Mesh）编译器 MeshTaichi 相关研究成果已入选 SIGGRAPH Asia 2022，使基于 Mesh 的操作更有效率**

由于非结构化的内存访问模式，基于 Mesh 的开发操作往往速度较慢。为了解决这个问题，Taichi 研究员提出了一个新的网格编译器 MeshTaichi。

该编译器在编译时提前计算出相邻的指数，并将其保存在全局内存中。编译器接管了全局和共享内存之间的属性交换，以确保大多数网格成员属性在被访问计算之前已缓存，性能上比当前最快的编译器、数据结构又快了 1.4 倍至 6 倍。

论文中还展示了用 MeshTaichi 做的 demos，欢迎点击 [视频](http://mpvideo.qpic.cn/0bc3pmaagaaau4advfbv2vrva66dan5qaaya.f10002.mp4?dis_k=bd0b4c977368d74205db1d7c7803a422&dis_t=1676526488&play_scene=10400&vid=wxv_2597789719854465024&format_id=10002&support_redirect=0&mmversion=6.8.0) 感受直观效果。

## 🌟 社区精选作品

- **[用 Taichi 实现高性能 SPH（光滑粒子流体力学）模拟](https://github.com/erizmr/SPH_Taichi)**

社区成员 erizmr 用 Taichi 实现了一个高性能 SPH（光滑粒子流体力学）模拟器。基于 Python 语言结构，作者做出了两个由大规模并行 GPU 计算支持的固体-流体耦合模拟，效果非常酷炫，这些 demos 都可以在 Taichi CUDA 后端上运行。

![](https://user-images.githubusercontent.com/124654014/219297449-a4efebd1-df03-4681-a803-68e276a1b415.gif)

约 174 万个粒子，在 RTX 3090 GPU 显卡上约 80 FPS，时间步长为 4e-4

![](https://user-images.githubusercontent.com/124654014/219297591-fe277281-de76-4be8-af9f-d9bfec34d230.gif)

约 42 万个粒子， 在 RTX 3090 GPU 显卡上约 280 FPS，时间步长为 4e-4

- **基于 Taichi DEM 求解器的 3D 混合器 demo**

Taichi 提供了一个最小的 [DEM（独立元素法）求解器模板](https://github.com/taichi-dev/taichi_dem)，并欢迎开发者们基于这份成果优化升级，大显身手。从模板开始，Linus-Civil 实现了粒子的三维相邻搜索，并处理了基于固定粒子的复杂几何形状的边界。下面显示的这个 3D 混合器 demo 是建立在 PFC 框架中的，作者在 GPU 上用并行算法实现了高性能的相邻搜索。

近期 DEM 算法挑战赛仍在进行，感兴趣的同学可访问 [DEM 求解器源代码](https://github.com/Linus-Civil/GeoBlender)，期待你的大作！

![](https://user-images.githubusercontent.com/124654014/219298410-755008c3-4e70-4f94-8c03-d17990abeed1.gif)

- **[在 Taichi 中实现双流不稳定性模拟](https://github.com/JiaoLuhuai/pic88/blob/main/pic88.py)**

当存在由随机速度的粒子组成的逆流等离子体流时，就会出现双流不稳定性。社区同学焦鹿怀采用 PIC（PIC, particle-in-cell）方法来模拟双流不稳定性所驱动的波的增长和饱和。为了计算简单，这是一个一维模拟，X 轴和 Y 轴分别代表粒子的位置和速度。

![](https://user-images.githubusercontent.com/124654014/219299025-feb6eb08-6ff6-4de9-8057-e7811152e1e5.gif)

## 📢 社区活动

**🏅 Taichi DEM 算法挑战赛持续进行中！**

DEM 是非常有趣的算法，稍加修改就能做出各种效果。欢迎大家在我们的模板仓库的基础之上进一步开发，优化算法或做出有趣的效果！我们将在所有参赛作品中评选出优化效果最好的 3 个作品送上 Airpods、胶囊咖啡机和键盘，还有更多社区参与奖等你来拿~

![](https://user-images.githubusercontent.com/124654014/219299056-fce1ceda-dedd-41b3-b3ee-ca60dec517d9.jpg)

活动详情请点击 [活动介绍](https://forum.taichi.graphics/t/topic/2975)

**🗣 数值计算 SIG**

数值计算分享会仍在继续，如果你有好的选题，欢迎报名，期待更多社区同学成为主讲者。目前数值计算已有 9 期分享会，视频回放请点击 [观看视频](https://www.bilibili.com/video/BV1mg411y7i9/?spm_id_from=333.999.0.0&vd_source=7e8cfbc83bcd0c8522627c6544d35724) 寻找感兴趣的内容

![](https://user-images.githubusercontent.com/124654014/219299529-5d42d133-f9e6-43bc-a14c-3987355b819a.jpg)

**⭐️ [Taichi 论坛](https://forum.taichi-lang.cn/) 完成改版升级！**

论坛互动体验大大优化，新增资料库和快捷链接便于大家寻找学习资料。欢迎小伙伴们在论坛发帖、分享经验、参与活动～我们也将持续维护论坛，欢迎持续关注！

## 📝 贡献者力量

感谢社区同学在增加新功能、修复问题等方面的贡献.

@Hanke98 

Support basic sparse matrix operations on GPU [#6082](https://github.com/taichi-dev/taichi/pull/6082)

@lucifer1004

Change deprecated make_camera() to Camera() [#6009](https://github.com/taichi-dev/taichi/pull/6009)

## 🧑‍💻 如何成为 Taichi 贡献者

**期待更多同学加入贡献者的队伍之中，特别送上几则小贴士：**

- **[Taichi 贡献者指南](https://docs.taichi-lang.org/docs/contributor_guide)**
 
   一文带大家读懂如何成为 Taichi 贡献者，解释了具体的行为规范，也包含了实用小技巧，便于大家快速上手。
   
- **[Taichi 编程语言的开发进度面板](https://github.com/orgs/taichi-dev/projects/1)**
 
   便于大家快速了解 Taichi 未处理/进展中/已处理/已完成开发的 issue。
   
- **[从这里寻找贡献灵感](https://github.com/taichi-dev/taichi/contribute)**

   开启向 Taichi 贡献第一步，可从 GitHub 中找到灵感，从 good first issue（非常容易上手） 和  welcome contribution （稍微带有挑战性）这两类 issues 中找到感兴趣的贡献方向。
   
- **[加入 GitHub discussion](https://github.com/taichi-dev/taichi/discussions)**
 
   在这里你可以与海内外开发者一起讨论功能开发、Taichi roadmap 等话题，也欢迎提出你对 Taichi 的建议。
 
- **[Awesome Taichi](https://github.com/taichi-dev/awesome-taichi)**
 
   精选社区同学用 Taichi 做出的优质项目，可以从中找到感兴趣的例子尝试运行。 
