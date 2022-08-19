/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useMemo} from 'react';
import type {TOCItemsProps} from '@theme/TOCItems';
import type {TOCItem} from '@docusaurus/types';
import {
  type TOCHighlightConfig,
  useThemeConfig,
  useTOCFilter,
  // useTOCHighlight,
} from '@docusaurus/theme-common';

import clsx from 'clsx';

import styles from './style.module.css'

import useTOCHighlight from './useTOCHighlight'

// Recursive component rendering the toc tree
/* eslint-disable jsx-a11y/control-has-associated-label */
function TOCItemList({
  toc,
  className,
  linkClassName,
  isChild,
}: {
  readonly toc: readonly TOCItem[];
  readonly className: string;
  readonly linkClassName: string | null;
  readonly isChild?: boolean;
}): JSX.Element | null {
  if (!toc.length) {
    return null;
  }
  return (
    <ul className={isChild ? '' : className}>
      {toc.map((heading) => (
        <li key={heading.id} className={clsx('border-l pl-2 m-0', isChild ? 'pl-2 ml-2' : 'pl-4')}>
          <a
            href={`#${heading.id}`}
            className={clsx('text-caption', linkClassName ?? undefined)}
            // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: heading.value}}
          />
          <TOCItemList
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
    </ul>
  );
}

export default function TOCItems({
  toc,
  className = '',
  linkClassName = 'table-of-contents__link',
  linkActiveClassName = undefined,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}: TOCItemsProps): JSX.Element | null {
  const themeConfig = useThemeConfig();

  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;

  const tocFiltered = useTOCFilter({toc, minHeadingLevel, maxHeadingLevel});

  const tocHighlightConfig: TOCHighlightConfig | undefined = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }
    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);
  useTOCHighlight(tocHighlightConfig);

  return (
    <TOCItemList
      toc={tocFiltered}
      className={className}
      linkClassName={linkClassName}
      {...props}
    />
  );
}
