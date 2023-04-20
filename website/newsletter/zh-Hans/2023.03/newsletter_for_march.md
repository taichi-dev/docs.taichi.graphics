---
title: "Taichi 三月社区月报"
date: "2023-04-01" 
description:
  📌 三月高光时刻\Taichi v1.5 发布\Taichi NeRF 项目大公开\Taichi Discord 现已启用
---

# Taichi 2023 年 3 月社区月报

## 📌 三月高光时刻

- Taichi v1.5 发布，Taichi 运行时（TiRT）目前已支持 MAC 的 Metal API 和 OpenGL ES。
- Taichi NeRF 项目大公开，快来训练属于你的 3D 模型！
- Taichi Discord 现已启用，欢迎加入和全球开发者一起共建 Taichi 社区

## ⚙️ 技术动态

**🔧 Taichi v1.5.0 发布！看看有哪些重要更新：**

- Taichi 运行时（TiRT）目前已支持 MAC 的 Metal API 和 OpenGL ES，以便兼容旧的移动平台。
- Taichi AOT 完全支持 float16 数据类型。
- ndarrays 现在支持越界检查。
- Python 前端：基于 LLVM 的后端（CPU 和 CUDA）现在支持返回结构体，包括包含向量和矩阵的嵌套结构体。
- CUDA 后端对半精度浮点数类型 half2 的原子操作进行了优化。
- GGUI 后端已支持 Metal、OpenGL、AMDGPU、DirectX 11、CPU 和 CUDA。

赶快升级体验新功能吧 👉 `pip install -U taichi==1.5.0.`

本月合并 193 个 PR，解决 37 个 issue。

## 🗓️ 社区精选作品

**☯️ [Ti example 投稿：可与鼠标交互 2D 欧拉流体模拟。](http://github.com/Lee-abcde/2DEulerianFluidSolver/tree/main)**

这是作者 Lee-abcde 使用 Taichi 完成的 2D 欧拉流体求解器，仅用 300 行代码便完成以下功能： 

- 水面能够与鼠标进行交互  
- 添加旋度运算达到更好的流体表现  
- 支持切换流体的背景图片（访问 GitHub 在 img 目录下可以找到图片）

![](https://user-images.githubusercontent.com/124654014/232972913-c23dfdbf-69b1-4fe4-b201-6878beb170ae.gif)

**🌊 [使用 Taichi 内置可调参数实现 SPH 光滑粒子流体动力学](http://github.com/sillsill777/SPH-Fluid-Simulation)**

这个项目基于 SPH_Taichi。作者 sillsill777 使用 SPH 形式数值解流体方程，该方程控制流体的运动。并进一步考虑控制流体运动的几个影响因素，如粘度和表面张力，以及处理流体-刚体耦合的问题。

![](https://user-images.githubusercontent.com/124654014/232973368-801f4692-c1ea-4a92-beac-8002e6856620.gif)

粘度设置为 0.5

![111](https://user-images.githubusercontent.com/124654014/232975477-3d0c976d-c112-4811-b6e1-1570e9087839.gif)

双流体块案例

**🏠 [使用 Taichi NeRF 进行三维重建](http://github.com/taichi-dev/taichi-nerfs)**

NeRF 技术可以通过一系列 2D 图像对场景进行准确和详细的重建。这个 Demo 展示了 Taichi NeRF 根据不同角度捕捉办公室的多个图像，并生成高质量的 3D 模型，生成的模型可以从任何视角进行探索和可视化。欢迎大家使用 Taichi NeRF 创造 3D 场景！

![](https://user-images.githubusercontent.com/124654014/232973377-12ce31c4-aa99-472f-90b6-b7819f0ad74c.gif)

## 📝 精选博客

**📚 [数值计算从入门到进阶，不能错过这些高质量好书](https://mp.weixin.qq.com/s/yXltvJp6YMhCN7uqXn9IMg)**

我们邀请了几位 Taichi 数值计算兴趣小组成员，请大家介绍一些「亲测好用」的学习资料，过程中收获了 10 多本书籍和论文推荐。包含基本原理和方法，以及如何应用相关方法解决工程和科学问题。

**🔢 [LBM 理论基础是如何推导出来的？Taichi 在数值计算方面有哪些优势?](https://zhuanlan.zhihu.com/p/613851844)**

作者 tau 先从大家比较熟悉的基于连续介质假设而建立的宏观流体力学基本方程入手进行描述，之后简单介绍了微观分子动力学的控制方程并引出介观气体动理论的基本方程——Boltzmann 方程，还写了一个双分布函数的小 Demo 来展示如何利用数值方法来对格子 Boltzmann 方程进行求解。

**💻 [从 Houdini 生成输出四面体网格，有哪些好用的方法?](https://zhuanlan.zhihu.com/p/613817030)**

在 FEM 和 PBD 等软体模拟中，常常需要四面体网格。尤其是可控的，可自由修改的，不同分辨率的网格。Houdini 中的 tetconform 节点能生成很好质量的节点，并且很好修改。但是，Houdini 是不能直接输出四面体的。因此作者北斗分享了最近探索的途径，从 Houdini 中利用 Python 节点输出 tetgen 格式的四面体。

## 🙋‍♂️贡献者力量

感谢社区同学们在 Taichi 项目中的贡献 ❤️

- taichi-nerfs

@erjanmx: Fix readme typo #23

@JiahaoPlus: [bug] Fix utils depth2img by importing cv2 and numpy #17

- taichi

@ritobanrc: [doc] Handle 2 digit minor versions correctly #7535

@NextoneX: [Doc] Update gui_system.md, remove unnecessary example #7487

@schuelermine: [docs] Reword words of warning about building from source #7488

## 🎒 Taichi 小课堂
**如何使用 Taichi 的 math 模块进行复数算术运算？**

🤔 可以使用 2D 向量（ti.math.vec2）表示复数，vec2 中两个数字分别表示复数的实部和虚部，例如使用 ti.math.vec2(1, 1)来代表复数 1+1j。

扫描以下二维码关注我们～

![](https://user-images.githubusercontent.com/124654014/232975155-6b306bbb-e54f-4904-aab0-b8e09fd9b650.jpeg)
