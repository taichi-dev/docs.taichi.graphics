const path = require("path");
async function myPlugin(context, opts) {
  return {
    name: "docusaurus-my-project-cool-plugin",
    configureWebpack(config, isServer, utils, content) {
      return {
        module: {
          rules: [
            {
              test: /\.wasm$/,
              use: ["file-loader"],
            },
          ],
        },
      };
    },
  };
}
module.exports = myPlugin;
