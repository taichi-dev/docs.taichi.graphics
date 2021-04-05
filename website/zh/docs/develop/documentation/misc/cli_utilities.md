# 命令行工具使用指南

Taichi 成功安装之后后会在系统中增加一个 CLI（命令行窗口）工具，这个工具可以帮助你快速地执行多个日常任务。 如要调用 CLI，请在 shell 中运行 `ti` 或者 `python3 -m taichi`。

## 示例

Taichi 提供了一组捆绑示例。 你可以在命令行窗口中运行：`ti example -h` 来打印帮助信息并获取可用示例名称的列表。

例如，要运行基础的 `fractal（分形）`示例，尝试在shell中运行 `ti example fractal`。 （运行 `ti example fractal.py` 也同样奏效）

你可以通过运行 `ti example -p fractal` 或 `ti example -P fractal` 来打印带语法高亮的示例源代码。

你还可以通过运行 `ti example -s fractal` 来将示例保存到当前的工作目录中。

## 更新日志

有时我们需要查看当前版本的 Taichi 的更新日志。 你可以通过在 Shell 中运行 `ti changelog` 来查看更新日志。

## REPL Shell

有时为了快速测试和验证，我们需要打开一个预加载了 `import taichi as ti` 的 Python shell。 你可以通过在 shell 中运行 `ti repl` 来做到这一点。

## 系统信息

当你试图报告一个潜在的 bug 时，请考虑运行 `ti diagnose` 并提供此命令的输出来作为问题报告的一个附件。 这会帮助维护者了解问题的来龙去脉和你所使用的环境的系统信息，这些信息能够使得 bug 修复过程更高效，进而更好地解决你的问题。

::: warning
**在发布你的系统信息之前，请再三确认你没有上传敏感的、或者关于你自己的信息。**
:::

## 将 PNG 图片转换为视频

有时候，为了更好地向别人呈现结果，我们需要将一系列的 `png` 文件转换为单个视频。

例如，假设按照[导出你的结果](./export_results.md)章节的内容将 `000000.png`，`000001.png`... 等一系列文件生成到了**你的当前工作目录中**。

那么你可以通过运行 `ti video` 来创建一个包含了所有图片文件作为帧（按文件名排序）的名为 `video.mp4` 的视频文件。

使用 `ti video -f40` 来创建一个 40 FPS 的视频。

## 将视频转换为 GIF

有时为了将结果上传到论坛中，我们需要一些格式为 `gif` 的图片文件。

你可以运行 `ti gif -i video.mp4` 来做到这一点，这里 `video.mp4` 是 `mp4` 视频文件（通过前一部分关于生成视频的指令生成）。

使用 `ti gif -i video.mp4 -f40` 来创建一个 40 FPS 的 GIF 文件。
