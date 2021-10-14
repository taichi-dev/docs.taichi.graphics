// For i18n
const DefaultLocale = 'en';
const mapLocaleCodeToCrowdin = (locale) => {
  switch (locale) {
    case 'zh-Hans':
      return 'zh-CN';
      break;
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
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/black_or_white.svg',
  organizationName: 'taichi-dev',
  projectName: 'docs.taichi.graphics',
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
          docId: 'lang/articles/get-started',
          position: 'right',
          label: 'Docs',
          className: 'animated-anchor-link',
        },
        {
          type: 'doc',
          docId: 'lang/api/index',
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
        },
        blog: {
          postsPerPage: 10,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
