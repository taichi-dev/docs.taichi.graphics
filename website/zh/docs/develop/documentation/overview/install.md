# 安装 Taichi

通过 `pip` 可以很容易安装 Taichi：

```bash
python3 -m pip install taichi
```

::: note

Currently, Taichi only supports Python 3.6/3.7/3.8 (64-bit). :::
:::

- 对于Ubuntu 19.04+，请执行 `sudo apt install libtinfo5` 安装依赖项。
- 对于Arch Linux，请执行 `yaourt -S ncurses5-compat-libs` 安装依赖项。
- On Windows, please install [Microsoft Visual C++ Redistributable](https://aka.ms/vs/16/release/vc_redist.x64.exe) if you haven\'t.

## 故障排除

### Windows 相关问题

- If Taichi crashes and reports `ImportError` on Windows: Please consider installing [Microsoft Visual C++ Redistributable](https://aka.ms/vs/16/release/vc_redist.x64.exe).

### Python 相关问题

- If `pip` complains that it could not find a satisfying package, i.e.,

  ```
  ERROR: Could not find a version that satisfies the requirement taichi (from versions: none)
  ERROR: No matching distribution found for taichi
  ```

  - 确保你使用的 Python 版本是 3.6/3.7/3.8：

    ```bash
    python3 -c "print(__import__('sys').version[:3])"
    # 3.6, 3.7 或 3.8
    ```

  - 确保你安装的 Python 可执行文件是 64-bit：

    ```bash
    python3 -c "print(__import__('platform').architecture()[0])"
    # 64bit
    ```

### CUDA 相关问题

- 如果 Taichi 报告以下崩溃信息：

  ```
  [Taichi] mode=release
  [Taichi] version 0.6.0, supported archs: [cpu, cuda, opengl], commit 14094f25, python 3.8.2
  [W 05/14/20 10:46:49.549] [cuda_driver.h:call_with_warning@60] CUDA Error CUDA_ERROR_INVALID_DEVICE: invalid device ordinal while calling mem_advise (cuMemAdvise)
  [E 05/14/20 10:46:49.911] Received signal 7 (Bus error)
  ```

  This might be due to the fact that your NVIDIA GPU is pre-Pascal and has limited support for [Unified Memory](https://www.nextplatform.com/2019/01/24/unified-memory-the-final-piece-of-the-gpu-programming-puzzle/).

  - **Possible solution**: add `export TI_USE_UNIFIED_MEMORY=0` to your `~/.bashrc`. This disables unified memory usage in CUDA backend. 该操作将禁用CUDA后端使用统一内存。

- 如果你遇到了其他 CUDA 相关问题，不要气馁：

  - **可能的解决方案**：尝试添加`export TI_ENABLE_CUDA=0`到你的`~/.bashrc`文件中。 **Possible solution**: add `export TI_ENABLE_CUDA=0` to your `~/.bashrc`. This disables the CUDA backend completely and Taichi will fall back on other GPU backends such as OpenGL.

### OpenGL 相关问题

- If Taichi crashes with a stack backtrace containing a line of `glfwCreateWindow` (see [\#958](https://github.com/taichi-dev/taichi/issues/958)):

  ```{9-11}
  [Taichi] mode=release
  [E 05/12/20 18.25:00.129] Received signal 11 (Segmentation Fault)
  ***********************************
  * Taichi Compiler Stack Traceback *
  ***********************************

  ... (省略多行)

  /lib/python3.8/site-packages/taichi/core/../lib/taichi_core.so: _glfwPlatformCreateWindow
  /lib/python3.8/site-packages/taichi/core/../lib/taichi_core.so: glfwCreateWindow
  /lib/python3.8/site-packages/taichi/core/../lib/taichi_core.so: taichi::lang::opengl::initialize_opengl(bool)

  ... (省略多行)
  ```

  This is likely because you are running Taichi on a (virtual) machine with an old OpenGL API. Taichi requires OpenGL 4.3+ to work. Taichi 需要 OpenGL 4.3+ 才能正常工作。

  - **Possible solution**: add `export TI_ENABLE_OPENGL=0` to your `~/.bashrc` even if you initialize Taichi with other backends than OpenGL. This disables the OpenGL backend detection to avoid incompatibilities. 该操作将禁用OpenGL后端检测，以避免OpenGL版本不兼容的问题。

### Linux 相关问题

- 如果 Taichi 崩溃并报告错误`libtinfo.so.5 not found`：

  - 对于 Ubuntu ，请执行 `sudo apt install libtinfo-dev` 安装依赖项。

  - On Arch Linux, first edit `/etc/pacman.conf`, and append these lines:

    ```
    [archlinuxcn]
    Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
    ```

    随后执行`sudo pacman -Syy ncurses5-compat-libs`。

- If Taichi crashes and reports ``/usr/lib/libstdc++.so.6: version `CXXABI_1.3.11' not found``:

  You might be using Ubuntu 16.04, please try the solution in [this thread](https://github.com/tensorflow/serving/issues/819#issuecomment-377776784):

  ```bash
  sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
  sudo apt-get update
  sudo apt-get install libstdc++6
  ```

### 其他问题

- If none of those above address your problem, please report this by [opening an issue](https://github.com/taichi-dev/taichi/issues/new?labels=potential+bug&template=bug_report.md) on GitHub. This would help us improve user experiences and compatibility, many thanks! 这将帮助我们后续提高用户体验和兼容性，非常感谢！
