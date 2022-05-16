
const path = require("path");

async function myPlugin(context, options) {
  return {
    name: "docusaurus-utils-extends",
    configureWebpack(_config) {
      for (const item of _config.module.rules) {
        if (item.test.test('..xxx.md')) {
          const use = item.use[item.use.length - 1]
          if (use.loader.indexOf('plugin-content-docs/lib/markdown/index.js') >= 0) {
            use.loader = path.resolve(__dirname, './markdown/index.js')
          }
        }
      }
      return {}
    }
  };
}
module.exports = myPlugin;