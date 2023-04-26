---
title: "Taichi 2023 年 2 月社区月报"
date: "2022-3-01"
description:
  📌 二月高光时刻\GAIDC 开源集市\PAC-NeRF\多材料物理引擎 Soft2D……
---

# Taichi 2023 年 2 月社区月报

**8️⃣ 图带你回顾近期 Taichi 高光时刻。**

## 💡社区精选作品

**1️⃣ Soft2D**

Soft2D 是一个基于 Taichi AOT 模式的 2D 实时多材料仿真物理引擎。通过 Taichi 的助力，Soft2D 可以使用 GPU 加速物理模拟计算，并且运行在不同的设备上（PC 端和移动端）。这里展示了游戏开发者使用 Soft2D 制作的游戏原型 Demo，其中展示了 Soft2D 的一些基础功能：流体发射器和运动的碰撞体。

**2️⃣3️⃣ [体素风车](http://github.com/wenqi-wang20/voxel-windmill)**

作者 wenqi-wang20 用 180 行 Taichi 代码，还原了北戴河的沙滩、礁石、海浪、风车，用温暖柔和的光线，赋予体素世界晴朗明快的氛围。

## ✨ 社区精彩活动

**4️⃣5️⃣ [PAC-NeRF](https://www.bilibili.com/video/BV1Ps4y1h7nC/?vd_source=7e8cfbc83bcd0c8522627c6544d35724)：结合传统仿真方法，通过多角度视频，无几何先验估测材料参**

本期大讲堂邀请到了 UCLA 数学系 MultiPLES Lab 的博士生李轩。这次分享内容是他最近的 ICLR 工作 PAC-NeRF。这个工作提出的物理增广连续介质神经辐射场（Physics Augmented Continuum NeRF）可以在不假设物体几何形状或拓扑的情况下，从多角度视频中推断物理系统的参数。目前在包括纯弹性体、橡皮泥、沙子、牛顿流体和非牛顿流体等多种材料上，验证了所提出的框架在几何和物理参数估计方面的有效性。

**6️⃣7️⃣8️⃣ 全球人工智能开发者先锋大会（GAIDC） 开源集市**

详情请点击 [集市纪念册 1](http://github.com/yuanming-hu/taichi_physics_puzzle) / [集市纪念册 2](http://github.com/Linyou/taichi-ngp-renderer) 

参会者在现场体验了基于 Taichi 完成的流体小游戏和 Taichi NGP 渲染器。我们把北京办公室的流体交互装置也搬到了现场，只需挥挥手，屏幕中的水墨动画就会跟随动作产生变化，吸引了众多参会者参与互动。

1️⃣![](https://user-images.githubusercontent.com/124654014/223315148-be132027-d9bd-42fc-9412-3dffb9cc8297.jpeg)
2️⃣![](https://user-images.githubusercontent.com/124654014/223315153-c226154f-d5e9-4e8b-9160-2df5dcde9779.png)
3️⃣![](https://user-images.githubusercontent.com/124654014/223315176-473d7065-8be2-41e7-9552-34fa273ad66d.png)
4️⃣![](https://user-images.githubusercontent.com/124654014/223315131-80e1b812-1f70-457a-bf5f-6cd80632fa6f.png)
5️⃣![](https://user-images.githubusercontent.com/124654014/223315193-db8b9b83-a698-4b0c-b45f-620d52fe4fef.png)
6️⃣![](https://user-images.githubusercontent.com/124654014/223315097-be9f600c-1e8f-4262-9ed4-7d5af8e6ca37.jpeg)
7️⃣![](https://user-images.githubusercontent.com/124654014/223315112-27257e18-4592-4a55-b805-6bfac0ddbd21.jpeg)
8️⃣![](https://user-images.githubusercontent.com/124654014/223315123-1dcc57d3-73a5-4358-bc13-8feea7a2734d.jpeg)

👀 你希望在 Taichi 社区月报看到哪些内容？欢迎在评论区留言。
