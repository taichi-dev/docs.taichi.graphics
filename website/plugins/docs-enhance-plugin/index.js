const docsPluginExports = require("@docusaurus/plugin-content-docs");
const { normalizeUrl, docuHash } = require('@docusaurus/utils')
const { toGlobalDataVersion } = require('./globalData');

const { toSidebarsProp } = require('../../node_modules/@docusaurus/plugin-content-docs/lib/props')

async function docsPluginEnhanced(context, options) {
  const docsPluginInstance = await docsPluginExports.default(context, options);

  const {baseUrl} = context;

  return {
    // spread default docs lifecycles
    ...docsPluginInstance,

    // wrap/override the default loadContent lifecycle to provide additional logic
    contentLoaded: async function(params) {
      // execute default docs plugin behavior (ie create docs routes)
      await docsPluginInstance.contentLoaded(params);
      const loadedVersions = params.content.loadedVersions
      // console.log(loadedVersions[0].docs)

      const version = loadedVersions.find((version) => version.isLast)

      if (version && version.docs && version.docs.length > 0) {
        const sidebar = toSidebarsProp(version)
        const { createData, addRoute } = params.actions
        const __sidebar = await createData(
          `${docuHash('index-page')}.sidebar.json`,
          JSON.stringify(sidebar[version.docs[0].sidebar], null, 2),
        )
        // context.i18n.currentLocale
        const path = context.i18n.currentLocale === context.i18n.defaultLocale ? '/' : '/' + context.i18n.currentLocale + '/'
        addRoute({
          path: path,
          component: '@site/src/components/LandingPage/index.tsx',
          exact: true,
          modules: {
            sidebar: __sidebar
          },
        });
      }

      params.actions.setGlobalData({
        path: normalizeUrl([baseUrl, options.routeBasePath]),
        versions: loadedVersions.map(toGlobalDataVersion),
      });
      // console.log(params.content.loadedVersions[0].docs)
      // Add your own extra behavior here
      // params.actions.setGlobalData({allVersionDocsMetadata: params.content.loadedVersions})
    }
  };
}

module.exports = {
  ...docsPluginExports,
  default: docsPluginEnhanced
};