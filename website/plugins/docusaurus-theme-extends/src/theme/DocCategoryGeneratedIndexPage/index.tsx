/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import Seo from '@theme/Seo';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

export default function DocCategoryGeneratedIndexPage({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  const category = useCurrentSidebarCategory();
  return (
    <>
      <Seo
        title={categoryGeneratedIndex.title}
        description={categoryGeneratedIndex.description}
        keywords={categoryGeneratedIndex.keywords}
        // TODO `require` this?
        image={useBaseUrl(categoryGeneratedIndex.image)}
      />
      <div className={styles.generatedIndexPage}>
        <DocVersionBanner />
        <DocVersionBadge />
        <header className='border-b border-grey-3 pb-8'>
          <Heading as="h1" className={styles.title}>
            {categoryGeneratedIndex.title}
          </Heading>
          {categoryGeneratedIndex.description && (
            <p>{categoryGeneratedIndex.description}</p>
          )}
          <div className='flex items-center mt-8'>
            <a href={category.items[0].href} className='hover:text-white py-2 bg-brand-cyan rounded-sm text-white flex justify-center items-center w-40'>Start</a>
            <span className='ml-5 text-brand-blue'>{category.items.length} Tutorials</span>
          </div>
        </header>
        <main>
          <DocCardList items={category.items} />
        </main>
      </div>
    </>
  );
}
