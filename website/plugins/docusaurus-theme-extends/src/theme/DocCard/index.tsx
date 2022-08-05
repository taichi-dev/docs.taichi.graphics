/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';
import type {Props} from '@theme/DocCard';
import {findFirstCategoryLink, useDocById} from '@docusaurus/theme-common';
import {
  useActiveVersion
} from '@docusaurus/plugin-content-docs/client';
import clsx from 'clsx';
import styles from './styles.module.css';
import isInternalUrl from '@docusaurus/isInternalUrl';

function CardContainer({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}): JSX.Element {
  const className = clsx(
    'card margin-bottom--lg padding--lg',
    styles.cardContainer,
    href && styles.cardContainerLink,
  );
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}

function CardLayout({
  href,
  icon,
  title,
  description,
  tags,
}: {
  href?: string;
  icon: ReactNode;
  title: string;
  description?: string;
  tags?: string[];
}): JSX.Element {
  return (
    <CardContainer href={href}>
      <h2 className={clsx('text--truncate', styles.cardTitle)} title={title}>
        {icon} {title}
      </h2>
      <div
        className={clsx('text--truncate', styles.cardDescription)}
        title={description}>
        {description}
      </div>
      <div>{tags?.map((tag) => <span>{tag}</span>)}</div>
    </CardContainer>
  );
}

function CardCategory({item}: {item: PropSidebarItemCategory}): JSX.Element {
  const href = findFirstCategoryLink(item);
  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      description={`${item.items.length} items`}
    />
  );
}

function CardLink({item}: {item: PropSidebarItemLink}): JSX.Element {
  const icon = isInternalUrl(item.href) ? '📄️' : '🔗';
  const doc = useDocById(item.docId ?? undefined);
  const version = useActiveVersion()
  const vd = version?.docs.find((d) => d.id === item.docId)
  const tags = vd?.frontMatter?.keywords?.filter((item) => item === 'developer' || item === 'normal user')
  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={doc?.description}
      tags={tags}
    />
  );
}

export default function DocCard({item}: Props): JSX.Element {
  console.log(item)
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
