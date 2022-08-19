import React from 'react';

import clsx from 'clsx';

import { useDocsPreferredVersion } from '@docusaurus/theme-common';

import { useGlobalActiveVersion } from '../NavbarItem/useApiContext';
import { useLocation } from '@docusaurus/router';

const useVersionUrl = (toUrl) => {
  const { preferredVersion } = useDocsPreferredVersion();

  const activeVersion = useGlobalActiveVersion();

  const currentVersion = activeVersion || preferredVersion;
  let vernsionpath = currentVersion?.isLast ? '' : (currentVersion?.name || '');

  if (!toUrl || vernsionpath === '') return toUrl;
  if (toUrl.startsWith('/api')) {
    vernsionpath = vernsionpath === 'current' ? 'master': vernsionpath
  }
  const hasEndingSlash = toUrl[toUrl.length - 1] === '/'
  return (hasEndingSlash ? toUrl : toUrl + '/') + vernsionpath + '/';
};


export function WithVersionLink({ href, label, matchPath, className }: Props) {
  const url = useVersionUrl(href);
  return (
    <NavLink
      className={className}
      href={url}
      label={label}
      matchPath={matchPath}
    />
  );
}

export function NavLink({ href, label, matchPath, className }: Props) {
  const { pathname } = useLocation();
  return (
    <a
      className={clsx(
        className,
        pathname.startsWith(matchPath) ? 'text-brand-cyan' : 'text-grey-4'
      )}
      href={href}
    >
      {label}
    </a>
  );
}
