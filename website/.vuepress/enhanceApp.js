/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // ...apply enhancements for the site.

  // Redirections to the old Taichi pages
  // https://github.com/vuejs/vuepress/issues/1803#issuecomment-602783264
  router.beforeResolve((to, from, next) => {
    if (to.fullPath == '/me' || to.fullPath == '/me/') {
      window.location.href = 'https://yuanming.taichi.graphics/';
    } else if (to.fullPath.startsWith('/mpm_course2019')) {
      window.location.href = 'https://yuanming.taichi.graphics/publication/2019-mpm-tutorial/';
    } else {
      next();
    }
  });
};
