---
title: "Is Taichi Lang comparable to or even faster than CUDA?"
date: "2022-05-06"
slug: "is-taichi-lang-comparable-to-or-even-faster-than-cuda"
authors:
  - turbo0628
tags: [benchmark, CUDA]

---

In our recently published blog: *[Taichi AOT, the solution for deploying kernels in mobile devices [1]](https://docs.taichi-lang.org/blog/taichi-aot-the-solution-for-deploying-kernels-in-mobile-devices)*, we demonstrated how to deploy a gravity-based, interactive physical simulation on an Android mobile phone. As we know, the computing capability of mobile devices is limited by hardware and production costs and is barely satisfactory. The question then arises: Is Taichi Lang able to make better use of the underlying hardware than other native, low-level programming languages? With this question in mind, we kick-started the benchmark project in an attempt to provide a comprehensive and accurate performance evaluation of Taichi Lang.

Taichi Lang is a domain-specific language (DSL) and can solve a great many numerical computing problems with just a few lines of code. We established a testing set of frequently used algorithms, from which we compared Taichi Lang with the top performer (CUDA) in the field on every benchmark. To put it differently, we compared Taichi Lang's implementation of these algorithms with other top-notch third-party implementations. The aim is to evaluate the effectiveness of the language's inbuilt optimization mechanism and to look for room for improvement. Further, the comparison between Taichi Lang and CUDA uses Nvidia GPUs to ensure that we evaluate Taichi Lang with the highly optimized CUDA code.

<!--truncate-->

This benchmark project partially answers the long-standing question from Taichi Lang's users: how does Taichi Lang compare to CUDA? We conducted experiments against CUDA's reference implementations on an Nvidia Geforce RTX 3080 graphics card, using two different timing methods on nine algorithms:

- Wall clock timer: Repetitively runs the compute kernels and calculates the average computing time. The time excludes the first round of kernel run because it includes Taichi Lang's compilation overhead.
- Native kernel timer: The kernel timer can measure the GPU computing time. We used the `cudaEventElapsedTime` interface for CUDA and `ti.profiler`[2] for Taichi Lang. For the sake of fairness, both timers are implemented using the CUPTI library.

*Specifically, the wall clock timer still involves Python overhead and fits better into the real-world scenarios; the kernel timer calculates the GPU computing time only and provides more accurate assessments of the quality of the kernels. Each benchmarking is made using a consistent timing method for the sake of fairness.*

The following diagram compares the acceleration ratio of Taichi Lang with CUDA in percentage terms.

|![Taichi-vs-cuda](https://user-images.githubusercontent.com/93570324/167157162-1f336f55-6882-4630-a952-4e2bca1b3c5a.png)|
|:--:|
| Fig.1 Acceleration ratio of Taichi Lang against CUDA in percentage terms on nine algorithms, measured by dividing CUDA computing time by Taichi Lang's computing time. The acceleration ratio presented for each algorithm (test case) is an average of all the test loops.   |

It is inspiring that Taichi Lang achieves performance comparable to CUDA in most test cases. In the MPM test, Taichi Lang exhibits significantly better performance than CUDA. This is thanks to the automatic discovery of optimization opportunities.

Besides, we applied the *roofline model [4]* in the SAXPY test. The roofline model is commonly used in HPC (high-performance computing) applications for evaluating the upper limit of a chip. The higher arithmetic intensity an algorithm has, the less likely that the algorithm will be restricted by the memory bandwidth, and the more computing capability will be squeezed out of the chip. To achieve different arithmetic intensities, we tweaked the SAXPY algorithm by adding different rounds of multiplication-addition operations at each memory access. As illustrated in the following performance chart, Taichi Lang exhibits performance very close to the roofline. This result confirms that Taichi Lang can effectively leverage the devices' computing capability in regular computations.

| ![arithmetic intensity](https://user-images.githubusercontent.com/93570324/167157241-3c901cd5-8ca1-4cfe-8e25-554155374d14.png) |
|:--:|
| Fig.2 Roofline of the SAXPY algorithm. The X-axis denotes arithmetic intensity in the number of floating-point operations per byte of memory access; the Y-axis denotes performance in billion floating-point operations per second. |

We also observed unsatisfactory results in the N-body test shown in Fig. 1. In this test, we compared Taichi Lang's implementation with a reference implementation [3], which provides codes for each optimization step. Though Taichi Lang's performance is close to that of an intermediate optimization step, it can not compare to the fully optimized CUDA implementation. We blame this on the absence of many features: the support for the float4 data type, which CUDA uses to increase memory bandwidth, the support for shared memory support, and more. Going forward, we will continue optimizing Taichi Lang's compiler and improving the performance of Taichi Lang's programs.

| ![n-body benchmark](https://user-images.githubusercontent.com/93570324/167157281-7a59ca54-5222-4e6d-8735-d544acc4a40a.png) |
|:--:|
| Fig.3 The N-body benchmark. The X-axis denotes body number; the Y-axis denotes speed. Each curve represents a specific optimized version. |

Please refer to the Taichi benchmark code repository [5] for more detailed performance analysis reports. We have a plot_benchmark.py script in each sub-directory, which can reproduce the above-mentioned performance charts once run. If you want to add more algorithms to our benchmark project or have a better baseline program, submit an issue in our repo. Let's work together to help Taichi Lang run faster!

- [1] Taichi AOT, the solution for deploying kernels in mobile devices https://docs.taichi-lang.org/blog/taichi-aot-the-solution-for-deploying-kernels-in-mobile-devices
- [2] Taichi profiler Document https://docs.taichi-lang.org/docs/profiler
- [3] N-body reference code repository https://github.com/harrism/mini-nbody
- [4] Roofline model https://en.wikipedia.org/wiki/Roofline_model
- [5] Taichi benchmark code repository https://github.com/taichi-dev/taichi_benchmark









