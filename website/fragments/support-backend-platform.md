Supported backends on different platforms:

| **platform** | **CPU** | **CUDA** | **OpenGL** | **Metal** | **C source** |
| :----------: | :-----: | :------: | :--------: | :-------: | :----------: |
|   Windows    |   OK    |    OK    |     OK     |    N/A    |     N/A      |
|    Linux     |   OK    |    OK    |     OK     |    N/A    |      OK      |
|    macOS     |   OK    |   N/A    |    N/A     |    OK     |     N/A      |

(OK: supported; N/A: not available)

With `arch=ti.gpu`, {{var.orgName}} will first try to run with CUDA. If CUDA is
not supported on your machine, {{var.orgName}} will fall back on Metal or OpenGL.
If no GPU backend (CUDA, Metal, or OpenGL) is supported, {{var.orgName}} will
fall back on CPUs.