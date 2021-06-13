/**
 * This script implements the versioning functionality
 * for the taichi.graphics website which is built with
 * Vuepress that lacks of native versioning support as
 * of today (10/03/2020). The implementation is mainly
 * inspired by the following projects:
 *
 * - The Lighthouse Website (https://github.com/nuwave/lighthouse/tree/master/docs)
 * - Docusaurus V1 (https://docusaurus.io/)
 * - The Titanium Docs DevKit (https://github.com/appcelerator/docs-devkit)
 *
 * Since this script only implements the minimal functionalities
 * to make documentation versioning work with a focus on taichi's
 * own website, please don't rely on this for your complex production
 * projects.
 *
 * This script may be changed or deprecated without further
 * notice, depends on if we can find a better alternative.
 *
 * This script does not support Vuepress's hot-reload
 *
 * @author taichi-dev
 * @since  2020
 *
 * TODOs:
 * - this script has a lot of duplciated code and hard-coded values
 *   in order to support both versioning and i18n need to make it
 *   more sophisticated and less DRY.
 * - the i18n switch with versioning is not perfectly smooth yet,
 *   it can jump back and forth if users decide to:
 *     - switch lang while reading a specific version
 *     - swithc versions on a non-EN lang
 *   this needs to be fixed along with the vuepress i18n support, which
 *   can be difficult.
 */

// This script assumes there's a versions.json exists
// in `.vuepress/versions.json` that contains an array
// all available versions
const versions = require("../versions.json");
const fse = require("fs-extra");
const thisPath = process.cwd();

module.exports = {
  versions: {
    get latest() {
      // get the latest stable release which is the first
      // version besides "develop", aka, latest released version
      // should be either an available version or fallback to
      // "develop" if the verions[1"] is an undefined"
      return versions[1] || "develop";
    },
    get all() {
      // get all of the available versions
      // TODO: only include the most recent 10 or X
      // versions to speed up the build and
      // develop build time
      return versions;
    },
  },

  // get and update the sidebar file for each version
  sidebarsFor(locale) {
    let sidebars = {};
    switch (locale) {
      case "en":
        versions.forEach((version) => {
          let sidebar = require(`../../docs/${version}/sidebar.js`);
          sidebars[`/docs/${version}/documentation/`] = sidebar;
        });
      case "zh":
        versions.forEach((version) => {
          let sidebar = require(`../../zh/docs/${version}/sidebar.js`);
          sidebars[`/zh/docs/${version}/documentation/`] = sidebar;
        });
      default:
        versions.forEach((version) => {
          let sidebar = require(`../../docs/${version}/sidebar.js`);
          sidebars[`/docs/${version}/documentation/`] = sidebar;
        });
    }
    return sidebars;
  },

  linksFor(url, locale) {
    let dropDownMenu = [];
    versions.forEach((version) => {
      let dropDownItem = {
        text: version,
        link: `/docs/${version}/${url}`,
      };
      dropDownMenu.push(dropDownItem);
    });
    return dropDownMenu;
  },

  // main entrypoint
  main(version) {
    // version can either be passed as argument to the function
    // or as the first of the command line arugments
    version = version || process.argv[1];
    console.log("\n");

    if (!fse.existsSync(`${thisPath}/.vuepress/versions.json`)) {
      this.error(
        "Cannot find the required version file '.vuepress/versions.json'!"
      );
    }

    if (typeof version === "undefined") {
      this.error(
        "No version number specified! \n Please pass in a version, e.g. 1.3"
      );
    }

    if (versions.includes(version)) {
      this.error(
        `This version "${version}" already exists! Specify a version greater than "${versions[1]}"!`
      );
    }

    this.info(
      `Generating version ${version} into 'docs/(locale)/${version}' ... \n`
    );

    try {
      // [i18n-EN]: copy all from the develop docs to the newly created verion dir
      fse.copySync(`${thisPath}/docs/develop`, `${thisPath}/docs/${version}`);

      // [i18n-ZH]: copy all from the develop docs to the newly created verion dir
      fse.copySync(
        `${thisPath}/zh/docs/develop`,
        `${thisPath}/zh/docs/${version}`
      );

      // [i18n - other ...] to be added ...

      // pop "develop" from the versions stack
      versions.shift();

      // push the new version into versions
      versions.unshift(version);

      // push back the "develop"
      versions.unshift("develop");

      fse.writeFileSync(
        `${thisPath}/.vuepress/versions.json`,
        `${JSON.stringify(versions, null, 2)}\n`
      );

      this.success(`Version '${version}' has been created!`);
    } catch (err) {
      this.error(err);
    }
  },

  error(msg) {
    console.log("\033[1;91mERROR: ", msg);
  },
  info(msg) {
    console.log("\033[1;90mINFO: ", msg);
  },
  success(msg) {
    console.log("\033[1;92mSUCCESS: ", msg);
  },
};
