const blogPluginExports = require('@docusaurus/plugin-content-blog');
const path = require('path')
const globby = require('globby')

const blogPlugin = blogPluginExports.default;

async function blogPluginEnhanced(context, options) {
  let pathwithlang = path.join(options.path, context.i18n.currentLocale)
  console.log(pathwithlang)
  const pagesFiles = await globby('**/*.{md,mdx}', {
    cwd: pathwithlang,
  });
  if (pagesFiles.length === 0) {
    pathwithlang = path.join(options.path, context.i18n.defaultLocale)
  }
  options.path = pathwithlang
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