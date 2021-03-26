# 安装 Taichi

通过 `pip` 可以很容易安装 Taichi：

```bash
python3 -m pip install taichi
```

::: note

目前，Taichi 支持的 Python 版本有 3.6/3.7/3.8 (64-bit)。
:::

- 对于Ubuntu 19.04+，请执行 `sudo apt install libtinfo5` 安装依赖项。
- 对于Arch Linux，请执行 `yaourt -S ncurses5-compat-libs` 安装依赖项。
- 对于 Windows，请预先安装运行组件库 [Microsoft Visual C++ Redistributable](https://aka.ms/vs/16/release/vc_redist.x64.exe)。

## 故障排除

### Windows 相关问题

- 如果在 Windows 下 Taichi 崩溃并报告`ImportError`：请考虑安装运行组件库[Microsoft Visual C++ Redistributable](https://aka.ms/vs/16/release/vc_redist.x64.exe)。

### Python 相关问题

- 如果 `pip` 报错找不到合适的包，即,

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

  这可能是因为你使用的 NVIDIA GPU 低于 Pascal 架构，这对 [统一内存(Unified Memory)](https://www.nextplatform.com/2019/01/24/unified-memory-the-final-piece-of-the-gpu-programming-puzzle/)的支持会有所限制。

  - **可能的解决方案**：尝试添加`export TI_USE_UNIFIED_MEMORY=0`到你的`~/.bashrc`文件中。 该操作将禁用CUDA后端使用统一内存。

- 如果你遇到了其他 CUDA 相关问题，不要气馁：

  - **可能的解决方案**：尝试添加`export TI_ENABLE_CUDA=0`到你的`~/.bashrc`文件中。 该操作将完全禁用CUDA后端，这样Taichi会转而依赖于其他GPU后端，如OpenGL。

### OpenGL 相关问题

- 针对 Taichi 打印出的调用栈回溯 (stack backtrace) 中包含`glfwCreateWindow`等信息的情况 (更详细的问题描述请对照[#958](https://github.com/taichi-dev/taichi/issues/958))：

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

  这很可能是因为你运行 Taichi 的虚拟机上的 OpenGL 版本过低。 Taichi 需要 OpenGL 4.3+ 才能正常工作。

  - **可能的解决方案**：尝试添加`export TI_ENABLE_OPENGL=0`到你的`~/.bashrc`文件中，即使你使用了非OpenGL后端初始化Taichi。 该操作将禁用OpenGL后端检测，以避免OpenGL版本不兼容的问题。

### Linux 相关问题

- 如果 Taichi 崩溃并报告错误`libtinfo.so.5 not found`：

  - 对于 Ubuntu ，请执行 `sudo apt install libtinfo-dev` 安装依赖项。

  - 对于 Arch Linux ，请首先编辑 `/etc/pacman.conf`，添加以下代码：

    ```
    [archlinuxcn]
    Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
    ```

    随后执行`sudo pacman -Syy ncurses5-compat-libs`。

- 如果 Taichi 崩溃并报告 ``/usr/lib/libstdc++.so.6: version `CXXABI_1.3.11' not found``：

  你可能正在使用 Ubuntu 16.04 ，请根据[这个帖子](https://github.com/tensorflow/serving/issues/819#issuecomment-377776784)中的解决方案尝试解决：

  ```bash
  sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
  sudo apt-get update
  sudo apt-get install libstdc++6
  ```

### 其他问题

- 如果以上方案都没能解决你的问题，请在 GitHub 上[建立一个 issue](https://github.com/taichi-dev/taichi/issues/new?labels=potential+bug&template=bug_report.md)进行报告。 这将帮助我们后续提高用户体验和兼容性，非常感谢！
