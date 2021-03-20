# 命令行工具使用指南

Taichi 成功安装之后后会在系统中增加一个 CLI（命令行窗口）工具，这个工具可以帮助你快速地执行多个日常任务。 如要调用 CLI，请在 shell 中运行`ti` 或者 `python3 -m taichi`。

## 示例

Taichi提供了一组捆绑示例。 你可以在命令行窗口中运行：`ti example -h`来打印帮助信息并获取可用示例名称的列表。

例如，要运行基础的`fractal（分形）`示例，尝试在shell中运行`ti example fractal`。 （运行`ti example fractal.py`也同样奏效）

你可以通过运行`ti example -p fractal`或`ti example -P fractal`来打印带语法高亮的示例源代码。

你还可以通过运行`ti example -s fractal`来将示例保存到当前的工作目录中。

## 更新日志

Sometimes it's convenient to view the changelog of the current version of Taichi. To do so, you could run `ti changelog` in your shell.

## REPL Shell

Sometimes it's convenient to start a Python shell with `import taichi as ti` as a pre-loaded module for fast testing and confirmation. To do so from your shell, you could run `ti repl`.

## System information

When you try to report potential bugs in an issue, please consider running `ti diagnose` and offer its output as an attachment. This could help maintainers to learn more about the context and the system information of your environment to make the debugging process more efficient and solve your issue more easily.

::: warning
**Before posting it, please review and make sure there's no sensitive information about your data or yourself gets carried in.**
:::

## Converting PNGs to video

Sometimes it's convenient to convert a series of `png` files into a single video when showing your result to others.

For example, suppose you have `000000.png`, `000001.png`, \... generated according to [Export your results](./export_results.md) in the **current working directory**.

Then you could run `ti video` to create a file `video.mp4` containing all these images as frames (sorted by file name).

Use `ti video -f40` for creating a video with 40 FPS.

## Converting video to GIF

Sometimes we need `gif` images in order to post the result on forums.

To do so, you could run `ti gif -i video.mp4`, where `video.mp4` is the `mp4` video (generated with instructions above).

Use `ti gif -i video.mp4 -f40` for creating a GIF with 40 FPS.
