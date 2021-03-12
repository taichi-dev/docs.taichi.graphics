(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{532:function(e,s,t){"use strict";t.r(s);var a=t(20),i=Object(a.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"installation"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),t("p",[e._v("Taichi can be easily installed via "),t("code",[e._v("pip")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("python3 -m pip "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" taichi\n")])])]),t("div",{staticClass:"custom-block note"},[t("p",{staticClass:"custom-block-title"},[e._v("注解")]),e._v(" "),t("p",[e._v("Currently, Taichi only supports Python 3.6/3.7/3.8 (64-bit).")])]),e._v(" "),t("ul",[t("li",[e._v("On Ubuntu 19.04+, please execute "),t("code",[e._v("sudo apt install libtinfo5")]),e._v(".")]),e._v(" "),t("li",[e._v("On Arch Linux, please execute "),t("code",[e._v("yaourt -S ncurses5-compat-libs")]),e._v(".")]),e._v(" "),t("li",[e._v("On Windows, please install "),t("a",{attrs:{href:"https://aka.ms/vs/16/release/vc_redist.x64.exe",target:"_blank",rel:"noopener noreferrer"}},[e._v("Microsoft Visual C++ Redistributable"),t("OutboundLink")],1),e._v(" if you haven't.")])]),e._v(" "),t("h2",{attrs:{id:"troubleshooting"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting"}},[e._v("#")]),e._v(" Troubleshooting")]),e._v(" "),t("h3",{attrs:{id:"windows-issues"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#windows-issues"}},[e._v("#")]),e._v(" Windows issues")]),e._v(" "),t("ul",[t("li",[e._v("If Taichi crashes and reports "),t("code",[e._v("ImportError")]),e._v(" on Windows: Please consider installing "),t("a",{attrs:{href:"https://aka.ms/vs/16/release/vc_redist.x64.exe",target:"_blank",rel:"noopener noreferrer"}},[e._v("Microsoft Visual C++ Redistributable"),t("OutboundLink")],1),e._v(".")])]),e._v(" "),t("h3",{attrs:{id:"python-issues"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#python-issues"}},[e._v("#")]),e._v(" Python issues")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("If "),t("code",[e._v("pip")]),e._v(" complains that it could not find a satisfying package, i.e.,")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("ERROR: Could not find a version that satisfies the requirement taichi (from versions: none)\nERROR: No matching distribution found for taichi\n")])])]),t("ul",[t("li",[t("p",[e._v("Make sure you're using Python version 3.6/3.7/3.8:")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("python3 -c "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("\"print(__import__('sys').version[:3])\"")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 3.6, 3.7 or 3.8")]),e._v("\n")])])])]),e._v(" "),t("li",[t("p",[e._v("Make sure your Python executable is 64-bit:")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("python3 -c "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("\"print(__import__('platform').architecture()[0])\"")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 64bit")]),e._v("\n")])])])])])])]),e._v(" "),t("h3",{attrs:{id:"cuda-issues"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cuda-issues"}},[e._v("#")]),e._v(" CUDA issues")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("If Taichi crashes with the following messages:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("[Taichi] mode=release\n[Taichi] version 0.6.0, supported archs: [cpu, cuda, opengl], commit 14094f25, python 3.8.2\n[W 05/14/20 10:46:49.549] [cuda_driver.h:call_with_warning@60] CUDA Error CUDA_ERROR_INVALID_DEVICE: invalid device ordinal while calling mem_advise (cuMemAdvise)\n[E 05/14/20 10:46:49.911] Received signal 7 (Bus error)\n")])])]),t("p",[e._v("This might be due to the fact that your NVIDIA GPU is pre-Pascal and has limited support for "),t("a",{attrs:{href:"https://www.nextplatform.com/2019/01/24/unified-memory-the-final-piece-of-the-gpu-programming-puzzle/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Unified Memory"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Possible solution")]),e._v(": add "),t("code",[e._v("export TI_USE_UNIFIED_MEMORY=0")]),e._v(" to your "),t("code",[e._v("~/.bashrc")]),e._v(". This disables unified memory usage in CUDA backend.")])])]),e._v(" "),t("li",[t("p",[e._v("If you find other CUDA problems:")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Possible solution")]),e._v(": add "),t("code",[e._v("export TI_ENABLE_CUDA=0")]),e._v(" to your "),t("code",[e._v("~/.bashrc")]),e._v(". This disables the CUDA backend completely and Taichi will fall back on other GPU backends such as OpenGL.")])])])]),e._v(" "),t("h3",{attrs:{id:"opengl-issues"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#opengl-issues"}},[e._v("#")]),e._v(" OpenGL issues")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("If Taichi crashes with a stack backtrace containing a line of "),t("code",[e._v("glfwCreateWindow")]),e._v(" (see "),t("a",{attrs:{href:"https://github.com/taichi-dev/taichi/issues/958",target:"_blank",rel:"noopener noreferrer"}},[e._v("#958"),t("OutboundLink")],1),e._v("):")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("div",{staticClass:"highlight-lines"},[t("br"),t("br"),t("br"),t("br"),t("br"),t("br"),t("br"),t("br"),t("div",{staticClass:"highlighted"},[e._v(" ")]),t("div",{staticClass:"highlighted"},[e._v(" ")]),t("div",{staticClass:"highlighted"},[e._v(" ")]),t("br"),t("br"),t("br")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("[Taichi] mode=release\n[E 05/12/20 18.25:00.129] Received signal 11 (Segmentation Fault)\n***********************************\n* Taichi Compiler Stack Traceback *\n***********************************\n\n... (many lines, omitted)\n\n/lib/python3.8/site-packages/taichi/core/../lib/taichi_core.so: _glfwPlatformCreateWindow\n/lib/python3.8/site-packages/taichi/core/../lib/taichi_core.so: glfwCreateWindow\n/lib/python3.8/site-packages/taichi/core/../lib/taichi_core.so: taichi::lang::opengl::initialize_opengl(bool)\n\n... (many lines, omitted)\n")])])]),t("p",[e._v("This is likely because you are running Taichi on a (virtual) machine with an old OpenGL API. Taichi requires OpenGL 4.3+ to work.")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Possible solution")]),e._v(": add "),t("code",[e._v("export TI_ENABLE_OPENGL=0")]),e._v(" to your "),t("code",[e._v("~/.bashrc")]),e._v(" even if you initialize Taichi with other backends than OpenGL. This disables the OpenGL backend detection to avoid incompatibilities.")])])])]),e._v(" "),t("h3",{attrs:{id:"linux-issues"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#linux-issues"}},[e._v("#")]),e._v(" Linux issues")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("If Taichi crashes and reports "),t("code",[e._v("libtinfo.so.5 not found")]),e._v(":")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("On Ubuntu, execute "),t("code",[e._v("sudo apt install libtinfo-dev")]),e._v(".")])]),e._v(" "),t("li",[t("p",[e._v("On Arch Linux, first edit "),t("code",[e._v("/etc/pacman.conf")]),e._v(", and append these lines:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("[archlinuxcn]\nServer = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch\n")])])]),t("p",[e._v("Then execute "),t("code",[e._v("sudo pacman -Syy ncurses5-compat-libs")]),e._v(".")])])])]),e._v(" "),t("li",[t("p",[e._v("If Taichi crashes and reports "),t("code",[e._v("/usr/lib/libstdc++.so.6: version `CXXABI_1.3.11' not found")]),e._v(":")]),e._v(" "),t("p",[e._v("You might be using Ubuntu 16.04, please try the solution in "),t("a",{attrs:{href:"https://github.com/tensorflow/serving/issues/819#issuecomment-377776784",target:"_blank",rel:"noopener noreferrer"}},[e._v("this thread"),t("OutboundLink")],1),e._v(":")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" add-apt-repository ppa:ubuntu-toolchain-r/test -y\n"),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt-get")]),e._v(" update\n"),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt-get")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" libstdc++6\n")])])])])]),e._v(" "),t("h3",{attrs:{id:"other-issues"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#other-issues"}},[e._v("#")]),e._v(" Other issues")]),e._v(" "),t("ul",[t("li",[e._v("If none of those above address your problem, please report this by "),t("a",{attrs:{href:"https://github.com/taichi-dev/taichi/issues/new?labels=potential+bug&template=bug_report.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("opening an issue"),t("OutboundLink")],1),e._v(" on GitHub. This would help us improve user experiences and compatibility, many thanks!")])])])}),[],!1,null,null,null);s.default=i.exports}}]);