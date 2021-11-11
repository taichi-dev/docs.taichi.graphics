import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 太极图形课-第一季


<Tabs
  defaultValue="live"
  values={[
    {label: '直播地址', value: 'live'},
    {label: '作业与答疑', value: 'homework'},
    {label: 'B 站回放', value: 'video'},
    {label: '课件下载', value: 'pdf'},
  ]}>

  <TabItem value="live">

  [**知乎直播链接**](https://www.zhihu.com/org/tai-ji-tu-xing)

  [**哔哩哔哩直播链接**](https://live.bilibili.com/23526804)

  **微信直播链接**：请关注 **太极图形** 微信公众号，二维码如下：

  <center>

  ![](https://open.weixin.qq.com/qr/code?username=taichi_graphics)

  </center>

  </TabItem>
  <TabItem value="homework">

  [**太极论坛**](https://forum.taichi.graphics/)
  
  </TabItem>

 <TabItem value="pdf">

  见[课程大纲](#课程大纲及时间)表格内链接
  
  </TabItem>

<TabItem value="video">

  [**直播回放**](https://space.bilibili.com/1779922645/channel/seriesdetail?sid=337716&ctype=0)

  </TabItem>
</Tabs>


---

太极图形课第一季已于9月14日晚7点正式首播，带领同学们学习「太极」语言与计算机「图形学」。
## 课程大纲及时间




本季课程将通过 **太极图形** 微信公众号、[**太极图形**](https://space.bilibili.com/1779922645) bilibili账号，[**太极图形**](https://www.zhihu.com/org/tai-ji-tu-xing) 知乎机构号进行直播。
课程直播时间为每周二晚7点（中秋顺延），答疑时间则为每周四晚7点，详细时间表如图所示。

| 直播时间 	| 回放视频 (B 站) 	| 课件 | 代码 | 直播答疑时间 	| 作业分享|
|---|:---:|:---:|:---:|:---:|:---:|
| 第00讲:09/14 	| [导览：什么是图形学？什么是太极？](https://www.bilibili.com/video/BV1aL4y1a7pv) |[课件](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/00_Intro.pdf) 	| |09/16 	| |
| 第01讲:09/22 	| [Hello World：编写你的第一个太极程序](https://www.bilibili.com/video/BV1aL4y1a7pv?p=6) |[课件](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/01_Taichi_Basis.pdf) 	| [代码](https://zoo.taichi.graphics/playground/80eca823500f932be64e4ec37a0879dd) | 09/23 	| [答疑PPT](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/01_Q%26A.pdf)|
|第02讲: 09/28 	| [复用你的太极代码：元编程和面向对象编程](https://www.bilibili.com/video/BV11q4y1P7os) |[课件](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/02%20Metaprogramming%20and%20OOP.pdf) 	|[代码](https://github.com/taichiCourse01/--Galaxy) |  09/30 	||
| 第03讲:10/12 	| [大规模计算的关键：高级数据结构](https://www.bilibili.com/video/BV1Xv411g7Vg) |[课件](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/03_advanced_data_layouts.pdf)	| [代码](https://github.com/taichi-dev/taichi/blob/master/examples/features/sparse/taichi_sparse.py) | 10/14 	||
| 第04讲:10/19 	| [调试和优化你的太极程序](https://www.bilibili.com/video/BV1F44y147tm) |[课件](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/04_sm_debuge_optimization.pdf) 	| [代码](https://github.com/taichiCourse01/--Diffuse) | 10/21 	|[BESO拓扑优化](https://www.bilibili.com/video/BV1F44y147tm?p=5) : [PPT](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/BESOTopologyOptimsation.pdf)|
| 第05讲:10/26 	| [程序动画：生成你的第一个二维动画](https://www.bilibili.com/video/BV14Q4y1q7C9?spm_id_from=333.999.0.0) |[课件](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/05_procedural_animation.pdf)| [代码](https://github.com/taichiCourse01/--Shadertoys) | 10/28 	|[蚂蚁吃太极](https://www.bilibili.com/video/BV14Q4y1q7C9?p=6) : [PPT](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/ants_eat_taichi_Afish.pdf)|
| 第06讲:11/02 	| [渲染01：光线追踪概念和基础](https://www.bilibili.com/video/BV1AT4y1d762) |[课件](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/06_basics_ray_tracing.pdf)	| [代码](https://github.com/taichiCourse01/taichi_ray_tracing) | 11/04 	|[墨戏](https://www.bilibili.com/video/BV1AT4y1d762?p=4): [PPT](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/moxi.pdf)|
| 第07讲:11/09 	| [渲染02：光线追踪实战](https://www.bilibili.com/video/BV1XL4y1q7Tp) |[课件](https://github.com/taichiCourse01/taichiCourse01/blob/main/material/07_implementation_details_ray_tracer.pdf)	|[代码](https://github.com/taichiCourse01/taichi_ray_tracing) |  11/11 	|太阳系仿真|
| 第08讲:11/16 	| 弹性物体仿真01：时间和空间离散化 |课件	|代码 |  11/18 	|Marching Squares|
| 第09讲:11/23 	| 弹性物体仿真02：隐式积分和数值解法  |课件	| 代码 |11/25 	||
| 第10讲:11/30 	| 流体仿真01：拉格朗日视角 |课件	| 代码 | 12/02 	||
| 第11讲:12/07 	| 流体仿真02：欧拉视角 |课件	|  代码 |12/09 	||
| 第12讲:12/14 	| 神秘嘉宾客串：从太极的使用者变成太极的贡献者|课件 	|  	||

## 课程特色
1. 每堂课后设置丰富的体验作业，即学即用，感受酷炫的视觉效果；
2. 小白友好，每周答疑，真正手把手带你入门计算机图形学；
3. 降低图形学编程门槛，用太极提高生产力。

【**课时**】：共安排13节讲堂及12节答疑，每节课约45分钟。

【**授课形式**】：中文授课，英文课件。当日直播，次日于 [太极图形](https://space.bilibili.com/1779922645) bilibili账号发布课程录播。（由于B站审核时间的问题，请同学们耐心地常刷常新～）

【**课程需求**】：了解Python基础语法，有线性代数和高中物理知识更佳。

## 作业设置
1. 每节课后设置开放性的体验作业，邀请同学们动手玩太极。
2. 随堂小作业依课程内容设置，通过[太极论坛](https://forum.taichi.graphics/)提交，帮助同学们巩固课堂所学。
3. 最后设置1次结课作业，通过Github私有库提交，证书将在结课作业通过审核后随奖品寄出。结课后同学们可以选择开源大作业，以供交流讨论，学习分享。

【**作业要求**】：
本季课程全部是编程任务。所有作业不作强制要求，自愿完成。但是需要结业证书的同学需要提交结课作业哦。

## 答疑规则
本季课程特设每周一次的答疑直播（Office Hour）。同学们在学习、重温课程之后，可以在[太极论坛](https://forum.taichi.graphics/)上进行提问。在收集，整理问题之后，老师及助教会在答疑直播中为大家解答。

* 如何提问？
请前往[太极论坛](https://forum.taichi.graphics/)。请同学们务必参考问题样例，清晰准确地描述问题，以便于我们可以最精准地解决你的疑惑。

* 如何附议问题？
当你的疑惑已经被其他同学提出，你便无需重复提问，只需在帖子下回复评论/补充细节。由于时间问题，困惑最多的问题将在答疑直播中被优先解答。（不过也不用担心，细小的个别问题我们也会在论坛/微信群里为大家解答）

* 我可以接入直播吗？
在统一答疑结束后，直播将关闭，仍有疑问的同学欢迎加入腾讯会议，以举手的形式和助教连线，深入讨论问题。（腾讯会议入口将在太极图形课微信群发布）


## 讲师
<!--https://docusaurus.io/docs/static-assets#markdown-example-->
<p align="center">
<img width="300"  alt="Docusaurus with Keytar" src={useBaseUrl('https://tiantianliu.cn/images/profile/tiantian_1.jpg')} />
</p>

[刘天添](https://tiantianliu.cn/)，太极图形资深研究科学家，宾夕法尼亚大学计算机和信息科学博士，宾夕法尼亚大学计算机图形与游戏技术硕士，以及浙江大学计算机科学与技术学士。加入太极图形之前，刘天添在微软亚洲研究院的 Internet Graphics 组担任了 3 年的副研究员。

## 助教
* [禹 鹏](https://yupengvr.github.io)
* [余 畅](https://github.com/g1n0st)
* [李喆昊](https://github.com/Ricahrd-Li)
* [谢 泠](https://github.com/Jack12xl)
* [张铭睿](https://github.com/erizmr)
