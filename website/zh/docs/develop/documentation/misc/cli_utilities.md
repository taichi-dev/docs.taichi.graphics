# 命令行工具使用指南

A successful installation of Taichi should add a CLI (Command-Line Interface) to your system, which is helpful to perform several rountine tasks quickly. To invoke the CLI, please run `ti` or `python3 -m taichi`. 如要调用 CLI，请在 shell 中运行`ti` 或者 `python3 -m taichi`。

## 示例

Taichi提供了一组捆绑示例。 Taichi provides a set of bundled examples. You could run `ti example -h` to print the help message and get a list of available example names.

For instance, to run the basic `fractal` example, try: `ti example fractal` from your shell. (`ti example fractal.py` should also work) （运行`ti example fractal.py`也同样奏效）

You may print the source code of example by running `ti example -p fractal`, or `ti example -P fractal` for print with syntax highlight.

You may also save the example to current work directory by running `ti example -s fractal`.

## 更新日志

Sometimes it's convenient to view the changelog of the current version of Taichi. To do so, you could run `ti changelog` in your shell. 你可以通过在Shell中运行`ti changelog`来查看更新日志。

## REPL Shell

Sometimes it's convenient to start a Python shell with `import taichi as ti` as a pre-loaded module for fast testing and confirmation. To do so from your shell, you could run `ti repl`. 你可以通过在shell中运行`ti repl`来做到这一点。

## 系统信息

When you try to report potential bugs in an issue, please consider running `ti diagnose` and offer its output as an attachment. This could help maintainers to learn more about the context and the system information of your environment to make the debugging process more efficient and solve your issue more easily. 这会帮助维护者了解问题的来龙去脉和你所使用的环境的系统信息，这些信息能够使得bug修复过程更高效，进而更好地解决你的问题。

::: warning
**在发布你的系统信息之前，请再三确认你没有上传敏感的、或者关于你自己的信息。**
:::

## 将PNG图片转换为视频

Sometimes it's convenient to convert a series of `png` files into a single video when showing your result to others.

For example, suppose you have `000000.png`, `000001.png`, \... generated according to [Export your results](./export_results.md) in the **current working directory**.

Then you could run `ti video` to create a file `video.mp4` containing all these images as frames (sorted by file name).

使用`ti video -f40`来创建一个40 FPS的视频。

## 将视频转换为GIF

有时为了将结果上传到论坛中，我们需要一些格式为`gif`的图片文件。

To do so, you could run `ti gif -i video.mp4`, where `video.mp4` is the `mp4` video (generated with instructions above).

使用`ti gif -i video.mp4 -f40`来创建一个40 FPS的GIF文件。
