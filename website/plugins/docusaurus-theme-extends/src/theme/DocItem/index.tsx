/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import Seo from '@theme/Seo';
import type {Props} from '@theme/DocItem';
import DocItemFooter from '@theme/DocItemFooter';
import TOC from '@theme/TOC';
import TOCCollapsible from '@theme/TOCCollapsible';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {ThemeClassNames, useWindowSize, useColorMode} from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Giscus from '@giscus/react';

export default function DocItem(props: Props): JSX.Element {
  const { isDarkTheme } = useColorMode()
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();

  const {content: DocContent} = props;
  const {metadata, frontMatter} = DocContent;
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  const {description, title} = metadata;

  // We only add a title if:
  // - user asks to hide it with front matter
  // - the markdown content does not already contain a top-level h1 heading
  const shouldAddTitle =
    !hideTitle && typeof DocContent.contentTitle === 'undefined';

  const windowSize = useWindowSize();

  const canRenderTOC =
    !hideTableOfContents && DocContent.toc && DocContent.toc.length > 0;

  const renderTocDesktop =
    canRenderTOC && (windowSize === 'desktop' || windowSize === 'ssr');

  return (
    <>
      <Seo {...{title, description, keywords, image}} />

      <div className="row">
        <div
          className={clsx('col', {
            [styles.docItemCol]: !hideTableOfContents,
          })}>
          <DocVersionBanner />
          <div className={styles.docItemContainer}>
            <article>
              <DocVersionBadge />

              {canRenderTOC && (
                <TOCCollapsible
                  toc={DocContent.toc}
                  minHeadingLevel={tocMinHeadingLevel}
                  maxHeadingLevel={tocMaxHeadingLevel}
                  className={clsx(
                    ThemeClassNames.docs.docTocMobile,
                    styles.tocMobile,
                  )}
                />
              )}

              <div
                className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
                {/*
                Title can be declared inside md content or declared through front matter and added manually
                To make both cases consistent, the added title is added under the same div.markdown block
                See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120
                */}
                {shouldAddTitle && (
                  <header>
                    <Heading as="h1">{title}</Heading>
                  </header>
                )}

                <DocContent />
              </div>

              <DocItemFooter {...props} />
            </article>
            <BrowserOnly>
              {() => {
                const locale = currentLocale === 'zh-Hans' ? 'zh-CN' : ( currentLocale === 'fr-FR' ? 'fr' : 'en')
                return <Giscus
                  id="comments"
                  repo="taichi-dev/taichi"
                  repoId="MDEwOlJlcG9zaXRvcnk3NDY2MDY0Mg=="
                  category="Docs"
                  categoryId="DIC_kwDOBHM7Is4CQSXX"
                  mapping="title"
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="top"
                  theme={isDarkTheme ? 'dark' : 'light'}
                  lang={locale}
                  loading="lazy"
                />
              }}
            </BrowserOnly>
          </div>
        </div>
        {renderTocDesktop && (
          <div className="col col--3">
            <TOC
              toc={DocContent.toc}
              minHeadingLevel={tocMinHeadingLevel}
              maxHeadingLevel={tocMaxHeadingLevel}
              className={ThemeClassNames.docs.docTocDesktop}
            />
          </div>
        )}
      </div>
    </>
  );
}
