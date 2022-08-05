const docsPluginExports = require("@docusaurus/plugin-content-docs");
const { normalizeUrl } = require('@docusaurus/utils')
const { toGlobalDataVersion } = require('./globalData');

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