/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
import Toggle from '@theme/Toggle';
import {
  useThemeConfig,
  useColorMode,
  useLockBodyScroll,
} from '@docusaurus/theme-common';

import useMobileSidebar from '../../utils/useMobile';

import {
  CollapseDropDown,
  DropdownNavbarItem,
  LocaleDropdownNavbarItem,
  VersionDropdownNavbarItem,
} from './DropdownNavbarItem';

import clsx from 'clsx';

import { GithubStars } from './githubStar';

import MenuIcon from './menu.svg';
import LogoIcon from './logo.svg';
import CloseIcon from './x.svg';
import { NavLink, WithVersionLink } from './WithVersionUrl';
import { translate } from '@docusaurus/Translate';

function useColorModeToggle() {
  const {
    colorMode: { disableSwitch },
  } = useThemeConfig();
  const { isDarkTheme, setLightTheme, setDarkTheme } = useColorMode();
  const toggle = useCallback(
    (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme]
  );
  return { isDarkTheme, toggle, disabled: disableSwitch };
}

type NavbarMobileSidebarProps = {
  sidebarShown: boolean;
  toggleSidebar: () => void;
};

function NavbarMobileSidebar({
  sidebarShown,
  toggleSidebar,
}: NavbarMobileSidebarProps) {
  useLockBodyScroll(sidebarShown);

  const colorModeToggle = useColorModeToggle();

  return (
    <div className="navbar-sidebar flex flex-col overflow-hidden">
      <div className="desktop:h-20 h-16 flex items-center px-3 border-b border-grey-3">
        <div className="flex items-center space-x-3">
          <LogoIcon width={120} />
          <GithubStars />
        </div>
        <button
          type="button"
          className="clean-btn navbar-sidebar__close"
          onClick={toggleSidebar}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="px-3 py-4 flex-1 overflow-hidden relative">
        <ul className="space-y-3 overflow-auto h-full">
          <li className="px-2 py-1">
            <NavLink
              className="block"
              href="/"
              label="Doc Home"
              matchPath="/docs"
            />
          </li>
          <li className="px-2 py-1">
            <WithVersionLink
              className="block"
              href="/api/"
              label="API"
              matchPath="/api"
            />
          </li>
          <CollapseDropDown
            label="Resource"
            items={[
              { label: 'Blogs', href: '/blog' },
              { label: 'Newsletters', href: '/newsletter' },
              { label: 'User Stories', href: '/user-stories' },
              { label: 'Taichi Graphics Course', href: '/tgc01/' },
            ]}
          />
          <CollapseDropDown
            label="Community"
            items={[
              {
                label: 'Global Forum',
                href: 'https://github.com/taichi-dev/taichi/discussions',
              },
              { label: '中文论坛', href: 'https://forum.taichi.graphics/' },
              {
                label: 'Slack',
                href: 'https://taichicommunity.slack.com/join/shared_invite/zt-14ic8j6no-Fd~wKNpfskXLfqDr58Tddg#/shared-invite/email',
              },
              { label: 'WeChat', href: '' },
            ]}
          />
        </ul>
      </div>
      <div className="border-t py-3">
        <ul className="flex items-center justify-around space-x-2">
          <li className='flex-1'>
            <VersionDropdownNavbarItem position="top" />
          </li>
          <li className='flex-1'>
            <LocaleDropdownNavbarItem position="top" />
          </li>
          <li>
            <Toggle
              checked={colorModeToggle.isDarkTheme}
              onChange={colorModeToggle.toggle}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

function Navbar(): JSX.Element {
  const colorModeToggle = useColorModeToggle();

  const mobileSidebar = useMobileSidebar();

  return (
    <nav
      id="header-nav"
      className={clsx(
        'bg-grey-0 border-b border-grey-3 flex items-center justify-between sticky top-0 desktop:h-20 h-16 z-30 px-3 desktop:px-8',
        { 'navbar-sidebar--show': mobileSidebar.shown }
      )}
    >
      <div className="flex items-center space-x-5">
        <LogoIcon />
        <div className="hidden desktop:inline-block">
          <GithubStars />
        </div>
      </div>
      <ul className="hidden desktop:flex items-center">
        <li className="pr-6 border-r">
          <NavLink href="/" label="Doc Home" matchPath="/docs" />
        </li>
        <li className="px-6 border-r">
          <WithVersionLink href="/api/" label="API" matchPath="/api" />
        </li>
        <li className="px-6 border-r">
          <DropdownNavbarItem
            description={
              <>
                <div className='pb-4'>
                  {translate({
                    id: 'theme.navbar.resourceinfo',
                    message:
                      "Get inspired by Taichi's users stories, blogs, and Graphics courses.",
                  })}
                </div>
                <div>
                  <a href="/blog">
                    {translate({
                      id: 'theme.text.learnmore',
                      message: 'Learn more',
                    })}
                  </a>
                </div>
              </>
            }
            label="Resources"
            items={[
              { label: 'Blogs', href: '/blog' },
              { label: 'Newsletters', href: '/newsletter' },
              { label: 'User Stories', href: '/user-stories' },
              { label: 'Taichi Graphics Course', href: '/tgc01/' },
            ]}
          />
        </li>
        <li className="px-6 border-r">
          <DropdownNavbarItem
            description={
              <>
                <div className="pb-4">
                  {translate({
                    id: 'theme.navbar.communityinfo',
                    message: "Join Taichi's Community.",
                  })}
                </div>
                <div>
                  <a href="https://github.com/taichi-dev/taichi">
                    {translate({
                      id: 'theme.text.learnmore',
                      message: 'Learn more',
                    })}
                  </a>
                </div>
              </>
            }
            label="Community"
            items={[
              {
                label: 'Global Forum',
                href: 'https://github.com/taichi-dev/taichi/discussions',
              },
              { label: '中文论坛', href: 'https://forum.taichi.graphics/' },
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/taichicommunity/shared_invite/zt-14ic8j6no-Fd~wKNpfskXLfqDr58Tddg',
              },
              { label: 'WeChat', href: '' },
            ]}
          />
        </li>
        <li className="ml-6">
          <VersionDropdownNavbarItem />
        </li>
        <li className="ml-6">
          <LocaleDropdownNavbarItem />
        </li>
        <li className="ml-6">
          <Toggle
            checked={colorModeToggle.isDarkTheme}
            onChange={colorModeToggle.toggle}
          />
        </li>
      </ul>
      <div
        className="inline-block desktop:hidden cursor-pointer"
        onClick={mobileSidebar.toggle}
      >
        <MenuIcon />
      </div>
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={mobileSidebar.toggle}
      />
      {mobileSidebar.shouldRender && (
        <NavbarMobileSidebar
          sidebarShown={mobileSidebar.shown}
          toggleSidebar={mobileSidebar.toggle}
        />
      )}
    </nav>
  );
}

export default Navbar;
