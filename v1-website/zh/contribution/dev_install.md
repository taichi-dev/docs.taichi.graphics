# 开发者安装指南

请注意，本章节是为 Taichi 语言编译器的开发人员所准备的。 终端用户应该使用 pip 进行安装，而不是从源代码开始构建。 要在构建时加入对 NVIDIA GPU 的支持，CUDA 10.0+ 是必需的。 本安装指南适用于 Ubuntu 16.04+ 和 OS X 10.14+。 关于在 Windows 下进行构建的详细说明，请查看 [appveyor.yml](https://github.com/taichi-dev/taichi/blob/master/appveyor.yml)，Windows 下的教程大致与 Ubtuntu 和 OS X 的教程相同。 我们使用 MSBUILD.exe 来构建生成的项目。 需要注意的是，Windows 拥有多个 MSBUILD.exe 实例，它们附带在各种版本的 MSVS 上。 请确保在 MSVS 目录中添加 MSBUILD.exe 的路径，并使其具有更高的优先级（例如，比附带的 .NET 优先级更高）。

请注意 `clang` 是在 Linux/OS X 下唯一支持的可以编译 Taichi 编译器的编译器。 相应的在 Windows 下只有 MSVC 是支持的编译器。

## 安装依赖项

- 请确认你使用的 Python 版本为 3.6/3.7/3.8

- 安装 Python 依赖：

  ```bash
  python3 -m pip install --user setuptools astor pybind11 pylint sourceinspect
  python3 -m pip install --user pytest pytest-rerunfailures pytest-xdist yapf
  python3 -m pip install --user numpy GitPython coverage colorama autograd
  ```

- 确保你的 `clang` 版本号 >= 7：

  - 在Windows 下: 下载 [clang-10](https://github.com/taichi-dev/taichi_assets/releases/download/llvm10/clang-10.0.0-win.zip)： 确保将包含 `clang.exe` 的 `bin` 文件夹路径添加到 `PATH` 环境变量中。
  - 在OS X 下：不需要额外再准备什么（安装完 Xcode 命令行工具后 clang 就已经默认安装完毕了）。
  - 在Ubuntu 下：执行 `sudo apt install libtinfo-dev clang-8`。
  - 在Arch Linux 下：执行 `sudo pacman -S clang`。 （这会安装 `clang-10` ）。
  - 在其他 Linux 发行版下，请从[此网站](pkgs.org)搜寻安装版本号 >= 7 的 clang。

- 确保你已经安装了 LLVM 10.0.0。 注意，Taichi 使用了 **定制的 LLVM**，所以从 LLVM 官网或其他来源下载的预构建可执行文件可能不会正常工作。 在此我们提供了 Taichi 的定制版 LLVM 可执行文件，它是否能正常运行取决于你的系统环境：

  - [LLVM 10.0.0 for Linux](https://github.com/taichi-dev/taichi_assets/releases/download/llvm10/taichi-llvm-10.0.0-linux.zip)
  - [LLVM 10.0.0 for Windows MSVC 2019](https://github.com/taichi-dev/taichi_assets/releases/download/llvm10/taichi-llvm-10.0.0-msvc2019.zip)
  - [LLVM 10.0.0 for OS X](https://github.com/taichi-dev/taichi_assets/releases/download/llvm10/taichi-llvm-10.0.0-macos.zip)

::: note
在 Windows 下, 如果你使用的是 Taichi 版预构建的 LLVM，请将 `$LLVM_FOLDER/bin` 添加到 `PATH`。 随后，当你使用 `CMake` 构建 Taichi 时，将 `LLVM_DIR` 设置为 `$LLVM_FOLDER/lib/cmake/llvm`。
:::

- 如果下载的 LLVM 不能正常工作，请从源代码开始构建：

  - 在 Linux 或 OS X 下：

    ```bash
    wget https://github.com/llvm/llvm-project/releases/download/llvmorg-10.0.0/llvm-10.0.0.src.tar.xz
    tar xvJf llvm-10.0.0.src.tar.xz
    cd llvm-10.0.0.src
    mkdir build
    cd build
    cmake .. -DLLVM_ENABLE_RTTI:BOOL=ON -DBUILD_SHARED_LIBS:BOOL=OFF -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD="X86;NVPTX" -DLLVM_ENABLE_ASSERTIONS=ON
    # 如果你想在 NVIDIA Jetson TX2 上进行构建, 请使用 -DLLVM_TARGETS_TO_BUILD="ARM;NVPTX"

    make -j 8
    sudo make install

    # 检查你安装的 LLVM 版本
    llvm-config --version  # You should get 10.0.0
    ```

  - 在 Windows 下：

    ```bash
    # LLVM 10.0.0 + MSVC 2019
    cmake .. -G"Visual Studio 16 2019" -A x64 -DLLVM_ENABLE_RTTI:BOOL=ON -DBUILD_SHARED_LIBS:BOOL=OFF -DCMAKE_BUILD_TYPE=Release -DLLVM_TARGETS_TO_BUILD="X86;NVPTX" -DLLVM_ENABLE_ASSERTIONS=ON -Thost=x64 -DLLVM_BUILD_TESTS:BOOL=OFF -DCMAKE_INSTALL_PREFIX=installed
    ```

    - 然后打开 `LLVM.sln` 并使用 Visual Studio 2017+ 进行构建。
    - 请确保你正在使用的是 `Release` 模式。 随后构建 `INSTALL` 项目（在Solution Explorer窗口的 `CMakePredefinedTargets` 目录下）。
    - 如果你使用的是 MSVC 2019，**确保你通过 C++17 **构建 `INSTALL` 项目。
    - 在完成构建之后，你可以在 `build/installed` 中找到 LLVM 可执行文件和头文件。

    请将 `build/installed/bin` 添加至 `PATH`。 随后，当你使用 `CMake` 构建Taichi 时，将 `LLVM_DIR` 设置到 `build/installed/lib/cmake/llvm`。

## 安装并配置 CUDA（可选）

如果你没有安装 CUDA，请到[英伟达官网](https://developer.nvidia.com/cuda-downloads)下载安装器。

- 请运行 `nvcc --version` 或 `cat /usr/local/cuda/version.txt` 来检查 CUDA 是否已安装成功。
- 在 **Ubuntu** 下我们推荐选择 `deb (local)` 来作为 **安装器类型（Installer Type）**。
- 在 **Arch Linux** 下，你可以轻松地通过 `pacman -S cuda` 来安装 CUDA 并跳过手动下载安装器的环节。

## 开发者的 Taichi 配置

- 为 Taichi 设置环境变：

  - Linux / OS X 下, 请将以下脚本添加到你的配置文件中（如 `~/.bashrc`，`~/.zshrc` 等，本文档中的其他示例和这里一样，请自动与你的配置文件相对应)：

    ```bash
    export TAICHI_REPO_DIR=/path/to/taichi  # 指向你的 taichi 仓库的路径
    export PYTHONPATH=$TAICHI_REPO_DIR/python:$PYTHONPATH
    export PATH=$TAICHI_REPO_DIR/bin:$PATH
    # export CXX=/path/to/clang  # 如果在下一步遇到关于编译器的问题，取消这个注释。
    # export PATH=/opt/llvm/bin:$PATH  # 如果你的 llvm 或 clang 安装到了 /opt 中，取消这个注释
    ```

    然后执行 `source ~/.bashrc` 来重载 shell 的配置。

::: note
如果你在使用 fish，请使用 `set -x NAME VALUES`，否则它不会被子进程所加载。
:::

  - 在 Windows 下，请通过访问你的系统设置来添加以下这些变量：

    1.  添加 `TAICHI_REPO_DIR`，其值指向你的 Taichi 仓库存储路径，以便让 Taichi 知道你是一名开发者。
    2.  添加或附加 `%TAICHI_REPO_DIR%/python` 到 `PYTHONPATH` ，以便 Python 可以从本地仓库导入 Taichi。
    3.  添加或附加 `%TAICHI_REPO_DIR%/bin` 到 `PATH`，这样你就可以使用 `ti` 命令了
    4.  添加或附加之前小节安装的 LLVM 可执行文件路径到 `PATH`。

- 请**递归地**克隆 Taichi 代码库，然后构建：

  ```bash
  git clone https://github.com/taichi-dev/taichi --depth=1 --branch=master
  cd taichi
  git submodule update --init --recursive --depth=1
  mkdir build
  cd build
  cmake ..
  # 在 Linux / OS X 下, 如果你没有将 clang 设置为默认编译器
  # 使用下面这行命令：
  #   cmake .. -DCMAKE_CXX_COMPILER=clang
  #
  # 或者，如果你希望将 clang 设置为默认编译器
  # 在Unix下，在决定对 C 和 C++ 使用哪个编译器时，CMake 会考虑到环境变量 $CC 和 $CXX
  make -j 8
  ```

- 查看 `examples` 下提供的可运行示例程序。 例如使用 `python3 examples/mpm128.py` 这种方式运行它们。

- 执行 `python3 -m taichi test` 来运行所有的测试。 运行所有测试用例可能会耗费长达 5 分钟的时间。

## 开发者安装中的故障排除

- 如果编译时 `make` 失败并且报告 `fatal error: 'spdlog/XXX.h' file not found`，请尝试执行 `git submodule update --init --recursive --depth=1`。

- 如果导入 Taichi 时引发错误

  ```
  FileNotFoundError: [Errno 2] No such file or directory: '/root/taichi/python/taichi/core/../lib/taichi_core.so' -> '/root/taichi/python/taichi/core/../lib/libtaichi_core.so'``
  ```

  请尝试将 `TAICHI_REPO_DIR` 添加到环境变量中, 详见 `dev_env_settings`。

- 如果构建过程是顺利的，但运行任何 Taichi 代码时却有报错信息，如

  ```
  Bitcode file (/tmp/taichi-tero94pl/runtime//runtime_x64.bc) not found
  ```

  请再检查一遍 `clang` 是否在你的 `PATH`中：

  ```bash
  clang --version
  # 版本号应该 >= 7
  ```

  还有我们的 **Taichi 定制版配置** `llvm-as`：

  ```bash
  llvm-as --version
  # version should be >= 8
  which llvm-as
  # 应该输出 /usr/local/bin/llvm-as or /opt/XXX/bin/llvm-as，这是我们的定制版 LLVM 所在位置
  ```

  如果不是, 请按照上面的`开发者安装`教程安装 `clang` 并 **从源码开始构建 LLVM**, 然后将它们的路径添加到环境变量 `PATH` 中。

- 如果你遇到了其他问题，请在 Github 上随时提出 [issue](https://github.com/taichi-dev/taichi/issues/new?labels=potential+bug&template=bug_report.md) 进行报告。 我们非常愿意提供帮助！

- 请参阅[故障排除](../documentation/overview/install.md#troubleshooting)章节以了解那些可能与终端用户安装时遇到的相同问题。

## Docker

对于那些更喜欢使用 Docker 的开发者，我们也提供了一个 Dockerfile，它可以帮助开发者建立起基于 Ubuntu Docker 镜像的 Taichi 开发环境（支持CUDA）。

::: note
如要遵照本节中的说明，请确保你已经安装并正确设置了 [Docker DeskTop (或在 Linux 下的 Engine)](https://www.docker.com/products/docker-desktop)。
:::

### 构建 Docker 镜像

在 Taichi Git 仓库的根目录下，执行 `docker build -t taichi:latest .` 来构建标记为 latest 的基于本地主分支的 docker 镜像。 由于这是从源文件构建镜像，如果你没有缓存的 Docker 镜像层，预计会有 40 分钟左右的构建时间。

::: note

为节省构建 Docker 镜像的时间，你可以随时访问我们的 [Docker Hub 仓库](https://hub.docker.com/r/taichidev/taichi)，并拉取你想要使用的预构建镜像版本。 目前，每个版本的构建都是在 taichi Github 版本发行时触发。

例如，要拉取版本 v0.6.17 构建的映像，请运行 `docker pull taichidev/taichi:v0.6.17`
:::

::: warning

Docker 容器的特性决定了一旦你退出容器，就不能保留对容器上文件系统的任何修改。 如果你想要使用 Docker 作为一个持久的开发 环境，我们推荐你 [挂载 Taichi 的本地 Github 代码仓库到 容器作为一个卷](https://docs.docker.com/storage/volumes/) 并设置你的 Python 路径到挂载的目录下。
:::

### 在 macOS 下使用 Docker 镜像（仅支持 cpu）

1.  确保已经提前安装好了 `XQuartz` 和 `socat`：

```bash
brew cask install xquartz
brew install socat
```

2.  暂时禁用 xhost 的访问控制: `xhost +`
3.  启动 Docker 容器 `docker run -it -e DISPLAY=$(ipconfig getifaddr en0):0 taichidev/taichi:v0.6.17`
4.  在容器内执行各种你想要的操作，例如，可以通过尝试 `ti test` 或 `ti example mpm88` 来运行测试或示例
5.  通过 `exit` 或 `ctrl+D` 退出容器
6.  [为确保你的 xhost 安全] 重新启用 xhost 的访问控制：`xhost -`

### 在 Ubuntu 下使用 Docker 镜像（包含 CUDA 支持）

1.  确保你的宿主机已经正确安装并配置了 CUDA。 通常这可以通过运行 `nvidia-smi` 进行验证
2.  确保 [NVIDIA Container Toolkit](https://github.com/NVIDIA/nvidia-docker) 正确安装完毕：

```bash
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list

sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo systemctl restart docker
```

3.  确保 `xorg` 已经安装完毕：`sudo apt-get install xorg`
4.  暂时禁用 xhost 的访问控制：`xhost +`
5.  通过 `sudo docker run -it --gpus all -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix taichidev/taichi:v0.6.17` 启动Docker容器
6.  在容器内执行各种你想要的操作，例如，可以通过尝试 `ti test` 或 `ti example mpm88` 来运行测试或示例
7.  通过 `exit` 或 `ctrl+D` 退出容器
8.  **[为确保你的 xhost 安全]** 重新启用 xhost 的访问控制：<0>xhost -</0>
