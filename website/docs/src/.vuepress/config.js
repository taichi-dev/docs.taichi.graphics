const versioning = require("./scripts/versioning.js");

module.exports = {
  title: "Taichi",
  description: "The Taichi Programming Language",
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
    extendMarkdown: (md) => {
      md.use(require("markdown-it-imsize"));
      md.use(require("markdown-it-footnote"));
      md.use(require("markdown-it-mark"));
    },
  },

  // i18n support
  locales: {
    "/": {
      lang: "en-US",
      title: "Taichi",
      description: "The Taichi Programming Language",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Taichi",
      description: "Taichi编程语言",
    },
  },

  // theme config
  themeConfig: {
    logo: "/logo_medium.png",
    docsRepo: 'taichi-dev/taichi.graphics',
    docsDir: "",
    sidebarDepth: 3,
    displayAllHeaders: false,
    smoothScroll: true,
    editLinks: true,
    lastUpdated: true,
    repo: "taichi-dev/taichi",
    versions: {
      latest: versioning.versions.latest,
      selected: versioning.versions.latest,
      all: versioning.versions.all,
    },
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        ariaLabel: "Languages",
        editLinkText: "Edit this page on GitHub",
        nav: [
          {
            text: "Documentation",
            items: versioning.linksFor("documentation/overview/overview", "en"),
            // link: "/documentation/overview/overview"
          },
          { text: "Tutorials", link: "/tutorials/" },
          {
            text: "Learn More",
            items: [
              {
                text: "Explore",
                items: [
                  { text: "Gallery", link: "/gallery/" },
                  { text: "Research", link: "/research/" },
                  { text: "Taichi Hub Playground", link: "http://hub.taichi.graphics/" },
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
          ...versioning.sidebarsFor("en"),
          "/contribution/": [
            {
              title: "Contribution Guide",
              collapsable: false,
              children: [
                "dev_install",
                "contributor_guide",
                "doc_writing",
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
          {
            text: "文档",
            items: versioning.linksFor("documentation/overview/overview", "zh"),
          },
          { text: "教程", link: "/zh/tutorials/" },
          {
            text: "了解更多",
            items: [
              {
                text: "探索",
                items: [
                  { text: "画廊", link: "/zh/gallery/" },
                  { text: "研究", link: "/zh/research/" },
                  { text: "Taichi Hub游乐场", link: "http://hub.taichi.graphics/" },
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
          ...versioning.sidebarsFor("zh"),
          "/zh/contribution/": [
            {
              title: "贡献指南",
              collapsable: false,
              children: [
                "dev_install",
                "contributor_guide",
                "doc_writing",
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
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 15,
        // Only search the latest version otherwise many
        // duplicates will show up and confuse ppl
        test: [
          `/${versioning.versions.latest.replace(".", "\\.")}/`,
          `/zh/${versioning.versions.latest.replace(".", "\\.")}/`,
        ],
      },
    ],
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
    [
      "vuepress-plugin-container",
      {
        type: "note",
        defaultTitle: {
          "/": "NOTE",
          "/zh/": "注解",
        },
      },
    ],
  ],
};
