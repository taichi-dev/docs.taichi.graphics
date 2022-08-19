import React from 'react';
import Layout from '@theme/Layout';

import { ThemeClassNames } from '@docusaurus/theme-common';

import { useDocsPreferredVersion } from '@docusaurus/theme-common';

import DocPageLayout from '../DocPageLayout';

import { translate } from '@docusaurus/Translate';

import clsx from 'clsx';
import styles from './styles.module.css';

import ArrowRight from './arrow-right.svg';
import UserIcon from './user.svg';
import NormalUserBg from './simple.svg';
import DeveloperUserBg from './complex.svg';
import AnotherWorldGif from './Another-World.gif'

import type {
  PropSidebarItemCategory,
  PropSidebarItem,
} from '@docusaurus/plugin-content-docs';

const ArticleCategoryCard: React.FC<{ category: PropSidebarItemCategory }> = ({
  category,
}) => {
  return (
    <div className="flex flex-col shadow rounded-sm border border-grey-2 p-4 space-y-3">
      <div className="flex">
        <div className="text-h5 font-bold">{category.label}</div>
      </div>
      <div className="flex-1">
        <ul className="list-disc pl-4">
          {category.items.map((item, index) => {
            if (index >= 5) return null;
            return (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {category.items.length > 5 && (
          <a
            href={category.href || category.items[0].href}
            className="flex items-center text-brand-cyan font-bold"
          >
            <span>
              {translate({
                id: 'theme.docs.docHome.readmore',
                message: 'Read More',
              })}
            </span>
            <ArrowRight className="ml-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default (props) => {
  return (
    <Layout
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsDocPage}
    >
      <DocPageLayout sidebar={props.sidebar}>
        <div className="max-w-[988px] mx-auto">
          <div className="text-h3 desktop:pb-5 pb-4">Doc Home</div>
          <div className="flex justify-between flex-col desktop:flex-row desktop:space-x-5 desktop:mb-5">
            <div className="relative flex-1 h-32 overflow-hidden brand-blue-gradients rounded-sm mb-4">
              <div className="absolute left-[181px] inset-y-0">
                <NormalUserBg />
              </div>
              <div className="relative flex flex-col justify-between h-full px-5 pt-3 pb-4 text-black">
                <div className="text-caption">
                  {translate({
                    id: 'theme.docs.docHome.userhint',
                    message: 'Accelerate the Python frontend.',
                  })}
                </div>
                <div className="flex flex-col">
                  <UserIcon />
                  <a href="/docs" className="flex justify-between items-center">
                    <div className="text-h3">User</div>
                    <span>
                      <ArrowRight />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative flex-1 h-32 overflow-hidden brand-cyan-gradients rounded-sm mb-4">
              <div className="absolute left-[181px] inset-y-0">
                <DeveloperUserBg />
              </div>
              <div className="relative flex flex-col justify-between h-full px-5 pt-3 pb-4 text-black">
                <div className="text-caption">
                  {translate({
                    id: 'theme.docs.docHome.developerhint',
                    message: 'Deploy Taichi programs in production.',
                  })}
                </div>
                <div className="flex flex-col">
                  <UserIcon />
                  <a
                    href="/docs/dev_install"
                    className="flex justify-between items-center"
                  >
                    <div className="text-h3">Developer</div>
                    <ArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-24 rounded-sm bg-[#111015] desktop:mb-10 mb-6">
            <div className="absolute right-0 flex items-center inset-y-0 overflow-hidden">
              <img src={AnotherWorldGif} />
            </div>
            <div className="flex relative flex-col h-full text-white justify-between px-4 py-3">
              <div className="flex justify-between">
                <div className="text-caption">
                  {translate({
                    id: 'theme.docs.docHome.slogan',
                    message: 'Develop elegantly.',
                  })}
                </div>
                <div className="text-caption hidden desktop:block">
                  {translate({
                    id: 'theme.docs.docHome.voxel',
                    message: 'Image by peng-bo in Voxel Challenge 2022',
                  })}
                </div>
              </div>
              <a href="/api/">
                <div className="flex justify-between">
                  <div className="text-h4 text-brand-cyan-gradients">
                    {translate({
                      id: 'theme.docs.docHome.gotoapi',
                      message: 'Taichi’s API reference here',
                    })}
                  </div>
                  <ArrowRight />
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-4 md:space-y-5">
            <div className="text-h2">
              {translate({
                id: 'theme.docs.docHome.expandedviewofdocs',
                message: 'Expanded View of Docs',
              })}
            </div>
            <div className="grid grid-cols-1 desktop:grid-cols-3 gap-4 desktop:gap-5">
              {props.sidebar.map((item: PropSidebarItem, index) => {
                if (item.type === 'category' && item.items.length > 0) {
                  return <ArticleCategoryCard key={index} category={item} />;
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </DocPageLayout>
    </Layout>
  );
};
