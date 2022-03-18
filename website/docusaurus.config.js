const path = require("path");

const version = require('./apiversion.json')

const variablePlugin = require('./plugins/remark-plugins/variables')
const fragmentPlugin = require('./plugins/remark-plugins/fragments')
const variables = require('./variables')

// For i18n
const DefaultLocale = 'en';
const mapLocaleCodeToCrowdin = (locale) => {
  switch (locale) {
    case 'zh-Hans':
      return 'zh-CN';
    default:
      return locale;
  }
}

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Taichi Docs',
  tagline: 'Graphics programming for everyone',
  url: 'https://docs.taichi.graphics',
  baseUrl: '/',
  // trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/black_or_white.svg',
  organizationName: 'taichi-dev',
  projectName: 'docs.taichi.graphics',
  plugins: [
    'docusaurus-plugin-sass',
    path.resolve(__dirname, 'plugins/docusaurus-plugin-hotjar'),
    [
      path.resolve(__dirname, 'plugins/autoapi-plugin'),
      {
        path: path.resolve(__dirname, 'src/pages/api'),
        include: '**/*.html',
        route: 'api/',
        defaultVersion: version.current, // cd $TAICHI_PATH && git describe --tags --abbrev=0
      },
    ],
  ],
  i18n: {
    defaultLocale: DefaultLocale,
    locales: [DefaultLocale, 'zh-Hans'],
  },
  themeConfig: {
    hideableSidebar: true,
    // Optional banner
    // announcementBar: {
    //   id: 'under-construction-banner',
    //   content:
    //     'Please help us by contributing documentation, corrections and translations! Thank you 😃',
    //   backgroundColor: '#0891b2',
    //   textColor: '#E5E7EB',
    //   isCloseable: false,
    // },
    prism: {
      defaultLanguage: 'python',
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/palenight')
    },
    hotjar: {
      siteId: '2765142',
    },
    navbar: {
      title: null,
      hideOnScroll: false,
      // style: 'dark',
      logo: {
        alt: 'Taichi Graphics',
        src: 'img/black_words.svg',
        srcDark: 'img/white_words.svg',
        href: 'https://taichi.graphics',
      },
      items: [
        {
          type: 'doc',
          docId: 'lang/articles/get-started/index',
          position: 'right',
          label: 'Docs',
          className: 'animated-anchor-link',
        },
        {
          to: '/api/',
          position: 'right',
          label: 'API',
          className: 'animated-anchor-link',
        },
        {
          to: 'blog',
          label: 'Blogs',
          position: 'right',
          className: 'animated-anchor-link',
        },
        {
          label: 'Training',
          position: 'right',
          items:[
            {
              to: '/tgc01',
              label: 'Taichi Graphics Course 01'
            }
          ],
        },
        {
          label: 'Explore',
          position: 'right',
          items: [
            {
              to: '/community',
              label: 'Community',
              activeBaseRegex: '/community/',
            },
            {
              to: '/acknowledgments',
              label: 'Acknowledgments',
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              to: '/help-us-translate',
              label: 'Help us translate',
            },
          ],
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsBefore: [],
          dropdownItemsAfter: [
            // {to: '/versions', label: 'All versions'}
          ],
          dropdownActiveClassDisabled: true,
          docsPluginId: 'default',
        },
        {
          href: 'https://github.com/taichi-dev/taichi',
          'aria-label': 'GitHub repository',
          className: 'header-github-link',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'Taichi Programming Language',
              to: 'https://github.com/taichi-dev/taichi',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Community',
              to: '/community',
            },
            {
              label: 'Documentation',
              to: '/',
            },
            {
              label: 'Forum',
              href: 'https://forum.taichi.graphics',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About Us',
              href: 'https://taichi.graphics',
            },
            {
              label: 'Careers',
              href: 'https://taichi.graphics/careers',
            },
            {
              label: 'Contact',
              href: 'https://taichi.graphics/about#contact',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Cookie Policy',
              href: 'https://taichi.graphics/cookie-policy',
            },
            {
              label: 'Privacy Policy',
              href: 'https://taichi.graphics/privacy-policy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Taichi Graphics Technology, Inc. Built with Docusaurus and the Taichi community.`,
    },
    algolia: {
      appId: '6NDEOARB8Z',
      apiKey: '423ce169fbf3df5464895dc686a697b0',
      indexName: 'taichi',
      // TODO: turn this on once we version the docs
      contextualSearch: false,
      // TODO: turn this off once we version the docs && have i18n ready
      searchParameters: {
        facetFilters: [`language:${DefaultLocale}`]
      },
    },
    colorMode: {
      switchConfig: {
        darkIcon: '🌙',
        lightIcon: '☀️',
      }
    },
  },
  themes: [path.join(__dirname, './plugins/docusaurus-theme-extends/src')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // `Docs-only` mode, blocked by bug https://github.com/facebook/docusaurus/issues/4967
          routeBasePath: '/',
          path: 'docs',
          editUrl: ({locale, versionDocsDirPath, docPath}) => {
            if (locale !== DefaultLocale) {
              return `https://translate.taichi.graphics/project/taichi-programming-language/${mapLocaleCodeToCrowdin(locale)}`;
            }
            // here we enforce contributors to not be able to edit versioned docs
            // also redirect them to the main repository
            return `https://github.com/taichi-dev/taichi/edit/master/docs/${docPath}`;
          },
          editCurrentVersion: true,
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          versions: {
            current: {
              label: 'develop',
            },
          },
          remarkPlugins: [
            [variablePlugin, { data: variables, fail: false }],
            [fragmentPlugin, { prefix: 'fragments', fail: false, baseUrl: __dirname + '/fragments' }]
          ],
        },
        blog: {
          postsPerPage: 10,
        },
        gtag: {
          trackingID: 'G-9K17QVGTR6',
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
