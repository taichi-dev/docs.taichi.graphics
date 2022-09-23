---
title: "Taichi 七月社区月报"
date: "2022-08-02"
description:
  📌 七月高光时刻\n Taichi v1.0.4 版本更新 \n Taichi 数值计算兴趣小组成立 \n 5 个 Taichi 使用小技巧新鲜发布
---
# Taichi 七月社区月报
<div class="alert--warning alert alert-no-border">

## 📌七月高光时刻

- Taichi v1.0.4 版本更新！🎉

- Taichi 数值计算兴趣小组成立！🙌

- 5 个 Taichi 使用小技巧新鲜发布！🏃

</div>


  
##  ⚙️ 技术动态

- **v1.0.4 版本正式发布**

   本次版本进行了语言、语法和文档的少量更新。更多细节请参考完整的 Release Notes 文档。 欢迎升级你的 Taichi 版本体验：`pip install --upgrade taichi` 
   [点击这里浏览更新文档](http://bit.ly/3RBc1Ld) 
  
  
- **Clang 15 目前能够在 COMPILE_LLVM_RUNTIME 中使用** 

   贡献者 **python3kgae** 提议为编译器添加 DirectX 12 后端。到目前为止，他已经成功地为 COMPILE_LLVM_RUNTIME 启用了 Clang 15，并更改了 getPointerElementType 的使用方法。感谢这位开发者的贡献！当然，Taichi 仍然支持 Clang 10。目前这个功能仍在开发中，欢迎关注它的开发进展，[点击这里](https://github.com/taichi-dev/taichi/issues/5276)也可以加入讨论。


## 📢 社区活动

-  **Taichi 数值计算兴趣小组正式成立！**  
   
   随着 Taichi 社区中计算流体力学（CFD）相关的优秀项目越来越多，数值计算兴趣小组应运而生，Taichi 的工程师们也会加入其中，围绕数值计算、流体仿真等发起讨论，希望为大家搭建共同交流和学习的平台。 近期数值计算兴趣小组将举办系列活动，欢迎大家关注[活动安排](https://forum.taichi.graphics/t/sig-01-taichi/2772/2)。

## 🌟 社区精选作品

- **[如何用 Taichi 做出一只「发光兔」？](https://github.com/yhesper/TaichiSimplicialFluid)**

   社区同学 **yhesper** 根据 Elcott 的 Simplicial Fluids 修改版算法，在三角形网格的表面创建了一个实时流体模拟。这份作品也具有互动效果，用鼠标点击某个部分将出现流动的彩色光线。这个酷炫的艺术作品基于 Taichi 编程语言和 Taichi 的 GGUI 功能完成。 
   
  ![rabbit](https://github.com/taichi-dev/docs.taichi.graphics/blob/master/website/newsletter/en/07/pics/unnamed.gif)


- **[UE5 中也能用 Taichi 做出酷炫特效？](https://github.com/cgerchenhp/TAPython_Taichi_Examples)**

   社区同学 **cgerchenhp** 在 UE5 中创作出云朵流动特效场景。这份作品充分发挥出 Taichi 编程语言的并行计算优势，作者实现了 Taichi 对 UE 和 Python 的支持（通过插件 TAPython 即可实现）。感兴趣的同学也可以运行这个示例，体验令人惊叹的 3D 场景。 
   
  ![ue5](https://github.com/taichi-dev/docs.taichi.graphics/blob/master/website/newsletter/en/07/pics/ue.gif)
  
  
- **[用 Taichi 实现刚体模拟算法 Shape matching](https://github.com/chunleili/tiRigidBody)**

   在物理仿真中常常会遇到刚体模拟的问题。2005 年 Muller 等人提出来的 shape matching（形状匹配）就是其中一种算法。社区同学 **chunleili** 用 Taichi 实现了这一算法，和其他算法相比，其优点在于：①该算法是纯粹的粒子法，它容易和 SPH 等粒子流体模拟方法结合使用，模拟流固耦合或相变；②该算法十分简单，用 Taichi 写成的核心算法不超过 30 行；③该算法只要稍加改进，就可以模拟弹性体和塑形体。
  
  ![rigid_body](https://github.com/taichi-dev/docs.taichi.graphics/blob/master/website/newsletter/en/07/pics/rigid_body.gif)


- **[在 Julia 中使用 Taichi](https://github.com/lucifer1004/Taichi.jl)**

   社区同学 **lucifer1004** 尝试在编程语言 Julia 中使用 Taichi，创造出 Taichi.jl 项目。这个项目基于两个 Julia 的包：PythonCall.jl 和 Jl2Py.jl，总代码量只有几十行。目前他在 Julia 中实现了三个例子，分别是经典的 Julia Set、Game of Life 和 FEM99。欢迎感兴趣的小伙伴访问项目链接，试用体验。
   
   ![julia](https://github.com/taichi-dev/docs.taichi.graphics/blob/master/website/newsletter/en/07/pics/julia.gif)

  
  
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

  
