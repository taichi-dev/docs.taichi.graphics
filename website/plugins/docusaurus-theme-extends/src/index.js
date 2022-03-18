const path = require('path')

module.exports = function(context) {
  return {
    name: 'docusaurus-sidebarItems',
    getThemePath() {
      return path.resolve(__dirname, '../src/theme');
    },
  }
}