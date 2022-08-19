/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useEffect, useState, useReducer, useRef } from 'react';

import algoliaSearch from 'algoliasearch/lite';
import algoliaSearchHelper from 'algoliasearch-helper';
import clsx from 'clsx';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import {
  useTitleFormatter,
  usePluralForm,
  isRegexpStringMatch,
  useDynamicCallback,
  useSearchPage,
} from '@docusaurus/theme-common';
import { useDocsPreferredVersionContext } from '@docusaurus/theme-common/lib/utils/docsPreferredVersion/DocsPreferredVersionProvider';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

// Very simple pluralization: probably good enough for now
function useDocumentsFoundPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          id: 'theme.SearchPage.documentsFound.plurals',
          description:
            'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One document found|{count} documents found',
        },
        { count }
      )
    );
}

function getSearchVersion(versions, state) {
  if (state && state.preferredVersionName) return state.preferredVersionName;
  const lastest = versions.find((item) => item.isLast);
  return lastest ? lastest.name : versions[0].name;
}

function useDocsSearchVersionsHelpers() {
  const allDocsData = useAllDocsData();
  // const preferredVersions =  useDocsPreferredVersionByPluginId()
  const [state] = useDocsPreferredVersionContext();

  // const isReady = Object.entries(allDocsData).every(([pluginId]) => !!preferredVersions[pluginId])

  // State of the version select menus / algolia facet filters
  // docsPluginId -> versionName map
  const [searchVersions, setSearchVersions] = useState<Record<string, string>>(
    () =>
      Object.entries(allDocsData).reduce(
        (acc, [pluginId, pluginData]) => ({
          ...acc,
          [pluginId]: getSearchVersion(pluginData.versions, state?.[pluginId]),
        }),
        {}
      )
  );

  useEffect(() => {
    const versions = Object.entries(allDocsData).reduce(
      (acc, [pluginId, pluginData]) => ({
        ...acc,
        [pluginId]: getSearchVersion(pluginData.versions, state?.[pluginId]),
      }),
      {}
    );
    setSearchVersions((s) => ({ ...s, ...versions }));
  }, [state]);

  // const currentSearchVersions = searchVersions

  // Set the value of a single select menu
  const setSearchVersion = (pluginId: string, searchVersion: string) =>
    setSearchVersions((s) => ({ ...s, [pluginId]: searchVersion }));

  const versioningEnabled = Object.values(allDocsData).some(
    (docsData) => docsData.versions.length > 1
  );

  return {
    allDocsData,
    versioningEnabled,
    searchVersions: searchVersions,
    setSearchVersion,
  };
}

// We want to display one select per versioned docs plugin instance
function SearchVersionSelectList({
  docsSearchVersionsHelpers,
}: {
  docsSearchVersionsHelpers: ReturnType<typeof useDocsSearchVersionsHelpers>;
}) {
  const versionedPluginEntries = Object.entries(
    docsSearchVersionsHelpers.allDocsData
  )
    // Do not show a version select for unversioned docs plugin instances
    .filter(([, docsData]) => docsData.versions.length > 1);

  return (
    <div>
      {versionedPluginEntries.map(([pluginId, docsData]) => {
        const labelPrefix =
          versionedPluginEntries.length > 1 ? `${pluginId}: ` : '';
        return (
          <select
            key={pluginId}
            onChange={(e) =>
              docsSearchVersionsHelpers.setSearchVersion(
                pluginId,
                e.target.value
              )
            }
            value={docsSearchVersionsHelpers.searchVersions[pluginId]}
            className={styles.searchVersionInput}
          >
            {docsData.versions.map((version, i) => (
              <option
                key={i}
                label={`${labelPrefix}${version.label}`}
                value={version.name}
              />
            ))}
          </select>
        );
      })}
    </div>
  );
}

type ResultDispatcherState = {
  items: {
    title: string;
    url: string;
    summary: string;
    breadcrumbs: string[];
  }[];
  query: string | null;
  totalResults: number | null;
  totalPages: number | null;
  lastPage: number | null;
  hasMore: boolean | null;
  loading: boolean | null;
};

type ResultDispatcher =
  | { type: 'reset'; value?: undefined }
  | { type: 'loading'; value?: undefined }
  | { type: 'update'; value: ResultDispatcherState }
  | { type: 'advance'; value?: undefined };

const searchTypes = [
  {
    label: 'All',
  },
  {
    label: 'Docs',
    type: '',
  },
  {
    label: 'API',
    type: '',
  },
  {
    label: 'Blogs',
    type: '',
  },
];

function SearchPage(): JSX.Element {
  const {
    siteConfig: {
      themeConfig: {
        // @ts-ignore
        algolia: { appId, apiKey, indexName, externalUrlRegex },
      },
    },
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const documentsFoundPlural = useDocumentsFoundPlural();

  const docsSearchVersionsHelpers = useDocsSearchVersionsHelpers();
  const { searchQuery, setSearchQuery } = useSearchPage();
  const initialSearchResultState: ResultDispatcherState = {
    items: [],
    query: null,
    totalResults: null,
    totalPages: null,
    lastPage: null,
    hasMore: null,
    loading: null,
  };
  const [searchResultState, searchResultStateDispatcher] = useReducer(
    (prevState: ResultDispatcherState, data: ResultDispatcher) => {
      switch (data.type) {
        case 'reset': {
          return initialSearchResultState;
        }
        case 'loading': {
          return { ...prevState, loading: true };
        }
        case 'update': {
          if (searchQuery !== data.value.query) {
            return prevState;
          }

          return {
            ...data.value,
            items:
              data.value.lastPage === 0
                ? data.value.items
                : prevState.items.concat(data.value.items),
          };
        }
        case 'advance': {
          const hasMore = prevState.totalPages! > prevState.lastPage! + 1;

          return {
            ...prevState,
            lastPage: hasMore ? prevState.lastPage! + 1 : prevState.lastPage,
            hasMore,
          };
        }
        default:
          return prevState;
      }
    },
    initialSearchResultState
  );

  const algoliaClient = algoliaSearch(appId, apiKey);
  const algoliaHelper = algoliaSearchHelper(algoliaClient, indexName, {
    hitsPerPage: 15,
    advancedSyntax: true,
    disjunctiveFacets: ['language', 'docusaurus_tag'],
  });

  algoliaHelper.on(
    'result',
    ({ results: { query, hits, page, nbHits, nbPages } }) => {
      if (query === '' || !(hits instanceof Array)) {
        searchResultStateDispatcher({ type: 'reset' });
        return;
      }

      const sanitizeValue = (value: string) =>
        value.replace(
          /algolia-docsearch-suggestion--highlight/g,
          'search-result-match'
        );

      const items = hits.map(
        ({
          url,
          _highlightResult: { hierarchy },
          _snippetResult: snippet = {},
        }) => {
          const parsedURL = new URL(url);
          const titles = Object.keys(hierarchy).map((key) =>
            sanitizeValue(hierarchy[key].value)
          );

          return {
            title: titles.pop()!,
            url: isRegexpStringMatch(externalUrlRegex, parsedURL.href)
              ? parsedURL.href
              : parsedURL.pathname + parsedURL.hash,
            summary: snippet.content
              ? `${sanitizeValue(snippet.content.value)}...`
              : '',
            breadcrumbs: titles,
          };
        }
      );

      searchResultStateDispatcher({
        type: 'update',
        value: {
          items,
          query,
          totalResults: nbHits,
          totalPages: nbPages,
          lastPage: page,
          hasMore: nbPages > page + 1,
          loading: false,
        },
      });
    }
  );

  const [loaderRef, setLoaderRef] = useState<HTMLDivElement | null>(null);
  const prevY = useRef(0);
  const observer = useRef(
    ExecutionEnvironment.canUseDOM &&
      new IntersectionObserver(
        (entries) => {
          const {
            isIntersecting,
            boundingClientRect: { y: currentY },
          } = entries[0];

          if (isIntersecting && prevY.current > currentY) {
            searchResultStateDispatcher({ type: 'advance' });
          }

          prevY.current = currentY;
        },
        { threshold: 1 }
      )
  );

  const getTitle = () =>
    searchQuery
      ? translate(
          {
            id: 'theme.SearchPage.existingResultsTitle',
            message: 'Search results for "{query}"',
            description: 'The search page title for non-empty query',
          },
          {
            query: searchQuery,
          }
        )
      : translate({
          id: 'theme.SearchPage.emptyResultsTitle',
          message: 'Search the documentation',
          description: 'The search page title for empty query',
        });

  const makeSearch = useDynamicCallback((page: number = 0) => {
    algoliaHelper.addDisjunctiveFacetRefinement('docusaurus_tag', 'default');
    algoliaHelper.addDisjunctiveFacetRefinement('language', currentLocale);

    Object.entries(docsSearchVersionsHelpers.searchVersions).forEach(
      ([pluginId, searchVersion]) => {
        algoliaHelper.addDisjunctiveFacetRefinement(
          'docusaurus_tag',
          `docs-${pluginId}-${searchVersion}`
        );
      }
    );

    algoliaHelper.setQuery(searchQuery).setPage(page).search();
  });

  useEffect(() => {
    if (!loaderRef) {
      return undefined;
    }
    const currentObserver = observer.current;
    if (currentObserver) {
      currentObserver.observe(loaderRef);
      return () => currentObserver.unobserve(loaderRef);
    }
    return () => true;
  }, [loaderRef]);

  useEffect(() => {
    searchResultStateDispatcher({ type: 'reset' });

    if (searchQuery) {
      searchResultStateDispatcher({ type: 'loading' });

      setTimeout(() => {
        makeSearch();
      }, 300);
    }
  }, [searchQuery, docsSearchVersionsHelpers.searchVersions, makeSearch]);

  useEffect(() => {
    if (!searchResultState.lastPage || searchResultState.lastPage === 0) {
      return;
    }

    makeSearch(searchResultState.lastPage);
  }, [makeSearch, searchResultState.lastPage]);

  return (
    <>
      <Head>
        <title>{useTitleFormatter(getTitle())}</title>
        <meta property="robots" content="noindex, follow" />
      </Head>

      <div className="py-9">
        <div className="border-b">
          <div className="max-w-[908px] mx-auto space-y-6 pb-3 px-4">
            <h3>{getTitle()}</h3>

            <form className='flex space-x-1' onSubmit={(e) => e.preventDefault()}>
              {docsSearchVersionsHelpers.versioningEnabled && (
                <SearchVersionSelectList
                  docsSearchVersionsHelpers={docsSearchVersionsHelpers}
                />
              )}
              <div
                className={clsx('flex flex-1', styles.searchQueryColumn)}
              >
                <input
                  type="search"
                  name="q"
                  className={styles.searchQueryInput}
                  placeholder={translate({
                    id: 'theme.SearchPage.inputPlaceholder',
                    message: 'Type your search here',
                    description: 'The placeholder for search page input',
                  })}
                  aria-label={translate({
                    id: 'theme.SearchPage.inputLabel',
                    message: 'Search',
                    description: 'The ARIA label for search page input',
                  })}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </form>

            <div>
              <div className="flex space-x-3">
                {searchTypes.map((item) => (
                  <div
                    className="bg-grey-0 border px-3 py-1 desktop:min-w-[5rem] min-w-[3rem] flex justify-center cursor-pointer"
                    key={item.label}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[908px] mx-auto pt-5 px-4">
          <div className="pb-5">
            <div className={clsx(styles.searchResultsColumn)}>
              {!!searchResultState.totalResults &&
                documentsFoundPlural(searchResultState.totalResults)}
            </div>
          </div>

          {searchResultState.items.length > 0 ? (
            <main className="space-y-3">
              {searchResultState.items.map(
                ({ title, url, summary, breadcrumbs }, i) => (
                  <article
                    key={i}
                    className="bg-grey-0 border shadow-sm rounded-sm p-6 space-y-3"
                  >
                    <h3 className={styles.searchResultItemHeading}>
                      <Link
                        to={url}
                        dangerouslySetInnerHTML={{ __html: title }}
                      />
                    </h3>

                    {breadcrumbs.length > 0 && (
                      <nav aria-label="breadcrumbs">
                        <ul
                          className={clsx(
                            'breadcrumbs',
                            styles.searchResultItemPath
                          )}
                        >
                          {breadcrumbs.map((html, index) => (
                            <li
                              key={index}
                              className="breadcrumbs__item"
                              // Developer provided the HTML, so assume it's safe.
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: html }}
                            />
                          ))}
                        </ul>
                      </nav>
                    )}

                    {summary && (
                      <p
                        className={styles.searchResultItemSummary}
                        // Developer provided the HTML, so assume it's safe.
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: summary }}
                      />
                    )}
                  </article>
                )
              )}
            </main>
          ) : (
            [
              searchQuery && !searchResultState.loading && (
                <p key="no-results">
                  <Translate
                    id="theme.SearchPage.noResultsText"
                    description="The paragraph for empty search result"
                  >
                    No results were found
                  </Translate>
                </p>
              ),
              !!searchResultState.loading && (
                <div key="spinner" className={styles.loadingSpinner} />
              ),
            ]
          )}

          {searchResultState.hasMore && (
            <div className={styles.loader} ref={setLoaderRef}>
              <Translate
                id="theme.SearchPage.fetchingNewResults"
                description="The paragraph for fetching new search results"
              >
                Fetching new results...
              </Translate>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default () => {
  return (
    <Layout wrapperClassName="search-page-wrapper bg-grey-1">
      <SearchPage />
    </Layout>
  );
};
