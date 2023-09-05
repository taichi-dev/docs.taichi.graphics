---
title: "Taichi 2023 年 2 月社区月报"
date: "2023-06-01"
description:
  📌 Taichi 发布 v1.6.0\Taichi NeRF 移动端正式开源\多场高质量技术分享……
---

# Taichi 2023 年 5 月社区月报

## 📌 五月高光时刻

- Taichi 发布 v1.6.0
- Taichi NeRF 移动端正式开源
- 多场高质量技术分享

## ⚙️ 技术动态

**🔧 Taichi v1.6.0 发布**


重要更新包括：
- 所有后端都支持使用结构参数。结构可以嵌套，并且可以包含矩阵和向量。
- 在 Python 范围内支持 0 维 ndarray 的读写。
- 支持在 CUDA 中分配超过 48KiB 的共享数组。
- 改进了 CPU 后端的向量化支持，对特定应用程序有显著的性能提升。

赶快升级体验最新功能吧👇
`pip install -U taichi==1.6.0`

**[🚡 Taichi NeRF 移动端正式开源](http://github.com/taichi-dev/taichi-nerfs/tree/main/deployment/InstantNGP)**

用户可以在手机、平板、VR 等设备上部署预训练好的 NGP 模型。

![](https://github.com/ziruier/community/assets/124654014/80ba6399-e235-41fd-9b73-6c8258c60d70)

iPad 部署效果

## 🗓️ 社区精选作品

**[🤖 使用物质点法（Material Point Method）模拟磁性软机器人的框架](http://github.com/joshDavy1/magneticMPM)**

磁性软机器人由嵌入磁性元素的硅胶聚合物组成。作者 joshDavy1 的目标是提供一个易于使用的磁性软机器人模拟器，可以使用物质点法对其进行动态行为建模。框架中 magneticMPM 是使用 Taichi 编程语言构建的。

![](https://github.com/ziruier/community/assets/124654014/96d454e2-630d-4162-8126-4a9c0b10ccbc)

**[🔢 基于 PIC 方法的 1D Landau damping 模拟](http://github.com/HuntFeng/landau-damping-pic)**

这是一个使用 Taichi 完成的基于 PIC 方法的 1D Landau damping 模拟。模拟所用的代码只有短短不过 300 行，却能在 GPU 上进行并行计算。

![](https://github.com/ziruier/community/assets/124654014/a7bd8596-e47d-4a66-889d-8c466880dd03)

## 📝 社区分享

**[🚁 无人机集群的协同定位与建图（CSLAM）是如何实现的？](https://www.bilibili.com/video/BV1fh4y1b7VC/?spm_id_from=333.999.0.0&vd_source=557b93a9c52a2a87defffd2380d26336)**

本期分享嘉宾徐浩是香港科技大学电子及计算机工程系博士，现任大疆多源信息融合算法工程师。本次分享从研究工作出发，由浅入深地探讨无人机集群从相对定位到分布式协同建图在内的课题，并对其中涉及的高性能数值计算部分进行重点讨论。尤其讨论 Taichi 编程语言在相关研究的应用潜力，并分享有关自主机器人所需要的高性能数值计算，分布式计算的个人思考。

**[🖲 3DShape2VecSet：面向神经场和生成扩散模型的 3D 形状表示 | SIGGRAPH 2023](https://www.bilibili.com/video/BV1WP411d777/?spm_id_from=333.999.0.0&vd_source=557b93a9c52a2a87defffd2380d26336)**

本期 Paper Reading，论文第一作者张彪，向大家介绍了 3DShape2VecSet，这是一种为生成扩散模型设计的神经场的新形状表示。研究结果表明，在 3D 形状编码和 3D 形状生成建模任务中，性能有所提高。在分享中，作者从 autoencoder 的设计开始讲起，如何设计一个适合 3D shape diffusion 的 latent space，并展示了多个生成模型的结果。

## 🙋‍♂️贡献者力量

感谢社区同学们在 Taichi 项目中的贡献 ❤️

- taichi

@oliver-batchelor, [build] Fix build on arm64 #7978 

@Nanase-Nishino, [example] PR apply for an example of differential algorithm #7881

![](https://github.com/ziruier/community/assets/124654014/47d12f24-aefe-4bc2-b780-7151870bf9fc)

贡献者海报全新上线

扫描以下二维码关注我们～

![](https://user-images.githubusercontent.com/124654014/232975155-6b306bbb-e54f-4904-aab0-b8e09fd9b650.jpeg)

