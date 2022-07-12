const path = require('path');

const versions = require('./versions.json');

const variablePlugin = require('./plugins/remark-plugins/variables');
const fragmentPlugin = require('./plugins/remark-plugins/fragments');
const utilsExtensionPlugin = require("./plugins/docusaurus-utils-extends");
// const variables = require('./variables');

const versionpaths = [__dirname + '/docs']
for (const version of versions) {
  versionpaths.push(__dirname + `/versioned_docs/version-${version}`)
}

// For i18n
const DefaultLocale = 'en';
const mapLocaleCodeToCrowdin = (locale) => {
  switch (locale) {
    case 'zh-Hans':
      return 'zh-CN';
    default:
      return locale;
  }
};

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
    utilsExtensionPlugin,
    path.resolve(__dirname, 'plugins/docusaurus-plugin-hotjar'),
    [
      path.resolve(__dirname, 'plugins/autoapi-plugin'),
      {
        path: path.resolve(__dirname, 'src/pages/api'),
        include: '**/*.html',
        route: 'api/',
        allowVersions: versions,
        current: 'master',
      },
    ],
    [
      path.resolve(__dirname, 'plugins/blog-enhance-plugin'),
      {
        postsPerPage: 10,
      }
    ],
  ],
  i18n: {
    defaultLocale: DefaultLocale,
    locales: [DefaultLocale, 'zh-Hans', 'fr'],
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
      darkTheme: require('prism-react-renderer/themes/palenight'),
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
        src: 'img/black_logo.png',
        srcDark: 'img/white_logo.png',
        href: 'https://www.taichi-lang.org/',
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
          to: '/api/{{version}}',
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
          items: [
            {
              to: '/tgc01',
              label: 'Taichi Graphics Course 01',
            },
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
      // See https://docusaurus.io/docs/search#contextual-search
      contextualSearch: true,
      // searchParameters: {
      //   facetFilters: [`language:${DefaultLocale}`]
      // },
    },
    colorMode: {
      switchConfig: {
        darkIcon: '🌙',
        lightIcon: '☀️',
      },
    },
  },
  themes: [path.join(__dirname, './plugins/docusaurus-theme-extends/src')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // `Docs-only` mode, blocked by bug https://github.com/facebook/docusaurus/issues/4967
          routeBasePath: '/docs',
          path: 'docs',
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            if (locale !== DefaultLocale) {
              return `https://translate.taichi.graphics/project/taichi-programming-language/${mapLocaleCodeToCrowdin(
                locale
              )}`;
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
              path: 'master',
            },
          },
          remarkPlugins: [
            [variablePlugin, { data: (path) => {
              if (!path) return {}
              for (const item of versionpaths) {
                if (path.startsWith(item)) {
                  return require(item + '/variables')
                }
              }
              return {}
            }, fail: false }],
            [
              fragmentPlugin,
              {
                prefix: 'fragments',
                fail: false,
                baseUrl: (path) => {
                  if (!path) return __dirname + '/docs/fragments'
                  for (const item of versionpaths) {
                    if (path.startsWith(item)) {
                      return item + '/fragments'
                    }
                  }
                  return __dirname + '/docs/fragments'
                },
              },
            ],
          ],
        },
        blog: false,
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
