const { description } = require('../../package')

module.exports = {
  title: 'Taichi',
  description: description,
  base: '/taichi.graphics/',

  // Extra tags to be injected to the page HTML `<head>`
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'og:locale', content: 'en_US' }],
  ],
  markdown: {
    lineNumbers: false
  },

  // i18n support
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Taichi',
      description: description
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Taichi',
      description: 'Taichi编程语言'
    }
  },

  // theme config
  themeConfig: {
    logo: '/logo.png',
    editLinks: false,
    docsDir: '',
    sidebarDepth: 3,
    displayAllHeaders: true,
    smoothScroll: true,
    editLinks: true,
    lastUpdated: true,
    repo: 'taichi-dev/taichi',
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {text: 'Documentation', link: '/documentation/'},
          {text: 'Tutorials', link: '/tutorials/'},
          {text: 'Explore', items: [
            {text: 'Gallery', link: '/gallery/'},
            {text: 'Research', link: '/research/'},
            {text: 'Playground', link: '/playground/'},
            {text: 'Changelog', link: 'https://github.com/taichi-dev/taichi/releases'},
            {text: 'FAQ', link: '/faq/'},
          ]},
          {text: 'Forum', link: 'https://forum.taichi.graphics/'}
        ],
        sidebar: {
          '/documentation/': [
            {
              title: 'Overview',
              collapsable: true,
              children: ['overview', 'install', 'hello']
            }
          ],
        }
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          {text: '文档', link: '/zh/documentation/'},
          {text: '教程', link: '/zh/tutorials/'},
          {text: '探索', items: [
            {text: '画廊', link: '/gallery/'},
            {text: '研究', link: '/research/'},
            {text: '游乐场', link: '/playground/'},
            {text: '更新日志', link: 'https://github.com/taichi-dev/taichi/releases'},
            {text: '常见问题', link: '/faq/'},
          ]},
          {text: '论坛', link: 'https://forum.taichi.graphics/'}
        ],
        sidebar: {
          '/zh/documentation/': [
            {
              title: '概览',
              collapsable: true,
              children: ['overview', 'install', 'hello']
            }
          ],
        }
      }
    }
  },

  // Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ['vuepress-plugin-mathjax', {target: 'svg', macros: {'*': '\\times'}}],
  ]
}
