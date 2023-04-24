---
title: "Taichi 六月社区月报"
date: "2022-07-02"
description:
  📌 六月高光时刻\n Awesome Taichi repo 正式发布 \n 60 行 Python 代码实现 Poisson disk 采样，比 NumPy 快 100 倍 \n Taichi 的小矩阵库函数功能需求征集正在进行
---
# Taichi 六月社区月报
<div class="alert--warning alert alert-no-border">

## 📌六月高光时刻

- Awesome Taichi repo 正式发布！🎉

- 60 行 Python 代码实现 Poisson disk 采样，比 NumPy 快 100 倍！⚡️

- Taichi 的小矩阵库函数功能需求征集正在进行中！🙌

</div>


  
## ⚙️ 技术动态

- **v1.0.3 正式发布**

   新版本在 CUDA 集群的支持上有所增强，可以实现各种 CUDA warp 级内联函数。同时新版本中也加入了 ti.struct_class 功能（美国网友 bsavery 友情贡献）可以在 Taichi kernel 中使用。欢迎升级你的 Taichi 版本体验：`pip install --upgrade taichi` 
   [点击这里浏览更新文档](https://github.com/taichi-dev/taichi/releases/tag/v1.0.3) 


## 🌟 社区精选作品

- **[我们可以用 Taichi 做什么？来 Awesome Taichi 找答案](https://github.com/taichi-dev/awesome-taichi)**

   目前 Taichi 能够用于哪些领域，并能初步帮大家解决什么问题？我们发现，社区同学在图像处理、机器人、光学和视觉特效等技术方向都有用到 Taichi ，或是做出应用程序，或是写出研究文章。在此我们也整理出一份 Awesome Taichi 列表，期待能将这些优秀成果收录，被更多同学看到。

   同时也欢迎大家投稿自己的仓库（repo），只要有完整的 readme 文档，能够用最新版的 Taichi 运行，就可以在 Awesome Taichi 仓库中提 PR 。一起来扩充 Taichi 宇宙吧！

   
 ![voxel](https://user-images.githubusercontent.com/38712162/192224297-41a8feac-0747-45a8-9841-30fac8e8cdbb.png)

- **[首个数值计算/流体仿真方向 SIG 来啦]( https://github.com/houkensjtu/taichi-fluid)**

   从经典的卡门涡街，到海洋的洋流变化，社区逐渐涌现出将 Taichi 用于流体仿真模拟的同学们。Taichi 社区成员**包乾**将这些优质项目汇总成知识图谱仓库。
   
  ![fluid](https://user-images.githubusercontent.com/38712162/192224447-8c438218-7b00-4ea1-877c-962d870d7a8e.png)

   目前仓库中已经包含众多欧拉视⻆和拉格朗⽇视⻆的求解器。同时，包乾也发起数值计算兴趣小组，并欢迎对数值计算、流体仿真感兴趣的社区同学们加入。填写[这份表单](https://love3d.wjx.cn/vm/PX0LrrP.aspx?udsid=791245)即可获得加群方式。
  

## 📢 社区活动

-  **Open Office Hours 0623 直播**  
   
  本期 Open Office Hours 同样干货满满，既有 Taichi Cookbook 展示 5 个最实用 Taichi 小技巧，也有 Awesome Taichi 和小矩阵功能的详细解读。现场社区同学们也积极参与交流环节，产生了多个高质量提问。

-  **小矩阵需求征集持续进行中，提需求的好机会别错过**    
  
  Taichi 语言中提供了很多好用的小矩阵库函数，方便大家在 Taichi kernel 中调用。相信大家对其他的线性代数也会有调用的需求，欢迎在 Github Discussion 中留言，我们会逐步完善小矩阵库函数功能，也欢迎感兴趣的小伙伴一起来开发～

-  **新增 Taichi 小挑战等你来**    
  
  近期编辑部在技术博客的文末发起了一些「小挑战」，期待大家小试牛刀，基于这些示例做出新的小程序。
  其中标记 [easy] 的题目完成后，技术小组将从参与者中随机抽 5 位幸运同学，送上 Taichi 抱枕；[medium]/ [hard] 的题目完成后，技术小组会从每个题目中选出 3 个最佳解法，为作者送出书包。


## 👍 贡献者力量
  
  感谢 3 位同学在六月贡献 PR，也非常欢迎更多同学与我们一起开发 Taichi。
   
   **@AD1024** #5245 Throw exceptions when ndrange gets non-integral arguments

   **@feisuzhu** #5234 Debug windows CI bot 

   **@quadpixels** #5151 Redirect global_tmps_buffer_i32 to u32 


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

  
