/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useCallback, useEffect, useState} from 'react';

const SEARCH_PARAM_QUERY = 'q';
const SEARCH_CATEGORY_QUERY = 'category';

interface UseSearchPageReturn {
  searchQuery: string;
  categoryQuery: string;
  setSearchQuery: (newSearchQuery: string) => void;
  setCategoryQuery: (newCategoryQuery: string) => void;
  generateSearchPageLink: (targetSearchQuery: string, category?: string) => string;
}

export default function useSearchPage(): UseSearchPageReturn {
  const history = useHistory();
  const {
    siteConfig: {baseUrl},
  } = useDocusaurusContext();

  const [searchQuery, setSearchQueryState] = useState('');
  const [category, setCategory] = useState('');

  // Init search query just after React hydration
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const searchQueryStringValue = query.get(SEARCH_PARAM_QUERY) ?? '';

    const category = query.get(SEARCH_CATEGORY_QUERY) ?? '';
    setCategory(category)
    setSearchQueryState(searchQueryStringValue);
  }, []);

  const setSearchQuery = useCallback(
    (newSearchQuery: string) => {
      const searchParams = new URLSearchParams(window.location.search);

      if (newSearchQuery) {
        searchParams.set(SEARCH_PARAM_QUERY, newSearchQuery);
      } else {
        searchParams.delete(SEARCH_PARAM_QUERY);
      }

      history.replace({
        search: searchParams.toString(),
      });
      setSearchQueryState(newSearchQuery);
    },
    [history],
  );

  const setCategoryQuery = useCallback(
    (newCategory: string) => {
      const searchParams = new URLSearchParams(window.location.search);

      if (newCategory) {
        searchParams.set(SEARCH_CATEGORY_QUERY, newCategory);
      } else {
        searchParams.delete(SEARCH_CATEGORY_QUERY);
      }

      history.replace({
        search: searchParams.toString(),
      });
      setCategory(newCategory);
    },
    [history],
  )

  const generateSearchPageLink = useCallback(
    (targetSearchQuery: string, category?: string) =>
      // Refer to https://github.com/facebook/docusaurus/pull/2838
      `${baseUrl}search?q=${encodeURIComponent(targetSearchQuery)}${category ? '&category=' + category : ''}`,
    [baseUrl],
  );

  return {
    searchQuery,
    categoryQuery: category,
    setSearchQuery,
    setCategoryQuery,
    generateSearchPageLink,
  };
}
