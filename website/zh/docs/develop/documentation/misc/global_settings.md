# 全局设置

## 后端

- 指定要使用的后端，请使用：`ti.init(arch=ti.cuda)`。
- 指定 CUDA 预分配内存的大小：`ti.init(device_memory_GB=0.5)`。
- 禁止 CUDA 使用统一内存 (Unified Memory)：`ti.init(use_unified_memory=False)`。
- 指定 CUDA 所使用的 GPU：`export CUDA_VISIBLE_DEVICES=[gpuid]`。
- 要在启动时禁用某个后端，比如 CUDA：`export TI_ENABLE_CUDA=0`。

## 编译

- 禁用高级优化以节省编译时间和可能的错误：`ti.init(advanced_optimization=False)`。
- 禁用 fast math 以防止可能出现的未定义数学行为: `ti.init(fast_math=False)`。
- 如要打印预处理后的 Python 代码：`ti.init(print_preprocessed=True)`。
- 如要显示美化后的 Taichi 作用域栈回溯: `ti.init(excepthook=True)`。
- 如要打印生成的中间表示码 (IR)：`ti.init(print_ir=True)`。

## 运行时

- 重新启动 Taichi 运行时系统（销毁所有场和内核）：`ti.reset()`。
- 如要以调试模式启动程序：`ti.init(debug=True)`或`ti debug your_script.py`。
- 禁止在启动时导入 torch：`export TI_ENABLE_TORCH=0`。

## 日志记录

- 通过输出 TRACE 级日志以显示更详尽的信息：`ti.init(log_level=ti.TRACE)`或`ti.set_logging_level(ti.TRACE)`。
- 消除冗余输出：`ti.init(verbose=False)`。

## 开发

- 如要在 Taichi 崩溃时触发 GDB：`ti.init(gdb_trigger=True)`。
- **开发模式**中，缓存编译过的运行时位码 (compiled runtime bitcode) 以节省启动时间：`export TI_CACHE_RUNTIME_BITCODE=1`。
- 如要指定运行测试的线程数：`export TI_TEST_THREADS=4` 或 `ti test -t4`。

## 由环境变量指定`ti.init`中的参数

`ti.init`中的参数也可以从环境变量中指定。 例如：

- `ti.init(arch=ti.cuda)`相当于`export TI_ARCH=cuda`。
- `ti.init(log_level=ti.TRACE)`相当于`export TI_LOG_LEVEL=trace`。
- `ti.init(debug=True)`相当于`export TI_DEBUG=1`。
- `ti.init(use_unified_memory=False)`相当于`export TI_USE_UNIFIED_MEMORY=0`。

如果`ti.init`中的参数也同时在对应的环境变量中被指定，那么环境变量中的参数将**覆盖**<0>ti.init</0>中的参数，例如：

- 如果同时指定了`ti.init(arch=ti.cuda)`和`export TI_ARCH=opengl`，那么Taichi将会选择`ti.opengl`作为后端。
- 如果同时指定了`ti.init(debug=True)`和`export TI_DEBUG=0`，那么Taichi将会禁用debug模式。

::: note

如果调用了两次`ti.init`，那么首次调用时的配置将被完全丢弃，例如：

```python {1,3}
ti.init(debug=True)
print(ti.cfg.debug)  # True
ti.init()
print(ti.cfg.debug)  # False
```

:::
