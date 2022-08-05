import React, { useEffect, useRef, useState, useCallback } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';
import LayoutProviders from '@theme/LayoutProviders';
import _ from 'lodash'
import {
  ThemeClassNames,
  useColorMode,
} from '@docusaurus/theme-common';

import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';

import DocSidebar from '@theme/DocSidebar';
import IconArrow from '@theme/IconArrow';

import CodeBlock from '@theme/CodeBlock'

import DocItem from './DocItem';

import ReactDOM from 'react-dom'

import BackToTopButton from '@theme/BackToTopButton';

import './styles/index.scss'

import styles from './styles.module.css'

const lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;

const CodeContainer = ({ code, className }) => {
  const { setDarkTheme, setLightTheme } = useColorMode()
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    const callback = function(mutationsList) {
      for(let mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-theme') {
            const v = html.getAttribute(mutation.attributeName)
            if (v === 'light') {
              setLightTheme()
            }
            if (v === 'dark') {
              setDarkTheme()
            }
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.getElementsByTagName('html')[0], { attributes: true });
    return () => {
      observer.disconnect()
    }
  }, [])
  return <CodeBlock className={className} children={code} />
}

const AutoApiContainer = ({ content, version }) => {
  const value = useRef()
  const {savePreferredVersionName} =
    useDocsPreferredVersion('default');
  useEffect(() => {
    if (version) {
      savePreferredVersionName(version)
    }
  }, [version])
  const { isDarkTheme } = useColorMode()
  useEffect(() => {
    value.current = isDarkTheme
  }, [isDarkTheme])

  useEffect(() => {
      const nodes = document.querySelectorAll('.autoapi-container pre')
      nodes.forEach((node) => {
        const flag = lang.exec(node.className)
        if (!flag) {
          node.classList.add('language-python')
        }
        const p = node.parentElement
        node.remove()
        ReactDOM.render(<LayoutProviders><CodeContainer className={node.className} code={node.textContent} /></LayoutProviders>, p)
      })
  }, [])
  return <div style={{ width: '100%', paddingLeft: 15, paddingRight: 15 }} dangerouslySetInnerHTML={{ __html: content }}></div>
}

export default ({ __content, __title, __version, __sidebar, __toc }) => {
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar]);

  return (
    <Layout
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsDocPage}
      searchMetadata={{
        version: __version,
        tag: `docs-default-${__version}`,
      }}>
      <Head>
        <title>{__title}</title>
      </Head>
      <div className={styles.docPage}>
        <BackToTopButton />
        {__sidebar && (
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
              sidebar={__sidebar}
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
              hiddenSidebarContainer || !__sidebar,
          })}>
          <div
            className={clsx(
              'container padding-top--md padding-bottom--lg',
              styles.docItemWrapper,
              {
                [styles.docItemWrapperEnhanced]: hiddenSidebarContainer,
              },
            )}>
              <DocItem content={<AutoApiContainer content={__content} version={__version} />} tocs={__toc} />
            </div>
        </main>
      </div>
    </Layout>
  );
};