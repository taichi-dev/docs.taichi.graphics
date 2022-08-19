import React, { useState, useCallback } from 'react';

import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';

import BackToTopButton from '@theme/BackToTopButton';
import DocSidebar from '@theme/DocSidebar';

import IconArrow from '@theme/IconArrow';

import type {PropSidebarItem} from '@docusaurus/plugin-content-docs';

import {
  ThemeClassNames
} from '@docusaurus/theme-common';

import styles from './styles.module.css'

interface Props {
  sidebar: PropSidebarItem[]
  children: React.ReactNode
}

export default function ({ sidebar, children } :Props) {
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar]);
  return (
    <div className={styles.docPage}>
        <BackToTopButton />
        {sidebar && (
          <aside
          className={clsx(
            ThemeClassNames.docs.docSidebarContainer,
            styles.docSidebarContainer,
            {
              [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
            },
          )}
          onTransitionEnd={(e) => {
            if (
              !e.currentTarget.classList.contains(styles.docSidebarContainer)
            ) {
              return;
            }

            if (hiddenSidebarContainer) {
              setHiddenSidebar(true);
            }
          }}>
            <DocSidebar
              path=''
              sidebar={sidebar}
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
            />
            {hiddenSidebar && (
              <div
                className={styles.collapsedDocSidebar}
                title={translate({
                  id: 'theme.docs.sidebar.expandButtonTitle',
                  message: 'Expand sidebar',
                  description:
                    'The ARIA label and title attribute for expand button of doc sidebar',
                })}
                aria-label={translate({
                  id: 'theme.docs.sidebar.expandButtonAriaLabel',
                  message: 'Expand sidebar',
                  description:
                    'The ARIA label and title attribute for expand button of doc sidebar',
                })}
                tabIndex={0}
                role="button"
                onKeyDown={toggleSidebar}
                onClick={toggleSidebar}>
                <IconArrow className={styles.expandSidebarButtonIcon} />
              </div>
            )}
          </aside>
        )}
        <main
          className={clsx(styles.docMainContainer, {
            [styles.docMainContainerEnhanced]:
              hiddenSidebarContainer || !sidebar,
          })}>
          <div
            className={clsx(
              'container padding-top--md padding-bottom--lg',
              styles.docItemWrapper,
              {
                [styles.docItemWrapperEnhanced]: hiddenSidebarContainer,
              },
            )}>
              {children}
            </div>
        </main>
      </div>
  )
}