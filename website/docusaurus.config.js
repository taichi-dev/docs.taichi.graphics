/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
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
          docId: 'intro',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
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
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
