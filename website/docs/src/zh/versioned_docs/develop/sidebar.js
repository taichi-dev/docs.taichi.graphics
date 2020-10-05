module.exports = [
  {
    title: "概览",
    collapsable: true,
    children: ["overview/overview", "overview/install", "overview/hello"],
  },
  {
    title: "基本概念",
    collapsable: true,
    children: [
      "basic/syntax",
      "basic/type",
      "basic/field_matrix",
      "basic/external",
    ],
  },
  {
    title: "高级编程",
    collapsable: true,
    children: [
      "advanced/meta",
      "advanced/layout",
      "advanced/sparse",
      "advanced/differentiable_programming",
      "advanced/performance",
      "advanced/odop",
      "advanced/syntax_sugars",
      "advanced/offset",
    ],
  },
  {
    title: "API 参考手册",
    collapsable: true,
    children: [
      "api/field",
      "api/ti",
      "api/scalar_field",
      "api/vector",
      "api/matrix",
      "api/arithmetics",
      "api/atomic",
      "api/snode",
    ],
  },
  {
    title: "杂项",
    collapsable: true,
    children: [
      "misc/gui",
      "misc/debugging",
      "misc/export_results",
      "misc/cli_utilities",
      "misc/global_settings",
      "misc/export_kernels",
      "misc/extension_libraries",
    ],
  },
  {
    title: "致谢",
    collapsable: true,
    children: ["ack/acknowledgments"],
  },
  {
    title: "遗留系统",
    collapsable: true,
    children: ["legacy/legacy_installation"],
  },
];
