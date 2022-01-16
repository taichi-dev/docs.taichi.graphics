# 2022.01.17
- 增加 HTML render 组件(`src/components/Autoapi`) 以及插件(`plugins/autoapi-plugin`)
- 使用 `/api/$version/` 作为 autoapi 路径，如果是 master 的话自动移除 master 路径前缀
- 支持多个版本切换
- 支持黑色主题