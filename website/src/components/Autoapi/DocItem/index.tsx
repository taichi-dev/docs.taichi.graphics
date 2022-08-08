/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import TOC from '@theme/TOC';
import TOCCollapsible from '@theme/TOCCollapsible';
import styles from './styles.module.css';
import {ThemeClassNames, useWindowSize} from '@docusaurus/theme-common';

export default function DocItem(props :{ content: JSX.Element, tocs: any }): JSX.Element {
  const {content, tocs} = props;

  const windowSize = useWindowSize();

  const canRenderTOC = tocs && tocs.length > 0;

  const renderTocDesktop =
    canRenderTOC && (windowSize === 'desktop' || windowSize === 'ssr');

  return (
    <>
      <div className="row">
        <div
          className={clsx('col', {
            [styles.docItemCol]: true,
          })}>
          <div className={styles.docItemContainer}>
            <article>
              {canRenderTOC && (
                <TOCCollapsible
                  toc={tocs}
                  minHeadingLevel={0}
                  className={clsx(
                    ThemeClassNames.docs.docTocMobile,
                    styles.tocMobile,
                  )}
                />
              )}

              <div
                className={'autoapi-container markdown'}>
                {content}
              </div>
            </article>
          </div>
        </div>
        {renderTocDesktop && (
          <div className="col col--3">
            <TOC
              toc={tocs}
              minHeadingLevel={0}
              className={ThemeClassNames.docs.docTocDesktop}
            />
          </div>
        )}
      </div>
    </>
  );
}
