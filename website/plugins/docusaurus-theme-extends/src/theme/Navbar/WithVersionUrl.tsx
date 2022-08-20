import React from 'react';

import clsx from 'clsx';

import { useDocsPreferredVersion } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { useGlobalActiveVersion } from '../NavbarItem/useApiContext';
import { useLocation } from '@docusaurus/router';

interface Props {
  href: string;
  label: string | React.ReactNode;
  className?: string;
  matchPath?: string;
  isExternal?: boolean
}

const useVersionUrl = (toUrl) => {
  const { preferredVersion } = useDocsPreferredVersion();

  const {
    i18n: { defaultLocale, currentLocale },
  } = useDocusaurusContext();

  const activeVersion = useGlobalActiveVersion();

  let withlocalurl = toUrl;
  if (defaultLocale !== currentLocale) {
    withlocalurl = '/' + currentLocale + toUrl;
  }

  const currentVersion = activeVersion || preferredVersion;
  let vernsionpath = currentVersion?.isLast ? '' : currentVersion?.name || '';

  if (!withlocalurl || vernsionpath === '') return withlocalurl;
  if (toUrl.startsWith('/api')) {
    vernsionpath = vernsionpath === 'current' ? 'master' : vernsionpath;
  }
  const hasEndingSlash = withlocalurl[withlocalurl.length - 1] === '/';
  return (
    (hasEndingSlash ? withlocalurl : withlocalurl + '/') + vernsionpath + '/'
  );
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

export function NavLink({ href, label, matchPath, className, isExternal }: Props) {
  const { pathname } = useLocation();
  return (
    <a
      className={clsx(
        matchPath && pathname.startsWith(matchPath) ? 'text-brand-cyan' : '',
        className
      )}
      href={href}
      target={isExternal ? '_blank' : undefined}
    >
      {label}
    </a>
  );
}

export function WithLocalLink({
  href,
  label,
  className,
  matchPath,
  isExternal
}: {
  href: string;
  label: string | React.ReactNode;
  className?: string;
  matchPath?: string;
  isExternal?: boolean
}) {
  const {
    i18n: { defaultLocale, currentLocale },
  } = useDocusaurusContext();
  if (defaultLocale !== currentLocale && !isExternal) href = '/' + currentLocale + href;
  return (
    <NavLink
      className={className}
      href={href}
      label={label}
      matchPath={matchPath}
      isExternal={isExternal}
    />
  );
}
