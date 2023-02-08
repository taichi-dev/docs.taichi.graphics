/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import { MDXProvider } from '@mdx-js/react';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { usePluralForm } from '@docusaurus/theme-common';
import { blogPostContainerID } from '@docusaurus/utils-common';
import MDXComponents from '@theme/MDXComponents';
import EditThisPage from '@theme/EditThisPage';
import type { Props } from '@theme/BlogPostItem';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';
import TagsListInline from '@theme/TagsListInline';
import BlogPostAuthors from '@theme/BlogPostAuthors';

import ArrowRight from './arrow-right.svg';

import ArrowLeft from './arrow-left.svg';

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime }
      )
    );
  };
}

function BlogListPostItem(props: Props): JSX.Element {
  const { assets, metadata } = props;
  const { date, formattedDate, permalink, title, description, authors } =
    metadata;
  const descriptionlines = description?.split('\\n')
  return (
    <div className="bg-grey-0 border shadow-sm rounded-sm p-6 flex space-x-3">
      <div className="space-y-2">
        <h5 className="font-bold">
          <Link href={permalink}>{title}</Link>
        </h5>
        <div>
          <div className="inline-block bg-grey-1 text-caption rounded border px-2 py-1 text-grey-4">
            <span>{formattedDate}</span>
            {authors && authors.length > 0 && (
              <>
                <span> | </span>
                <span>{authors.map((item) => item.name).join(', ')}</span>
              </>
            )}
          </div>
        </div>
        <div>{descriptionlines?.map((d, index) => <div key={index}>{d}</div>)}</div>
        <Link className="text-brand-cyan flex items-center" href={permalink}>
          <b>
            <Translate
              id="theme.blog.post.readMore"
              description="The label used in blog post item excerpts to link to full blog posts"
            >
              Read More
            </Translate>
            <ArrowRight />
          </b>
        </Link>
      </div>
      <div></div>
    </div>
  );
}

function BlogPostItem(props: Props): JSX.Element {
  const readingTimePlural = useReadingTimePlural();
  const { withBaseUrl } = useBaseUrlUtils();
  const {
    children,
    frontMatter,
    assets,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props;
  const {
    date,
    formattedDate,
    permalink,
    tags,
    readingTime,
    title,
    editUrl,
    authors,
  } = metadata;

  const {
    i18n: { defaultLocale, currentLocale },
  } = useDocusaurusContext();

  const image = assets.image ?? frontMatter.image;
  const truncatedPost = !isBlogPostPage && truncated;
  const tagsExists = tags.length > 0;

  if (!isBlogPostPage) {
    return <BlogListPostItem {...props} />;
  }

  const prefix = defaultLocale === currentLocale ? '' : '/' + currentLocale;
  const isNewsletter = permalink.startsWith(prefix + '/newsletter');
  const isUserStory = permalink.startsWith(prefix + '/user-stories');

  const baseUrl = isNewsletter ? '/newsletter' : (isUserStory ? '/user-stories' : '/blog');

  return (
    <article
      className={clsx(
        'max-w-articlemain mx-auto bg-grey-0 shadow-sm rounded-lg px-4 py-6 desktop:p-9 desktop:mt-5 space-y-2 desktop:space-y-6',
        { 'newsletter-article': isNewsletter }
      )}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div>
        <Link className="text-brand-cyan font-bold space-x-1" to={baseUrl}>
          <ArrowLeft />
          <span>Back to {isNewsletter ? 'newsletter' : (isUserStory ? 'user stories' : 'blog')}</span>
        </Link>
      </div>
      <header>
        <h3 className="font-bold" itemProp="headline">
          {isBlogPostPage ? (
            title
          ) : (
            <Link itemProp="url" to={permalink}>
              {title}
            </Link>
          )}
        </h3>
        <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
          <time dateTime={date} itemProp="datePublished">
            {formattedDate}
          </time>

          {typeof readingTime !== 'undefined' && (
            <>
              {' · '}
              {readingTimePlural(readingTime)}
            </>
          )}
        </div>
        <BlogPostAuthors authors={authors} assets={assets} />
      </header>

      {image && (
        <meta
          itemProp="image"
          content={withBaseUrl(image, { absolute: true })}
        />
      )}

      <div
        // This ID is used for the feed generation to locate the main content
        id={isBlogPostPage ? blogPostContainerID : undefined}
        className="markdown"
        itemProp="articleBody"
      >
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </div>

      {(tagsExists || truncated) && (
        <footer
          className={clsx('row docusaurus-mt-lg', {
            [styles.blogPostDetailsFull]: isBlogPostPage,
          })}
        >
          {tagsExists && (
            <div className={clsx('col', { 'col--9': truncatedPost })}>
              <TagsListInline tags={tags} />
            </div>
          )}

          {isBlogPostPage && editUrl && (
            <div className="col margin-top--sm">
              <EditThisPage editUrl={editUrl} />
            </div>
          )}

          {truncatedPost && (
            <div
              className={clsx('col text--right', {
                'col--3': tagsExists,
              })}
            >
              <Link
                to={metadata.permalink}
                aria-label={`Read more about ${title}`}
              >
                <b>
                  <Translate
                    id="theme.blog.post.readMore"
                    description="The label used in blog post item excerpts to link to full blog posts"
                  >
                    Read More
                  </Translate>
                </b>
              </Link>
            </div>
          )}
        </footer>
      )}
    </article>
  );
}

export default BlogPostItem;
