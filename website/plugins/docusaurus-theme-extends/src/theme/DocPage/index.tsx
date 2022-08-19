/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode, useState, useCallback } from 'react';
import { MDXProvider } from '@mdx-js/react';

import renderRoutes from '@docusaurus/renderRoutes';
import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import MDXComponents from '@theme/MDXComponents';
import NotFound from '@theme/NotFound';
import type { DocumentRoute } from '@theme/DocItem';
import type { Props } from '@theme/DocPage';
import IconArrow from '@theme/IconArrow';
import BackToTopButton from '@theme/BackToTopButton';
import { matchPath } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';

import clsx from 'clsx';
import styles from './styles.module.css';
import {
  ThemeClassNames,
  docVersionSearchTag,
  DocsSidebarProvider,
  useDocsSidebar,
  DocsVersionProvider,
  useLockBodyScroll,
} from '@docusaurus/theme-common';
import Head from '@docusaurus/Head';

import { isActiveSidebarItem } from '@docusaurus/theme-common';

import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import { useMemo } from 'react';

import ChevronDown from './chevron-down.svg';

import useMobileSidebar from '../../utils/useMobile';

type DocPageContentProps = {
  readonly currentDocRoute: DocumentRoute;
  readonly versionMetadata: PropVersionMetadata;
  readonly children: ReactNode;
  readonly sidebarName: string | undefined;
};

const findActiveItem = (sidebar: PropSidebarItem[], activePath: string) => {
  const actives: PropSidebarItem[] = [];
  for (const item of sidebar) {
    if (isActiveSidebarItem(item, activePath)) {
      actives.push(item);
      if (item.type === 'category' && item.items && item.items.length > 0) {
        const sub = findActiveItem(item.items, activePath);
        actives.push(...sub);
      }
    }
  }
  return actives;
};

const useBreadcrumbs = (
  activePath: string,
  sidebar: PropSidebarItem[] | null
) => {
  return useMemo(() => {
    if (!sidebar) return [];
    const breadcrumbs = findActiveItem(sidebar, activePath);
    return breadcrumbs;
  }, [sidebar, activePath]);
};

function DocPageContent({
  currentDocRoute,
  versionMetadata,
  children,
  sidebarName,
}: DocPageContentProps): JSX.Element {
  const sidebar = useDocsSidebar();
  const { pluginId, version } = versionMetadata;
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar]);

  const breadcrumbs = useBreadcrumbs(currentDocRoute.path, sidebar);

  const mobileSidebar = useMobileSidebar();

  return (
    <Layout
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsDocPage}
      searchMetadata={{
        version,
        tag: docVersionSearchTag(pluginId, version),
        category: 'docs',
      }}
    >
      <div className="flex w-full">
        <BackToTopButton />

        {sidebar && !mobileSidebar.shouldRender && (
          <aside
            className={clsx(
              ThemeClassNames.docs.docSidebarContainer,
              styles.docSidebarContainer,
              {
                [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
              }
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
            }}
          >
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              path={currentDocRoute.path}
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
                onClick={toggleSidebar}
              >
                <IconArrow className={styles.expandSidebarButtonIcon} />
              </div>
            )}
          </aside>
        )}
        <main
          className={clsx(
            'flex-1',
            styles.docMainContainer,
            hiddenSidebarContainer && styles.docMainContainerEnhanced
          )}
        >
          <div className="mx-auto max-w-docmain w-full">
            <div
              className={clsx(
                styles.docBreadcrumbs,
                'py-2 desktop:px-10 px-4 text-grey-4 flex z-20 font-light text-caption border-b items-center'
              )}
            >
              <div className="flex-1 overflow-hidden h-6">
                <div className='overflow-auto flex space-x-1 whitespace-nowrap pb-4 mt-1'>
                <div>
                  <a href="/">Doc Home</a>
                </div>
                {breadcrumbs.map((item, i) => (
                  <>
                    <div>&gt;&gt;</div>
                    <div key={i}>
                      <a href={item.href}>{item.label}</a>
                    </div>
                  </>
                ))}
                </div>
              </div>
              {sidebar && (
                <div
                  className={clsx(
                    'w-6 rotate-90 desktop:hidden flex items-center justify-center',
                    mobileSidebar.shown ? 'rotate-180' : ''
                  )}
                  onClick={mobileSidebar.toggle}
                >
                  <ChevronDown />
                </div>
              )}
            </div>
            <div className="desktop:px-10 px-4 pt-5 pb-12">
              <MDXProvider components={MDXComponents}>{children}</MDXProvider>
            </div>
            {mobileSidebar.shouldRender && sidebar && (
              <MobileSidebar sidebarShown={mobileSidebar.shown}>
                <DocSidebar
                  key={
                    // Reset sidebar state on sidebar changes
                    // See https://github.com/facebook/docusaurus/issues/3414
                    sidebarName
                  }
                  sidebar={sidebar}
                  path={currentDocRoute.path}
                  onCollapse={toggleSidebar}
                  isHidden={hiddenSidebar}
                />
              </MobileSidebar>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

function MobileSidebar({
  sidebarShown,
  children,
}: {
  sidebarShown: boolean;
  children: React.ReactNode;
}) {
  useLockBodyScroll(sidebarShown);
  return (
    <div
      className={clsx(
        'fixed top-8 w-full bottom-0',
        sidebarShown ? '' : 'hidden'
      )}
    >
      {children}
    </div>
  );
}

function DocPage(props: Props): JSX.Element {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location,
  } = props;
  const currentDocRoute = docRoutes.find((docRoute) =>
    matchPath(location.pathname, docRoute)
  );
  if (!currentDocRoute) {
    return <NotFound />;
  }

  // For now, the sidebarName is added as route config: not ideal!
  const sidebarName = currentDocRoute.sidebar;

  const sidebar = sidebarName
    ? versionMetadata.docsSidebars[sidebarName]
    : null;

  return (
    <>
      <Head>
        {/* TODO we should add a core addRoute({htmlClassName}) generic plugin option */}
        <html className={versionMetadata.className} />
      </Head>
      <DocsVersionProvider version={versionMetadata}>
        <DocsSidebarProvider sidebar={sidebar}>
          <DocPageContent
            currentDocRoute={currentDocRoute}
            versionMetadata={versionMetadata}
            sidebarName={sidebarName}
          >
            {renderRoutes(docRoutes, { versionMetadata })}
          </DocPageContent>
        </DocsSidebarProvider>
      </DocsVersionProvider>
    </>
  );
}

export default DocPage;
