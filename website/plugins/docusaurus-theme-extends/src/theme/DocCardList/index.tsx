/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import DocCard from '@theme/DocCard';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

export default function DocCardList({
  items,
}: {
  items: PropSidebarItem[];
}): JSX.Element {
  return (
    <div className="pt-8">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <article>
            <DocCard item={item} />
          </article>
          {index + 1 < items.length && (
            <div className="h-4 border-l border-grey-3 ml-2"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
