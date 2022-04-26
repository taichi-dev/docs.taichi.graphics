const path = require('path');
const fs = require('fs');
const globby = require('globby');
const cheerio = require('cheerio');
const _ = require('lodash');

const {
  encodePath,
  fileToPath,
  docuHash,
  normalizeUrl,
} = require('@docusaurus/utils');

const isHTML = (source) => source.endsWith('.html');

module.exports = function (context, options) {
  const { siteConfig, siteDir, generatedFilesDir } = context;
  // const allVersionNames = await readVersionNames(context.siteDir, options);
  const contentPath = path.resolve(siteDir, options.path);
  return {
    name: 'autoapi-plugin',
    async loadContent() {
      const { include, allowVersions, current } = options;
      const versions = [current, ...allowVersions];

      const defaultVersion = allowVersions[0];
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
        let version = 'current'
        let id = linkurl
        let found = false
        for (const item of versions) {
          const start = `${routeprefix}${item}`
          if (linkurl.startsWith(start)) {
            version = item
            id = linkurl.substring(start.length + 1)
            found = true;
            break
          }
        }
        if (!found) return false
        const start = `${routeprefix}${defaultVersion}`
        if (linkurl.startsWith(start)) {
          linkurl = routeprefix + linkurl.substring(start.length + 1)
        }
        if (isHTML(relativeSource)) {
          return {
            id: id,
            path: linkurl,
            source, //: aliasedSourcePath,
            version: version === current ? 'current' : version,
          };
        }
      }
      const pages = pagesFiles.map(toMetadata).filter(Boolean);
      const groupversions = _.groupBy(pages, function(item){
        return item.version
      })
      return Object.keys(groupversions).map(function(key){
        let version = key
        if (version === 'current') {
          version = current
        }
        return {
          docs: groupversions[key],
          name: key,
          label: key,
          isLast: key === defaultVersion,
          path: key === defaultVersion ? normalizeUrl([baseUrl, options.route]) : normalizeUrl([baseUrl, options.route, version])
        }
      })
    },
    async contentLoaded({ content, actions }) {
      if (!content) {
        return;
      }

      const { addRoute, createData, setGlobalData } = actions;
      await Promise.all(
        _.flatten(content.map((item) => item.docs.map(async (metadata) => {
          const { path } = metadata;
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

          const __version = await createData(
            `${docuHash(metadata.version)}.version.json`,
            JSON.stringify(metadata.version, null, 2),
          )

          addRoute({
            path: path,
            component: '@site/src/components/Autoapi/index.js',
            exact: true,
            modules: {
              __content,
              __title,
              __version,
            },
          });
        })
      )));

      setGlobalData({
        path: normalizeUrl([siteConfig.baseUrl, options.route]),
        versions: content,
      })
    },
  };
};