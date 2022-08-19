/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogListPaginator from '@theme/BlogListPaginator';
import type { Props } from '@theme/BlogListPage';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import { translate } from '@docusaurus/Translate';

import { useLocation } from '@docusaurus/router';

import SearchBar from '@theme/SearchBar';

import { useBlogTags } from '../../utils/blogData';

import SubscriptionInput from '../Subscription';

import styles from './styles.module.css';

import CloseIcon from './x.svg';
import { useState } from 'react';

function BlogListPage(props: Props): JSX.Element {
  const { metadata, items } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  const { pathname } = useLocation();

  const isNewsletter = permalink.startsWith('/newsletter');

  const baseUrl = isNewsletter ? '/newsletter' : '/blog';

  const { blogTags } = useBlogTags(isNewsletter ? 'newsletter' : undefined);

  const [showSubscription, setShowSubscription] = useState(true);

  const isAll = pathname === baseUrl + '/' || pathname === baseUrl;

  return (
    <BlogLayout
      title={title}
      description={blogDescription}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
      searchMetadata={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_posts_list',
      }}
    >
      <div className={clsx("desktop:mt-14 mt-6", {"newsletter-article": isNewsletter})}>
        <h1 className="bg-clip-text text-transparent text-brand-cyan-gradients inline-block font-bold mb-4 px-4">
          {isNewsletter ? 'Taichi Newsletter' : 'Taichi Blogs'}
        </h1>
        <div className="flex flex-col desktop:flex-row">
          <div className="space-y-4 flex-1 px-4">
            {Object.keys(blogTags).length > 0 && (
              <div className="flex flex-wrap gap-2">
                <div
                  key="all"
                  className={clsx(
                    'rounded-sm border px-3 py-1',
                    isAll ? 'border-brand-cyan bg-brand-cyan' : ''
                  )}
                >
                  <Link
                    className={isAll ? 'hover:text-white text-white' : ''}
                    href={baseUrl}
                  >
                    {translate({
                      id: 'theme.text.all',
                      message: 'All',
                    })}
                  </Link>
                </div>
                {Object.keys(blogTags).map((item) => {
                  const { name, permalink } = blogTags[item];
                  const active = pathname === permalink;
                  return (
                    <div
                      key={item}
                      className={clsx(
                        'rounded-sm border px-3 py-1',
                        active ? 'border-brand-cyan bg-brand-cyan' : ''
                      )}
                    >
                      <Link
                        className={active ? 'hover:text-white text-white' : ''}
                        href={active ? baseUrl : permalink}
                      >
                        {name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="space-y-4">
              {items.map(({ content: BlogPostContent }) => (
                <BlogPostItem
                  key={BlogPostContent.metadata.permalink}
                  frontMatter={BlogPostContent.frontMatter}
                  assets={BlogPostContent.assets}
                  metadata={BlogPostContent.metadata}
                  truncated={BlogPostContent.metadata.truncated}
                >
                  <BlogPostContent />
                </BlogPostItem>
              ))}
            </div>
          </div>
          {showSubscription && (
            <div className={styles.blogrightsideber}>
              {!isNewsletter && <div className="mb-5 hidden desktop:block">
                <SearchBar />
              </div>}
              <div className="border relative shadow rounded-sm bg-grey-0 pb-8 desktop:pb-3">
                <div className="h-24 w-full brand-cyan-gradients"></div>
                <div className="absolute right-4 top-4">
                  <div
                    className="desktop:hidden bg-grey-0 w-8 h-8 flex items-center justify-center rounded-full"
                    onClick={() => setShowSubscription(false)}
                  >
                    <CloseIcon />
                  </div>
                </div>

                <div className="-mt-[4.25rem] px-4">
                  <div className="text-grey-4 font-bold text-h3 mb-4">
                    <div>
                      {translate({
                        id: 'theme.subscription.subscribetoours',
                        message: 'Subscribe to our updates',
                      })}
                    </div>
                  </div>
                  <SubscriptionInput />
                  <div className="mt-6">
                    <p>
                      {translate({
                        id: 'theme.subscription.description1',
                        message:
                          'Get the latest news from the Taichi Lang community in a monthly email: Groundbreaking releases, upcoming events, new insights, community updates, and more!',
                      })}
                    </p>
                  </div>
                  <div className="mt-4 text-brand-cyan-dark text-caption">
                    {translate({
                      id: 'theme.subscription.description2',
                      message:
                        "We'll never share your information with anyone else and you can opt out at any time.",
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
}

export default BlogListPage;
