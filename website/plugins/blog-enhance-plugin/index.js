const blogPluginExports = require('@docusaurus/plugin-content-blog');

const blogPlugin = blogPluginExports.default;

async function blogPluginEnhanced(context, options) {
  const blogPluginInstance = await blogPlugin(context, options);

  return {
    ...blogPluginInstance,
    async contentLoaded(...contentLoadedArgs) {
      await blogPluginInstance.contentLoaded(...contentLoadedArgs);
      const { actions, content } = contentLoadedArgs[0];
      const { setGlobalData } = actions;
      const { blogTags } = content;
	    setGlobalData({blogTags});
    }
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginEnhanced
};