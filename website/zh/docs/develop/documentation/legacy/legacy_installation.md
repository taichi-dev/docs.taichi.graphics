# 安装旧版Taichi库

::: note

这并不是安装Taichi编程语言的文档。 除非您 正在构建一个基于 [旧版Taichi 库](https://github.com/yuanming-hu/taichi/tree/legacy) 的旧版项目（例如 [taichi_mpm](https://github.com/yuanming-hu/taichi_mpm) 和 [spgrid_topo_opt](https://github.com/yuanming-hu/spgrid_topo_opt)）您应该始终使用 `pip` 来安装Taichi。

如果您正在参与开发Taichi编译器，并需要从源代码构建， 请查看 [贡献指南的开发者安装部分](../../contribution/dev_install.md)。
:::

支持的平台：

- Ubuntu (gcc 5+)
- Mac OS X (gcc 5+, clang 4.0+)
- Windows (Microsoft Visual Studio 2017)

请确保您有 `python 3.5+`。

## Ubuntu, Arch Linux, and Mac OS X

```bash
wget https://raw.githubusercontent.com/yuanming-hu/taichi/legacy/install.py
python3 install.py
```

::: note
注意， 如果 Python 抱怨有软件包丢失，只需重新运行`install.py` 就可以重新加载软件包。
:::

## Windows

下载并使用 Python3 执行 [此脚本](https://raw.githubusercontent.com/yuanming-hu/taichi/legacy/install.py)。

额外的环境变量（假定 Taichi 安装在`DIR/taichi`下）：

- 设定 `TAICHI_REPO_DIR` 为 `DIR/taichi` （例如`E:/repos/taichi`）。
- 添加 `%TAICHI_REPO_DIR%/python` 至 `PYTHONPATH`， `DIR/taichi/bin` （例如 `E:/repos/taichi/bin`） 至 `PATH`。
- 重启 cmd 或 PowerShell，您应该能够运行命令 `ti`。

## 使用双精度（64 位）浮点构建

```bash
export TC_USE_DOUBLE=1
ti build
```
