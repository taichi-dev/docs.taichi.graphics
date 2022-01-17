const path = require('path');
const fs = require('fs');
const globby = require('globby');
const cheerio = require('cheerio');

const {
  encodePath,
  fileToPath,
  aliasedSitePath,
  docuHash,
} = require('@docusaurus/utils');

const isHTML = (source) => source.endsWith('.html');

module.exports = function (context, options) {
  const { siteConfig, siteDir, generatedFilesDir } = context;
  const contentPath = path.resolve(siteDir, options.path);
  return {
    name: 'autoapi-plugin',
    async loadContent() {
      const { include } = options;
      const pagesDir = contentPath;
      if (!fs.existsSync(pagesDir)) {
        return null;
      }
      const { baseUrl } = siteConfig;
      const pagesFiles = await globby(include, {
        cwd: pagesDir,
        // ignore: options.exclude,
      });
      function toMetadata(relativeSource) {
        const source = path.join(pagesDir, relativeSource);
        // const aliasedSourcePath = aliasedSitePath(source, siteDir);
        const pathName = encodePath(fileToPath(relativeSource));
        const routeprefix = (baseUrl || '') + (options.route || '')
        const permalink = pathName.replace(
          /^\//,
          routeprefix
        );
        let linkurl = permalink
        if (linkurl.endsWith('/index.html')) {
          linkurl = linkurl.substring(0, linkurl.length - 10)
        }
        const start = `${routeprefix}master`
        if (linkurl.startsWith(start)) {
          linkurl = routeprefix + linkurl.substring(start.length + 1)
        }
        if (isHTML(relativeSource)) {
          return {
            permalink: linkurl,
            source, //: aliasedSourcePath,
          };
        }
      }
      return pagesFiles.map(toMetadata);
    },
    async contentLoaded({ content, actions }) {
      if (!content) {
        return;
      }

      const { addRoute, createData } = actions;
      await Promise.all(
        content.map(async (metadata) => {
          const { permalink, source } = metadata;
          const html = fs.readFileSync(metadata.source).toString('utf8');
          const $ = cheerio.load(html);
          const __content = await createData(
            `${docuHash(metadata.source)}.content.json`,
            JSON.stringify($('.autoapi-container').html(), null, 2),
          );
          const __title = await createData(
            `${docuHash(metadata.source)}.title.json`,
            JSON.stringify($('head > title').text(), null, 2),
          );
          // let linkurl = permalink
          // if (linkurl.endsWith('/index.html')) {
          //   linkurl = linkurl.substr(0, linkurl.length - 11)
          // }

          // if (linkurl.startsWith('/api/autoapi')) {
          //   linkurl = '/api' + linkurl.substr(12)
          // }
          // console.log(linkurl)
          addRoute({
            path: permalink,
            component: '@site/src/components/Autoapi/index.js',
            exact: true,
            modules: {
              __content,
              __title,
            },
          });
        })
      );
    },
  };
};