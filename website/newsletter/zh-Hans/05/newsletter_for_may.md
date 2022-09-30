---
title: "Taichi 五月社区月报"
date: "2022-06-03"
description:
  📌 五月高光时刻\n  Taichi v1.0.2 正式发布 \n Taichi 开发看板 & 社区新讨论平台 Slack 上线 \n 首届 Taichi Voxel Challenge 结果揭晓
---
# Taichi 五月社区月报
<div class="alert--warning alert alert-no-border">

## 📌五月高光时刻

- Taichi v1.0.2 正式发布！🎉

- Taichi 开发看板 & 社区新讨论平台 Slack 上线！🙌

- 首届 Taichi Voxel Challenge 结果揭晓！🏆

</div>


  
## ⚙️ 技术动态

- **Taichi v1.0.2 发布**

   本次迭代版本增强了 Taichi 对多个平台的兼容性。如果你在 v1.0.1 版本上遇到 GGUI 和 Vulkan 的稳定性问题，可以升级到 v1.0.2 版本再做尝试。欲了解更多细节，请参考 v1.0.2 版本发布说明文档。欢迎升级你的 Taichi 版本体验：`pip install --upgrade taichi` 
   [点击这里浏览更新文档](https://github.com/taichi-dev/taichi/releases/tag/v1.0.2) 

- **Taichi 开发看板 & 社区新讨论平台  Slack 上线**
   
   经过公开讨论，Taichi Community Work Space 正式上线。欢迎社区同学加入 Slack 讨论项目开发进展。我们也将在 Slack 同步社区活动、Release Notes 等信息。[点击这里即可加入 Slack 平台](https://join.slack.com/t/taichicommunity/shared_invite/zt-14ic8j6no-Fd~wKNpfskXLfqDr58Tddg)。

   同时，Taichi 开发进展目前已在 GitHub Projects Beta 中可见，能够实时看到开发动态。[点击这里](https://github.com/orgs/taichi-dev/projects/1)可直达看板。

！[kanban](https://github.com/taichi-dev/docs.taichi.graphics/blob/master/website/newsletter/en/05/pics/kanban.png)

## 🌟 社区精选作品

- **[2D-simulator 流体数值计算求解器](https://github.com/takah29/2d-fluid-simulator)**

   从语言的角度来说，Taichi 虽然诞生于计算机图形学界，但是其对并行运算和跨平台的天然支持完全可以在科学计算领域发挥价值。GitHub@takah29 同学的 2d-fluid-simulator 项目就是这样的一个硬核 CFD(Computational Fluid Dynamics) 流体数值计算求解器。作者以 MAC(Marker-And-Cell) 法为基础，在极短的代码行数内实现了二维环境下的单个圆柱、多个圆柱以及平板障碍物绕流等工况的模拟。
   
   特别值得一提的是，作者对流体求解器代码进行了很好的 OOP(Object-Oriented Programming) 风格封装，将对流项差分、边界条件、流体可视化等功能模块都进行了独立的拆解，在提高代码易读性和减少代码重复上做了很多细致的设计，强烈推荐有兴趣的同学动手运行一下。


 ![2d-simulator](https://github.com/taichi-dev/docs.taichi.graphics/blob/master/website/newsletter/en/05/pics/flow_field_1.png)

 <center>Re=100，采用风上差分格式时的单个圆柱绕流</center>

 ![2d-simulator2](https://github.com/taichi-dev/docs.taichi.graphics/blob/master/website/newsletter/en/05/pics/flow_field_2.png)

  <center>多个圆柱绕流</center>

- **[图形「英雄榜」](https://forum.taichi.graphics/t/topic/2608)**

   社区同学 lyd 想做一些 sdf、体素生成方面的算法样例，在搜索相关资料的过程中萌生出灵感，沉淀出一份图形学大牛的「英雄榜」。通过这份榜单，他期待能够帮助大家了解更多计算机图形学大牛的研究成果，对自己的研究和开发带来新的启发。讨论帖发出后，社区同学 beidou 也在其中分享了自己的学习笔记，包含图形学物理模拟相关学者简介、个人网站链接及学术文章链接。
  
   如果大家也想将自己的知识分享到「英雄榜」中，可以访问 [lyd 同学的论坛帖](https://forum.taichi.graphics/t/topic/2608)与 [beidou 的博客](https://blog.csdn.net/weixin_43940314/article/details/123841124) 。



## 📢 社区活动

-  **首届 Taichi Voxel Challenge 结果揭晓**  
   
  本次大赛于 5 月 25 日圆满结束，共收到 88 位参赛选手的 112 件作品，以及 10 余篇博客。投稿内容不乏灵动可爱的小动物、经典地标建筑、奇幻世界、动漫场景还原等等，详情请见这篇[比赛回顾文章](https://mp.weixin.qq.com/s/TZDlwu8DqtuWt30FmAzDhw)。

-  **Taichi Open Office Hours 体素创作分享**    
  
  5 月 13 日 Open Office Hours 进行体素创作分享，Taichi 项目作者渊鸣和社区成员包乾、刘博、孙杨泽晟参与直播，向大家分享自己如何在指定代码行内，运用技巧创作出精彩的体素作品，回放视频已上传到 B 站 ，[点击这里](https://www.bilibili.com/video/BV1YZ4y187iq?share_source=copy_web)可访问观看，欢迎收藏。




## 👍 贡献者力量
  
  本月中 Taichi 社区也迎来两位新贡献者 Mike-Leo-Smith 和 BioGeek 同学（均为 GitHub ID），他们分别在 CUDA 中 MPM 内核优化、Python 代码片段更正中参与贡献，感谢两位贡献者！


## 🧑‍💻 如何成为 Taichi 贡献者

   自开源之初，Taichi 贡献者们积极参与开发，并为打造更好的 Taichi 持续贡献力量。以下是成为 Taichi 贡献者们的一些 Tips，期待更多同学加入贡献者的队伍之中。
 - **[Taichi 贡献者指南](https://docs.taichi-lang.org/docs/contributor_guide)**
 
   一文带大家读懂如何成为 Taichi 贡献者，解释了具体的行为规范，也包含了实用小技巧，便于大家快速上手。
   
 - **[Taichi 编程语言的开发进度面板](https://github.com/orgs/taichi-dev/projects/1)**
 
   便于大家快速了解 Taichi 未处理/进展中/已处理/已完成开发的 issue。 
   
 - **[从这里寻找贡献灵感](https://github.com/taichi-dev/taichi/contribute)**
 
   开启向 Taichi 贡献第一步，可从 GitHub 中找到灵感，从 [good first issue](https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)（非常容易上手）和 [welcome contribution](https://github.com/taichi-dev/taichi/issues?q=is%3Aopen+is%3Aissue+label%3A%22welcome+contribution%22)（稍微带有挑战性）这两类 issues 中找到感兴趣的贡献方向。 
   
 - **[加入 GitHub discussion](https://github.com/taichi-dev/taichi/discussions)**
 
   在这里你可以与海内外开发者一起讨论功能开发、Taichi roadmap 等话题，也欢迎提出你对 Taichi 的建议。 
   
 - **[Awesome Taichi](https://github.com/taichi-dev/awesome-taichi)**
 
   精选社区同学用 Taichi 做出的优质项目，可以从中找到感兴趣的例子尝试运行。 

  
