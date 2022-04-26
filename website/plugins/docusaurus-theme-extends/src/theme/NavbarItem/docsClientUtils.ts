/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {matchPath} from '@docusaurus/router';

import type {
  GlobalPluginData,
  GlobalVersion,
  GlobalDoc,
  ActiveDocContext,
  DocVersionSuggestions,
} from '@docusaurus/plugin-content-docs/client';

export const getLatestVersion = (data: GlobalPluginData): GlobalVersion =>
  data.versions.find((version) => version.isLast)!;

export function getActiveVersion(
  data: GlobalPluginData,
  pathname: string,
): GlobalVersion | undefined {
  const lastVersion = getLatestVersion(data);
  // Last version is a route like /docs/*,
  // we need to match it last or it would match /docs/version-1.0/* as well
  const orderedVersionsMetadata = [
    ...data.versions.filter((version) => version !== lastVersion),
    lastVersion,
  ];

  return orderedVersionsMetadata.find(
    (version) =>
      !!matchPath(pathname, {
        path: version.path,
        exact: false,
        strict: false,
      }),
  );
}

export function getActiveDocContext(
  data: GlobalPluginData,
  pathname: string,
): ActiveDocContext {
  const activeVersion = getActiveVersion(data, pathname);

  const activeDoc = activeVersion?.docs.find(
    (doc) =>
      !!matchPath(pathname, {
        path: doc.path,
        exact: true,
        strict: false,
      }),
  );

  function getAlternateVersionDocs(
    docId: string,
  ): ActiveDocContext['alternateDocVersions'] {
    const result: ActiveDocContext['alternateDocVersions'] = {};
    data.versions.forEach((version) => {
      version.docs.forEach((doc) => {
        if (doc.id === docId) {
          result[version.name] = doc;
        }
      });
    });
    return result;
  }

  const alternateVersionDocs = activeDoc
    ? getAlternateVersionDocs(activeDoc.id)
    : {};

  return {
    activeVersion,
    activeDoc,
    alternateDocVersions: alternateVersionDocs,
  };
}

export function getDocVersionSuggestions(
  data: GlobalPluginData,
  pathname: string,
): DocVersionSuggestions {
  const latestVersion = getLatestVersion(data);
  const activeDocContext = getActiveDocContext(data, pathname);
  const latestDocSuggestion: GlobalDoc | undefined =
    activeDocContext?.alternateDocVersions[latestVersion.name];
  return {latestDocSuggestion, latestVersionSuggestion: latestVersion};
}
