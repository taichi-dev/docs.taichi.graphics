/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {mapValues, difference, uniq} = require('lodash');
const {getElementsAround, toMessageRelativeFilePath} = require('@docusaurus/utils');

// Flatten sidebar items into a single flat array (containing categories/docs on the same level)
// /!\ order matters (useful for next/prev nav), top categories appear before their child elements
function flattenSidebarItems(items) {
  function flattenRecursive(item) {
    return item.type === 'category'
      ? [item, ...item.items.flatMap(flattenRecursive)]
      : [item];
  }
  return items.flatMap(flattenRecursive);
}

// /!\ docId order matters for navigation!
function collectSidebarDocIds(sidebar) {
  return flattenSidebarItems(sidebar).flatMap((item) => {
    if (item.type === 'category') {
      return item.link?.type === 'doc' ? [item.link.id] : [];
    }
    if (item.type === 'doc') {
      return [item.id];
    }
    return [];
  });
}

function collectSidebarNavigation(
  sidebar,
) {
  return flattenSidebarItems(sidebar).flatMap((item) => {
    if (item.type === 'category' && item.link) {
      return [item];
    }
    if (item.type === 'doc') {
      return [item];
    }
    return [];
  });
}

function collectSidebarsDocIds(
  sidebars,
) {
  return mapValues(sidebars, collectSidebarDocIds);
}

function collectSidebarsNavigations(
  sidebars,
) {
  return mapValues(sidebars, collectSidebarNavigation);
}

function createSidebarsUtils(sidebars) {
  const sidebarNameToDocIds = collectSidebarsDocIds(sidebars);
  const sidebarNameToNavigationItems = collectSidebarsNavigations(sidebars);

  // Reverse mapping
  const docIdToSidebarName = Object.fromEntries(
    Object.entries(sidebarNameToDocIds).flatMap(([sidebarName, docIds]) =>
      docIds.map((docId) => [docId, sidebarName]),
    ),
  );

  function getFirstDocIdOfFirstSidebar() {
    return Object.values(sidebarNameToDocIds)[0]?.[0];
  }

  function getSidebarNameByDocId(docId) {
    return docIdToSidebarName[docId];
  }

  function emptySidebarNavigation() {
    return {
      sidebarName: undefined,
      previous: undefined,
      next: undefined,
    };
  }

  function getDocNavigation(
    unversionedId,
    versionedId,
    displayedSidebar,
  ) {
    // TODO legacy id retro-compatibility!
    let docId = unversionedId;
    let sidebarName =
      displayedSidebar === undefined
        ? getSidebarNameByDocId(docId)
        : displayedSidebar;
    if (sidebarName === undefined) {
      docId = versionedId;
      sidebarName = getSidebarNameByDocId(docId);
    }

    if (sidebarName) {
      if (!sidebarNameToNavigationItems[sidebarName]) {
        throw new Error(
          `Doc with ID ${docId} wants to display sidebar ${sidebarName} but a sidebar with this name doesn't exist`,
        );
      }
      const navigationItems = sidebarNameToNavigationItems[sidebarName];
      const currentItemIndex = navigationItems.findIndex((item) => {
        if (item.type === 'doc') {
          return item.id === docId;
        }
        if (item.type === 'category' && item.link.type === 'doc') {
          return item.link.id === docId;
        }
        return false;
      });
      if (currentItemIndex === -1) {
        return {sidebarName, next: undefined, previous: undefined};
      }

      const {previous, next} = getElementsAround(
        navigationItems,
        currentItemIndex,
      );
      return {sidebarName, previous, next};
    } else {
      return emptySidebarNavigation();
    }
  }

  function getCategoryGeneratedIndexList() {
    return Object.values(sidebarNameToNavigationItems)
      .flat()
      .flatMap((item) => {
        if (item.type === 'category' && item.link.type === 'generated-index') {
          return [item];
        }
        return [];
      });
  }

  // We identity the category generated index by its permalink (should be unique)
  // More reliable than using object identity
  function getCategoryGeneratedIndexNavigation(
    categoryGeneratedIndexPermalink,
  ) {
    function isCurrentCategoryGeneratedIndexItem(
      item,
    ) {
      return (
        item.type === 'category' &&
        item.link?.type === 'generated-index' &&
        item.link.permalink === categoryGeneratedIndexPermalink
      );
    }

    const sidebarName = Object.entries(sidebarNameToNavigationItems).find(
      ([, navigationItems]) =>
        navigationItems.find(isCurrentCategoryGeneratedIndexItem),
    )?.[0];

    if (sidebarName) {
      const navigationItems = sidebarNameToNavigationItems[sidebarName];
      const currentItemIndex = navigationItems.findIndex(
        isCurrentCategoryGeneratedIndexItem,
      );
      const {previous, next} = getElementsAround(
        navigationItems,
        currentItemIndex,
      );
      return {sidebarName, previous, next};
    } else {
      return emptySidebarNavigation();
    }
  }

  function checkSidebarsDocIds(validDocIds, sidebarFilePath) {
    const allSidebarDocIds = Object.values(sidebarNameToDocIds).flat();
    const invalidSidebarDocIds = difference(allSidebarDocIds, validDocIds);
    if (invalidSidebarDocIds.length > 0) {
      throw new Error(
        `Invalid sidebar file at "${toMessageRelativeFilePath(
          sidebarFilePath,
        )}".
These sidebar document ids do not exist:
- ${invalidSidebarDocIds.sort().join('\n- ')}

Available document ids are:
- ${uniq(validDocIds).sort().join('\n- ')}`,
      );
    }
  }

  function getFirstLink(sidebar) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of sidebar) {
      if (item.type === 'doc') {
        return {
          type: 'doc',
          id: item.id,
          label: item.label ?? item.id,
        };
      } else if (item.type === 'category') {
        if (item.link?.type === 'doc') {
          return {
            type: 'doc',
            id: item.link.id,
            label: item.label,
          };
        } else if (item.link?.type === 'generated-index') {
          return {
            type: 'generated-index',
            slug: item.link.slug,
            label: item.label,
          };
        } else {
          const firstSubItem = getFirstLink(item.items);
          if (firstSubItem) {
            return firstSubItem;
          }
        }
      }
    }
    return undefined;
  }

  return {
    sidebars,
    getFirstDocIdOfFirstSidebar,
    getSidebarNameByDocId,
    getDocNavigation,
    getCategoryGeneratedIndexList,
    getCategoryGeneratedIndexNavigation,
    checkSidebarsDocIds,
    getFirstLink: (id) => getFirstLink(sidebars[id]),
  };
}


module.exports = {
  createSidebarsUtils
}
