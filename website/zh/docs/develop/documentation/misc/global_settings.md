# 全局设置

## 后端

- 指定要使用的后端，请使用：`ti.init(arch=ti.cuda)`。
- To specify pre-allocated memory size for CUDA: `ti.init(device_memory_GB=0.5)`.
- To disable unified memory usage on CUDA: `ti.init(use_unified_memory=False)`.
- To specify which GPU to use for CUDA: `export CUDA_VISIBLE_DEVICES=[gpuid]`.
- To disable a backend on start up, say, CUDA: `export TI_ENABLE_CUDA=0`.

## 编译

- Disable advanced optimization to save compile time & possible errors: `ti.init(advanced_optimization=False)`.
- Disable fast math to prevent possible undefined math behavior: `ti.init(fast_math=False)`.
- To print preprocessed Python code: `ti.init(print_preprocessed=True)`.
- To show pretty Taichi-scope stack traceback: `ti.init(excepthook=True)`.
- 如要打印生成的中间表示码 (IR)：`ti.init(print_ir=True)`。

## 运行时

- Restart the entire Taichi system (destroy all fields and kernels): `ti.reset()`.
- To start program in debug mode: `ti.init(debug=True)` or `ti debug your_script.py`.
- 禁止在启动时导入 torch：`export TI_ENABLE_TORCH=0`。

## 日志记录

- Show more detailed log to level TRACE: `ti.init(log_level=ti.TRACE)` or `ti.set_logging_level(ti.TRACE)`.
- 消除冗余输出：`ti.init(verbose=False)`。

## 开发

- 如要在 Taichi 崩溃时触发 GDB：`ti.init(gdb_trigger=True)`。
- Cache compiled runtime bitcode in **dev mode** to save start up time: `export TI_CACHE_RUNTIME_BITCODE=1`.
- To specify how many threads to run test: `export TI_TEST_THREADS=4` or `ti test -t4`.

## 由环境变量指定`ti.init`中的参数

Arguments for `ti.init` may also be specified from environment variables. For example: 例如：

- `ti.init(arch=ti.cuda)`相当于`export TI_ARCH=cuda`。
- `ti.init(log_level=ti.TRACE)` is equivalent to `export TI_LOG_LEVEL=trace`.
- `ti.init(debug=True)`相当于`export TI_DEBUG=1`。
- `ti.init(use_unified_memory=False)` is equivalent to `export TI_USE_UNIFIED_MEMORY=0`.

If both `ti.init` argument and the corresponding environment variable are specified, then the one in the environment variable will **override** the one in the argument, e.g.:

- if `ti.init(arch=ti.cuda)` and `export TI_ARCH=opengl` are specified at the same time, then Taichi will choose `ti.opengl` as backend.
- if `ti.init(debug=True)` and `export TI_DEBUG=0` are specified at the same time, then Taichi will disable debug mode.

::: note

If `ti.init` is called twice, then the configuation in first invocation will be completely discarded, e.g.:

```python {1,3}
ti.init(debug=True)
print(ti.cfg.debug)  # True
ti.init()
print(ti.cfg.debug)  # False
```

:::
