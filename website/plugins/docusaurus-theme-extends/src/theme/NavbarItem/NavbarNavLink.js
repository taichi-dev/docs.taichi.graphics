/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import IconExternalLink from '@theme/IconExternalLink';
import isInternalUrl from '@docusaurus/isInternalUrl';

import { useGlobalActiveVersion } from './useApiContext';

import {isRegexpStringMatch, useDocsPreferredVersion} from '@docusaurus/theme-common';
const dropdownLinkActiveClass = 'dropdown__link--active';

const useVersionUrl = (docsPluginId, toUrl) => {
  const {preferredVersion} =
    useDocsPreferredVersion(docsPluginId);

  const activeVersion = useGlobalActiveVersion(docsPluginId)

  const currentVersion = activeVersion || preferredVersion

  const vernsionpath = currentVersion?.isLast ? '' : (currentVersion?.name || '')
  if (!toUrl) return toUrl
  const tmp = toUrl.replace(/{{([\s\S]+?)}}/g, (match, escapeValue) => {
    if (escapeValue && escapeValue.trim() === 'version') {
      escapeValue = escapeValue.substring(4)
      return vernsionpath === 'current' ? 'master': vernsionpath
    }
    return match
  })

  const hasEndingSlash = tmp[tmp.length - 1] === '/'
  return hasEndingSlash ? tmp : tmp + '/'
}

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  docsPluginId,
  to,
  href,
  label,
  activeClassName = '',
  prependBaseUrlToHref,
  ...props
}) {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  const toUrl = useBaseUrl(to);
  const withversionurl = useVersionUrl(docsPluginId, toUrl)
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  const isExternalLink = label && href && !isInternalUrl(href);
  const isDropdownLink = activeClassName === dropdownLinkActiveClass;
  return (
    <Link
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            isNavLink: true,
            activeClassName: !props.className?.includes(activeClassName)
              ? activeClassName
              : '',
            to: withversionurl,
            ...(activeBasePath || activeBaseRegex
              ? {
                  isActive: (_match, location) =>
                    activeBaseRegex
                      ? isRegexpStringMatch(activeBaseRegex, location.pathname)
                      : location.pathname.startsWith(activeBaseUrl),
                }
              : null),
          })}
      {...props}>
      {isExternalLink ? (
        <span>
          {label}
          <IconExternalLink
            {...(isDropdownLink && {
              width: 12,
              height: 12,
            })}
          />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}
