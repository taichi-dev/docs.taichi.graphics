# 导出结果

Taichi 提供的函数可以帮助你以**图像或视频的形式导出可视化结果**。 本节文档将对它们的使用方法逐步演示。

## 导出图像

- 这里有两种方法可以将程序的可视化结果导出为图像。
- 第一种也是较简单的方式是使用`ti.GUI`。
- 第二种方式是调用一系列相关 Taichi 函数，比如`ti.imwrite`。

### 通过`ti.GUI.show`导出图像

- `ti.GUI.show(文件名)`不仅可以在屏幕上显示 GUI 画布，还可以将 GUI 中的图像保存到指定的`文件名`中。
- 请注意，图像的格式完全由`文件名`中的后缀所决定。
- Taichi 现在支持将图片保存为`png`，`jpg`，和 `bmp`格式。
- 我们建议使用`png`格式。 例如：

```python {23}
import taichi as ti
import os

ti.init()

pixels = ti.field(ti.u8, shape=(512, 512, 3))

@ti.kernel
def paint():
    for i, j, k in pixels:
        pixels[i, j, k] = ti.random() * 255

iterations = 1000
gui = ti.GUI("Random pixels", res=512)

# mainloop
for i in range(iterations):
    paint()
    gui.set_image(pixels)

    filename = f'frame_{i:05d}.png'   # 创建带有 png 后缀的文件名
    print(f'Frame {i} is recorded in {filename}')
    gui.show(filename)  # 导出并显示在 GUI 中
```

- 运行上述代码后，你将在当前文件夹中获得一系列 png 图像。
- 若要将这些图像转换成单个的`mp4`视频或`gif`文件，请参阅[将PNG图片转换为视频](./cli_utilities.md#converting-pngs-to-video)章节。

### 通过`ti.imwrite`导出图像

如果不想通过调用 `ti.GUI.show(文件名)` 保存图像的话，可以使用`ti.imwrite(文件名)`。 例如：

```python {14}
import taichi as ti

ti.init()

pixels = ti.field(ti.u8, shape=(512, 512, 3))

@ti.kernel
def set_pixels():
    for i, j, k in pixels:
        pixels[i, j, k] = ti.random() * 255

set_pixels()
filename = f'imwrite_export.png'
ti.imwrite(pixels.to_numpy(), filename)
print(f'The image has been saved to {filename}')
```

- `ti.imwrite`可以导出Taichi场（`ti.Matrix.field`，`ti.Vector.field`, `ti.field`）和numpy数组`np.ndarray`。
- 与之前提到的`ti.GUI.show(文件名)`一样，图像格式（`png`, `jpg` and `bmp`）也由`ti.imwrite(文件名)`中的`文件名`所决定。
- 同时，得到的图像类型（灰度、RGB 或 RGBA）由**输入场的通道数**决定，也即，第三维的长度（`field.shape[2]`）。
- 换言之，形状是`(w, h)` 或 `(w, h, 1)`的场会被导出成灰度图。
- 如果你想导出 `RGB` 或 `RGBA` 的图像，输入的场形状应该分别是`(w, h, 3)`或`(w, h, 4)`。

::: note
Taichi 中所有的场都有自己的数据类型，比如`ti.u8` 和 `ti.f32`。 不同的数据类型会导致`ti.imwrite`产生不同的行为和输出。 请参阅[GUI 系统](./gui.md)来了解更多细节。
:::

- 除了 `ti.imwrite` 之外，Taichi 还提供了其他读取和显示图像的辅助函数。 在[GUI 系统](./gui.md)中也会有它们的示例。

## 导出视频

::: note
Taichi 的视频导出工具依赖于`ffmpeg`。 如果你的机器上还没有安装`ffmpeg`，请按照本节末尾的`ffmpeg`安装说明进行操作。
:::

- `ti.VideoManager`可以帮助你导出`mp4` 或`gif` 格式的结果。 例如，

```python {13,24}
import taichi as ti

ti.init()

pixels = ti.field(ti.u8, shape=(512, 512, 3))

@ti.kernel
def paint():
    for i, j, k in pixels:
        pixels[i, j, k] = ti.random() * 255

result_dir = "./results"
video_manager = ti.VideoManager(output_dir=result_dir, framerate=24, automatic_build=False)

for i in range(50):
    paint()

    pixels_img = pixels.to_numpy()
    video_manager.write_frame(pixels_img)
    print(f'\rFrame {i+1}/50 is recorded', end='')

print()
print('Exporting .mp4 and .gif videos...')
video_manager.make_video(gif=True, mp4=True)
print(f'MP4 video is saved to {video_manager.get_output_filename(".mp4")}')
print(f'GIF video is saved to {video_manager.get_output_filename(".gif")}')
```

运行上述代码后，你将在 `./results/` 文件夹中找到输出的视频。

## 正在安装 ffmpeg

### 在 Windows 上安装 ffmpeg

- 从[ffmpeg](https://ffmpeg.org/download.html)上下载`ffmpeg`存档文件（具体名称为`ffmpeg-2020xxx.zip`）。
- 解压存档到指定文件夹中，比如，`D:/YOUR_FFMPEG_FOLDER`。
- **关键步骤**：添加路径`D:/YOUR_FFMPEG_FOLDER/bin`到环境变量`PATH`中；
- 打开 Windows 下的`cmd` 或 `PowerShell`，然后输入下面这行命令来测试你的安装是否成功。 如果`ffmpeg`已经正确安装完毕，那么它的版本信息就会被打印出来。

```bash
ffmpeg -version
```

### 在 Linux 上安装`ffmpeg`

- 大多数 Linux 发行版都会原生自带`ffmpeg`，所以如果你的机器上已经有了`ffmpeg`命令，那么这部分可以直接跳过。
- 在 Ubuntu 上安装`ffmpeg`

```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

- 在 CentOS 和 RHEL 上安装`ffmpeg`

```bash
sudo yum install ffmpeg ffmpeg-devel
```

- 在 Arch Linux 上安装`ffmpeg`

```bash
pacman -S ffmpeg
```

- 使用下面这行命令测试你的安装是否成功

```bash
ffmpeg -h
```

### 在 OS X 上安装`ffmpeg`

- 在OS X上可以使用`homebrew`来安装`ffmpeg`

```bash
brew install ffmpeg
```

## 导出 PLY 文件

- `ti.PLYwriter`可以帮助你将结果导出为`ply`格式。 下面是导出一个顶点随机着色的立方体动画中10帧画面的短例，

```python
import taichi as ti
import numpy as np

ti.init(arch=ti.cpu)

num_vertices = 1000
pos = ti.Vector.field(3, dtype=ti.f32, shape=(10, 10, 10))
rgba = ti.Vector.field(4, dtype=ti.f32, shape=(10, 10, 10))


@ti.kernel
def place_pos():
    for i, j, k in pos:
        pos[i, j, k] = 0.1 * ti.Vector([i, j, k])


@ti.kernel
def move_particles():
    for i, j, k in pos:
        pos[i, j, k] += ti.Vector([0.1, 0.1, 0.1])


@ti.kernel
def fill_rgba():
    for i, j, k in rgba:
        rgba[i, j, k] = ti.Vector(
            [ti.random(), ti.random(), ti.random(), ti.random()])


place_pos()
series_prefix = "example.ply"
for frame in range(10):
    move_particles()
    fill_rgba()
    # 当前只支持通过传递单个 np.array 来添加通道
    # 所以需要转换为 np.ndarray 并且 reshape
    # 记住使用一个临时变量来存储，这样你就不必再转换回来
    np_pos = np.reshape(pos.to_numpy(), (num_vertices, 3))
    np_rgba = np.reshape(rgba.to_numpy(), (num_vertices, 4))
    # create a PLYWriter
    writer = ti.PLYWriter(num_vertices=num_vertices)
    writer.add_vertex_pos(np_pos[:, 0], np_pos[:, 1], np_pos[:, 2])
    writer.add_vertex_rgba(
        np_rgba[:, 0], np_rgba[:, 1], np_rgba[:, 2], np_rgba[:, 3])
    writer.export_frame_ascii(frame, series_prefix)
```

运行上述代码后，你将在当前工作目录中找到一系列输出的`ply`文件。 接下来，我们将`ti.PLYWriter`的使用方式分解为4个步骤，并相应的展示一些示例。

- 设置 `ti.PLYWriter`

```python
# num_vertices 必须是正整数
# num_faces 是可选的，默认为0
# face_type 可以是 "tri" 或 "quad", 默认为 "tri"

# 我们在之前的例子中，创建了一个带有1000个顶点和0个三角形面片的写入器(writer)
num_vertices = 1000
writer = ti.PLYWriter(num_vertices=num_vertices)

# 在下面的例子中，我们创建了一个带有20个顶点和5个四边形面片的写入器
writer2 = ti.PLYWriter(num_vertices=20, num_faces=5, face_type="quad")
```

- 添加必需的通道信息

```python
# 一个由四边形面片组成的二维网格
#     y
#     |
# z---/
#    x
#         19---15---11---07---03
#         |    |    |    |    |
#         18---14---10---06---02
#         |    |    |    |    |
#         17---13---19---05---01
#         |    |    |    |    |
#         16---12---08---04---00

writer = ti.PLYWriter(num_vertices=20, num_faces=12, face_type="quad")

# 对于顶点来说，唯一必需的通道信息就是位置,
# 可以通过向下列函数中传递三个 np.array x,y,z 来添加

x = np.zeros(20)
y = np.array(list(np.arange(0, 4))*5)
z = np.repeat(np.arange(5), 4)
writer.add_vertex_pos(x, y, z)

# 对于面来说（如果有的话），唯一必需的通道信息是每个面所包含的顶点索引列表。
indices = np.array([0, 1, 5, 4]*12)+np.repeat(
    np.array(list(np.arange(0, 3))*4)+4*np.repeat(np.arange(4), 3), 4)
writer.add_faces(indices)
```

- 添加可选的通道信息

```python
# 添加自定义顶点通道信息，输入应该包括一个键(key)，支持的数据类型，np.array格式的数据
vdata = np.random.rand(20)
writer.add_vertex_channel("vdata1", "double", vdata)

# 添加自定义面片通道信息
foo_data = np.zeros(12)
writer.add_face_channel("foo_key", "foo_data_type", foo_data)
# 错误! 因为"foo_data_type"并不是支持的数据类型。 支持的数据类型有如下
# ['char', 'uchar', 'short', 'ushort', 'int', 'uint', 'float', 'double']

# PLYwriter 已经为常用通道定义了几个有用的辅助函数
# 添加顶点的颜色, alpha通道, 及 rgba
# 使用 float/double r g b alpha 来表示颜色值, 范围应该在0到1之间
r = np.random.rand(20)
g = np.random.rand(20)
b = np.random.rand(20)
alpha = np.random.rand(20)
writer.add_vertex_color(r, g, b)
writer.add_vertex_alpha(alpha)
# 相当于
# add_vertex_rgba(r, g, b, alpha)

# 顶点法向
writer.add_vertex_normal(np.ones(20), np.zeros(20), np.zeros(20))

# 顶点索引和块(组内 id)
writer.add_vertex_id()
writer.add_vertex_piece(np.ones(20))

# 添加面片索引和块 (组内 id)
# 在 writer 中索引已有面片并将其通道信息添加到面片通道信息中
writer.add_face_id()
# 将所有的面片都放到第一组
writer.add_face_piece(np.ones(12))
```

- 导出文件

```python
series_prefix = "example.ply"
series_prefix_ascii = "example_ascii.ply"
# 导出一个简单的文件
# 使用 ascii 编码这样你可以对内容进行概览
writer.export_ascii(series_prefix_ascii)

# 或者，使用二进制编码以获得更好的性能
# writer.export(series_prefix)

# 导出文件序列，即10帧
for frame in range(10):
    # 将每一帧写入你的当前运行的文件夹中( 即， "example_000000.ply")
    writer.export_frame_ascii(frame, series_prefix_ascii)
    # 或者相应的, 使用二进制编码这样写
    # writer.export_frame(frame, series_prefix)

    # 更新 位置/颜色
    x = x + 0.1*np.random.rand(20)
    y = y + 0.1*np.random.rand(20)
    z = z + 0.1*np.random.rand(20)
    r = np.random.rand(20)
    g = np.random.rand(20)
    b = np.random.rand(20)
    alpha = np.random.rand(20)
    #重新填充
    writer = ti.PLYWriter(num_vertices=20, num_faces=12, face_type="quad")
    writer.add_vertex_pos(x, y, z)
    writer.add_faces(indices)
    writer.add_vertex_channel("vdata1", "double", vdata)
    writer.add_vertex_color(r, g, b)
    writer.add_vertex_alpha(alpha)
    writer.add_vertex_normal(np.ones(20), np.zeros(20), np.zeros(20))
    writer.add_vertex_id()
    writer.add_vertex_piece(np.ones(20))
    writer.add_face_id()
    writer.add_face_piece(np.ones(12))
```

### 将 `ply` 文件导出到 Houdini 和 Blender

Houdini 支持导入一组共享相同前缀/后缀的`ply`文件。 我们的`export_frame`就可以为你满足这种需求。

在Houdini 中，点击 `File->Import->Geometry`并导航至包含你的框架输出的文件夹中，这些输出结果应该被梳理成一个单一的条目，比如`example_$F6.ply (0-9)`。 双击该条目以完成导入过程。

Blender 需要一个名为[Stop-motion-OBJ](https://github.com/neverhood311/Stop-motion-OBJ)的插件来加载结果序列。 这里有一个[非常详尽的教程视频](https://github.com/neverhood311/Stop-motion-OBJ/wiki)，是由其作者提供的关于如何安装、授权和使用这个插件的演示。 如果你在使用最新版本的Blender(2.80+)，请下载并安装[最新版本](https://github.com/neverhood311/Stop-motion-OBJ/releases/latest)的Stop-motion-OBJ。 对于Blender 2.79或更早的版本，使用版本为`v1.1.1`的插件。
