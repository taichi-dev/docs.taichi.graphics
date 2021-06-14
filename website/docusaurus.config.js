/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Taichi Docs',
  tagline: 'Graphics programming for everyone',
  url: 'http://docs.taichi.graphics',
  baseUrl: '/',
  // TODO: use 'throw' for production!!!
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
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
      backgroundColor: '#d35400',
      textColor: '#E5E7EB',
      isCloseable: false,
    },
    prism: {
      defaultLanguage: 'python',
    },
    navbar: {
      title: null,
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
          docId: 'docs/get-started',
          position: 'right',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'api/index',
          position: 'right',
          label: 'API',
        },
        {
          to: '/community/index',
          position: 'right',
          label: 'Community',
          activeBaseRegex: `/community/`,
        },
        {
          type: 'localeDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              to: 'https://docs.taichi.graphics/help-us-translate',
              label: 'Help us translate',
            },
          ],
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          // Add additional dropdown items at the beginning/end of the dropdown.
          dropdownItemsBefore: [],
          dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
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
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: '/docs/docs/get-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Forum',
              href: 'https://forum.taichi.graphics',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/taichi-dev/docs.taichi.graphics',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Taichi Graphics Technology, Inc. Built with Docusaurus.`,
    },
    algolia: {
      apiKey: 'af0e5e752542b015cba900b98e25197d',
      indexName: 'taichi',
      contextualSearch: true,
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
          sidebarPath: require.resolve('./sidebars.js'),
          // Turn on the `Docs-only mode`
          routeBasePath: '/',
          editUrl:
            'https://github.com/taichi-dev/docs.taichi.graphics/edit/master/website/',
          // editUrl: ({locale, versionDocsDirPath, docPath}) => {
          //   if (locale !== 'en') {
          //     return `https://crowdin.com/project/taichi-programming-language/${locale}`;
          //   }
          //   return `https://github.com/taichi-dev/docs.taichi.graphics/edit/master/website/${versionDocsDirPath}/${docPath}`;
          // },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
