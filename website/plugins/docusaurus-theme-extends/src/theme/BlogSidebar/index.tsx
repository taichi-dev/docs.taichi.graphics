/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/BlogSidebar';
import styles from './styles.module.css';
import {translate} from '@docusaurus/Translate';
import { useBlogTags } from '../../utils/blogData';

import { useLocation } from '@docusaurus/router';

export default function BlogSidebar({sidebar}: Props): JSX.Element | null {
  const {pathname} = useLocation()

  const { blogTags } = useBlogTags()

  if (sidebar.items.length === 0) {
    return null;
  }
  return (
    <nav
      className={clsx(styles.sidebar, 'thin-scrollbar')}
      aria-label={translate({
        id: 'theme.blog.sidebar.navAriaLabel',
        message: 'Blog recent posts navigation',
        description: 'The ARIA label for recent posts in the blog sidebar',
      })}>
      <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
        {sidebar.title}
      </div>
      <ul className={styles.sidebarItemList}>
        {sidebar.items.map((item) => (
          <li key={item.permalink} className={styles.sidebarItem}>
            <Link
              isNavLink
              to={item.permalink}
              className={styles.sidebarItemLink}
              activeClassName={styles.sidebarItemLinkActive}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
        All Tags
      </div>
      <ul className={styles.sidebarItemList}>
        {Object.keys(blogTags).map((item) => {
          const { name, permalink } = blogTags[item]
          const active = pathname == permalink
          return (
          <li key={item} className={clsx(styles.tagContainer)}>
            <Link
              href={active ? '/blog/' : permalink}
              className={clsx(styles.tag, styles.tagRegular, active ? styles.tagactive : '')}>
              {name}
            </Link>
          </li>
        )})}
      </ul>
    </nav>
  );
}
