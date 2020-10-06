module.exports = [
  {
    title: "Overview",
    collapsable: true,
    children: ["overview/overview", "overview/install", "overview/hello"],
  },
  {
    title: "Basic Concepts",
    collapsable: true,
    children: [
      "basic/syntax",
      "basic/type",
      "basic/field_matrix",
      "basic/external",
    ],
  },
  {
    title: "Advanced Programming",
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
    title: "API References",
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
    title: "Miscellaneous",
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
    title: "Acknowledgments",
    collapsable: true,
    children: ["ack/acknowledgments"],
  },
  {
    title: "Legacy",
    collapsable: true,
    children: ["legacy/legacy_installation"],
  },
];
