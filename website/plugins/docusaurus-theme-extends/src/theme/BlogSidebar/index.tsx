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
import Translate, {translate} from '@docusaurus/Translate';
import { useBlogTags } from '../../utils/blogData';

import Tag from '@theme/Tag';

export default function BlogSidebar({sidebar}: Props): JSX.Element | null {
  if (sidebar.items.length === 0) {
    return null;
  }
  const { blogTags } = useBlogTags()
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
        <Translate
          id="theme.blog.post.allTags"
          description="The label used in blog post item excerpts to link to full blog posts">
          All Tags
        </Translate>
      </div>
      <ul className={styles.sidebarItemList}>
        {Object.keys(blogTags).map((item) => (
          <li key={item} className={styles.tag}>
            <Tag {...blogTags[item]} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
