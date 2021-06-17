/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Taichi Docs',
  tagline: 'Graphics programming for everyone',
  url: 'http://docs.taichi.graphics',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/black_or_white.svg',
  organizationName: 'taichi-dev',
  projectName: 'docs.taichi.graphics',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },
  themeConfig: {
    // Optional banner
    announcementBar: {
      id: 'under-construction-banner',
      content:
        'Sorry for any inconvenience, this new docsite is still under construction and translation. Please help us by contributing docs, corrections and translations! Thank you 😃',
      backgroundColor: '#0891b2',
      textColor: '#E5E7EB',
      isCloseable: false,
    },
    prism: {
      defaultLanguage: 'python',
    },
    gtag: {
      trackingID: 'G-9K17QVGTR6',
      anonymizeIP: true,
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
          docId: 'lang/get-started',
          position: 'right',
          label: 'Docs',
          className: 'animated-anchor-link',
        },
        {
          type: 'doc',
          docId: 'lang-api/index',
          position: 'right',
          label: 'API',
          className: 'animated-anchor-link',
        },
        {
          label: 'Explore',
          position: 'right',
          items: [
            {
              to: '/community/index',
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
              to: '/community/index',
            },
            {
              label: 'Documentation',
              to: '/docs/',
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
              href: 'https://taichi.graphics/contact',
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
      apiKey: 'af0e5e752542b015cba900b98e25197d',
      indexName: 'taichi',
      // TODO: turn this on once we version the docs
      contextualSearch: false,
      // Optional: required if using our own DocSearch crawler
      // appId: 'YOUR_APP_ID',
      searchParameters: {},
    },
    colorMode: {
      switchConfig: {
        darkIcon: '🌙',
        lightIcon: '☀️',
      }
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        editUrl:
          'https://github.com/taichi-dev/docs.taichi.graphics/edit/master/website/',
        // editUrl: ({locale, versionDocsDirPath, docPath}) => {
        //   if (locale !== 'en') {
        //     return `https://crowdin.com/project/taichi-programming-language/${locale}`;
        //   }
        //   return `https://github.com/taichi-dev/docs.taichi.graphics/edit/master/website/${versionDocsDirPath}/${docPath}`;
        // },
        editCurrentVersion: true,
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // `Docs-only` mode, blocked by bug https://github.com/facebook/docusaurus/issues/4967
          // routeBasePath: '/',
          path: 'docs',
          // TODO: use the main repo URL for `en` locale as the source of truth docs will live there!
          editUrl:
            'https://github.com/taichi-dev/docs.taichi.graphics/edit/master/website/',
          // editUrl: ({locale, versionDocsDirPath, docPath}) => {
          //   if (locale !== 'en') {
          //     return `https://crowdin.com/project/taichi-programming-language/${locale}`;
          //   }
          //   return `https://github.com/taichi-dev/docs.taichi.graphics/edit/master/website/${versionDocsDirPath}/${docPath}`;
          // },
          editCurrentVersion: true,
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          versions: {
            current: {
              label: 'develop',
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
