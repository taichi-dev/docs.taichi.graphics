/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import Link from '@docusaurus/Link';
import {
  type FooterLinkItem,
  useThemeConfig,
  type MultiColumnFooter,
  type SimpleFooter,
} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.css';
import ThemedImage, {
  type Props as ThemedImageProps,
} from '@theme/ThemedImage';
import IconExternalLink from '@theme/IconExternalLink';

import { translate } from '@docusaurus/Translate';

import SubscriptionInput from '../Subscription';

import MessageIcon from './message-circle.svg';
import SlackIcon from './slack.svg';
import GithubIcon from './github.svg';
import Logo from './logo.svg';

import WechatLinkCode from '../icons/wechat-community.jpg';

function FooterLink({
  to,
  href,
  label,
  prependBaseUrlToHref,
  ...props
}: FooterLinkItem) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
          <IconExternalLink />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

function FooterLogo({
  sources,
  alt,
  width,
  height,
}: Pick<ThemedImageProps, 'sources' | 'alt' | 'width' | 'height'>) {
  return (
    <ThemedImage
      className="footer__logo"
      alt={alt}
      sources={sources}
      width={width}
      height={height}
    />
  );
}

function MultiColumnLinks({ links }: { links: MultiColumnFooter['links'] }) {
  return (
    <>
      {links.map((linkItem, i) => (
        <div key={i} className="col footer__col">
          <div className="footer__title">{linkItem.title}</div>
          <ul className="footer__items">
            {linkItem.items.map((item, key) =>
              item.html ? (
                <li
                  key={key}
                  className="footer__item"
                  // Developer provided the HTML, so assume it's safe.
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: item.html,
                  }}
                />
              ) : (
                <li key={item.href || item.to} className="footer__item">
                  <FooterLink {...item} />
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </>
  );
}

function SimpleLinks({ links }: { links: SimpleFooter['links'] }) {
  return (
    <div className="footer__links">
      {links.map((item, key) => (
        <>
          {item.html ? (
            <span
              key={key}
              className="footer__link-item"
              // Developer provided the HTML, so assume it's safe.
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: item.html,
              }}
            />
          ) : (
            <FooterLink {...item} />
          )}
          {links.length !== key + 1 && (
            <span className="footer__link-separator">·</span>
          )}
        </>
      ))}
    </div>
  );
}

function isMultiColumnFooterLinks(
  links: MultiColumnFooter['links'] | SimpleFooter['links']
): links is MultiColumnFooter['links'] {
  return 'title' in links[0];
}

function FooterSubscriber() {
  return (
    <div>
      <div className="text-caption mb-2">
        {translate({
          id: 'theme.subscription.title',
          message: 'Subscription',
        })}
      </div>
      <div className="w-full mb-6">
        <SubscriptionInput />
      </div>
      <div className="flex justify-end space-x-6">
        <a
          href="https://github.com/taichi-dev/taichi/discussions"
          target="_blank"
        >
          <MessageIcon />
        </a>
        <a
          href="https://join.slack.com/t/taichicommunity/shared_invite/zt-14ic8j6no-Fd~wKNpfskXLfqDr58Tddg"
          target="_blank"
        >
          <SlackIcon width={32} height={32} />
        </a>
        <a href="https://github.com/taichi-dev/taichi" target="_blank">
          <GithubIcon />
        </a>
      </div>
    </div>
  );
}

function Footer(): JSX.Element | null {
  const { footer } = useThemeConfig();

  if (!footer) {
    return null;
  }

  const { copyright } = footer || {};

  return (
    <footer className="bg-grey-4 dark:bg-grey-0 text-white">
      <div className="mx-auto my-6 desktop:mt-10 desktop:mb-2 px-4 max-w-docmain">
        <div className="border-b border-b-white pb-6 flex items-center justify-between">
          <Logo />
          <div className="hidden desktop:inline-block text-caption text-grey-3 desktop:w-[328px]">
            {copyright}
          </div>
        </div>
        <div className="mt-4 flex justify-between flex-wrap mb-4">
          <div className="flex-1">
            <div className="desktop:w-10/12 flex flex-wrap mb-4">
              <div className="flex flex-col flex-1 min-w-[9rem]">
                <h5 className="font-bold mb-3">
                  {translate({
                    id: 'theme.text.resources',
                    message: 'Resources',
                  })}
                </h5>
                <div className="flex flex-col space-y-2">
                  <Link href="/blog">
                    {translate({
                      id: 'theme.text.blog',
                      message: 'Blogs',
                    })}
                  </Link>
                  <Link href="/newsletter">
                  {translate({
                      id: 'theme.text.newsletters',
                      message: 'Newsletters',
                    })}
                  </Link>
                  <Link href="/user-stories">
                  {translate({
                      id: 'theme.text.userstories',
                      message: 'User Stories',
                    })}
                  </Link>
                  <Link href="/tgc01/">
                  {translate({
                      id: 'theme.text.taichicourse',
                      message: 'Taichi Graphics Course',
                    })}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[9rem] mb-4">
                <h5 className="font-bold mb-3">
                {translate({
                      id: 'theme.text.community',
                      message: 'Community',
                    })}
                </h5>
                <div className="flex flex-col space-y-2">
                  <Link href="https://github.com/taichi-dev/taichi/discussions">
                    Global Forum
                  </Link>
                  <Link href="https://forum.taichi.graphics/">中文论坛</Link>
                  <Link href="https://join.slack.com/t/taichicommunity/shared_invite/zt-14ic8j6no-Fd~wKNpfskXLfqDr58Tddg">
                    Slack
                  </Link>
                  {/* <Link href='/'>Wechat</Link> */}
                  <div className="relative group">
                    <span className="cursor-pointer">
                    {translate({
                      id: 'theme.text.wechat',
                      message: 'Wechat',
                    })}
                    </span>
                    <div className="hidden group-hover:block absolute bottom-8">
                      <img src={WechatLinkCode} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-[9rem] mb-4">
                <h5 className="font-bold mb-3">LEGAL</h5>
                <div className="flex flex-col space-y-2">
                  <Link href="https://taichi.graphics/cookie-policy/">
                    Cookie Policy <IconExternalLink />
                  </Link>
                  <Link href="https://taichi.graphics/privacy-policy/">
                    Privacy Policy <IconExternalLink />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="desktop:w-[328px] w-full">
            <FooterSubscriber />
          </div>
        </div>
        <div className="inline-block desktop:hidden text-caption text-grey-3 desktop:w-[328px]">
          {copyright}
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
