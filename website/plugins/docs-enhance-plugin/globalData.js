/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {mapValues} =  require('lodash');
const {normalizeUrl} =  require('@docusaurus/utils');
const {createSidebarsUtils} = require('./utils');

function toGlobalDataDoc(doc) {
  return {
    id: doc.unversionedId,
    path: doc.permalink,
    frontMatter: doc.frontMatter,
    sidebar: doc.sidebar,
  };
}

function toGlobalDataGeneratedIndex(
  doc,
) {
  return {
    id: doc.slug,
    path: doc.permalink,
    sidebar: doc.sidebar,
  };
}

function toGlobalSidebars(
  sidebars,
  version,
) {
  const {getFirstLink} = createSidebarsUtils(sidebars);
  return mapValues(sidebars, (sidebar, sidebarId) => {
    const firstLink = getFirstLink(sidebarId);
    if (!firstLink) {
      return {};
    }
    return {
      link: {
        path:
          firstLink.type === 'generated-index'
            ? normalizeUrl([version.versionPath, firstLink.slug])
            : version.docs.find(
                (doc) =>
                  doc.id === firstLink.id || doc.unversionedId === firstLink.id,
              ).permalink,
        label: firstLink.label,
      },
    };
  });
}

function toGlobalDataVersion(version) {
  return {
    name: version.versionName,
    label: version.versionLabel,
    isLast: version.isLast,
    path: version.versionPath,
    mainDocId: version.mainDocId,
    docs: version.docs
      .map(toGlobalDataDoc)
      .concat(version.categoryGeneratedIndices.map(toGlobalDataGeneratedIndex)),
    sidebars: toGlobalSidebars(version.sidebars, version),
  };
}

module.exports = {
  toGlobalDataVersion
}
