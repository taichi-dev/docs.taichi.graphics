const { description } = require("../../package");

module.exports = {
  title: "Taichi",
  description: description,
  base: "/taichi.graphics/",

  // Extra tags to be injected to the page HTML `<head>`
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["link", { rel: "icon", href: "/logo.png" }],
    ["meta", { name: "og:locale", content: "en_US" }],
  ],
  markdown: {
    lineNumbers: false,
  },

  // i18n support
  locales: {
    "/": {
      lang: "en-US",
      title: "Taichi",
      description: description,
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Taichi",
      description: "Taichi编程语言",
    },
  },

  // theme config
  themeConfig: {
    logo: "/logo.png",
    editLinks: false,
    docsDir: "",
    sidebarDepth: 3,
    displayAllHeaders: true,
    smoothScroll: true,
    editLinks: true,
    lastUpdated: true,
    repo: "taichi-dev/taichi",
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        ariaLabel: "Languages",
        editLinkText: "Edit this page on GitHub",
        nav: [
          { text: "Documentation", link: "/documentation/overview/overview" },
          { text: "Tutorials", link: "/tutorials/" },
          {
            text: "Learn More",
            items: [
              {
                text: "Explore",
                items: [
                  { text: "Gallery", link: "/gallery/" },
                  { text: "Research", link: "/research/" },
                  { text: "Playground", link: "/playground/" },
                ],
              },
              {
                text: "Resources",
                items: [
                  { text: "Contribution Guide", link: "/contribution/" },
                  { text: "Events", link: "/events/" },
                  {
                    text: "Changelog",
                    link: "https://github.com/taichi-dev/taichi/releases",
                  },
                ],
              },
              { text: "FAQ", items: [{ text: "FAQ", link: "/faq/" }] },
            ],
          },
          { text: "Forum", link: "https://forum.taichi.graphics/" },
        ],
        sidebar: {
          "/documentation/": [
            {
              title: "Overview",
              collapsable: true,
              children: [
                "overview/overview",
                "overview/install",
                "overview/hello",
              ],
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
          ],
          "/contribution/": [
            {
              title: "Contribution Guide",
              collapsable: false,
              children: [
                "dev_install",
                "contributor_guide",
                "write_test",
                "utilities",
                "profiler",
                "cpp_style",
                "compilation",
                "internal",
                "versioning_releases",
              ],
            },
          ],
          "/events/": [
            {
              title: "Events",
              collapsable: false,
              children: ["taichicon"],
            },
          ],
        },
      },
      "/zh/": {
        selectText: "选择语言",
        label: "简体中文",
        ariaLabel: "语言",
        editLinkText: "在 GitHub 上编辑此页",
        nav: [
          { text: "文档", link: "/zh/documentation/overview/overview" },
          { text: "教程", link: "/zh/tutorials/" },
          {
            text: "了解更多",
            items: [
              {
                text: "探索",
                items: [
                  { text: "画廊", link: "/zh/gallery/" },
                  { text: "研究", link: "/zh/research/" },
                  { text: "游乐场", link: "/zh/playground/" },
                ],
              },
              {
                text: "资源",
                items: [
                  { text: "贡献指南", link: "/zh/contribution/" },
                  { text: "活动", link: "/zh/events/" },
                  {
                    text: "更新日志",
                    link: "https://github.com/taichi-dev/taichi/releases",
                  },
                ],
              },
              { text: "常见问题", items: [{ text: "FAQ", link: "/zh/faq/" }] },
            ],
          },
          { text: "论坛", link: "https://forum.taichi.graphics/" },
        ],
        sidebar: {
          "/zh/documentation/": [
            {
              title: "概览",
              collapsable: true,
              children: [
                "overview/overview",
                "overview/install",
                "overview/hello",
              ],
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
          ],
          "/zh/contribution/": [
            {
              title: "贡献指南",
              collapsable: false,
              children: [
                "dev_install",
                "contributor_guide",
                "write_test",
                "utilities",
                "profiler",
                "cpp_style",
                "compilation",
                "internal",
                "versioning_releases",
              ],
            },
          ],
          "/zh/events/": [
            {
              title: "活动",
              collapsable: false,
              children: ["taichicon"],
            },
          ],
        },
      },
    },
  },

  // Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
  plugins: [
    "@vuepress/active-header-links",
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    ["vuepress-plugin-mathjax", { target: "svg", macros: { "*": "\\times" } }],
    ["api-docs-generator", { tagColors: { static: "#10ac84" } }],
    [
      "vuepress-plugin-code-copy",
      {
        color: "#900C3F",
        backgroundTransition: false,
        staticIcon: false,
      },
    ],
  ],
};
