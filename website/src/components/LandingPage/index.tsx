import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

import { ThemeClassNames, useDocsPreferredVersion } from '@docusaurus/theme-common';

import DocPageLayout from '../DocPageLayout';

import Translate, { translate } from '@docusaurus/Translate';

import AsyncImage from '@theme/AsyncImage'

import ArrowRight from './arrow-right.svg';
import UserIcon from './user.svg';
import PackageIcon from './package.svg';
import NormalUserBg from './simple.svg';
import DeveloperUserBg from './complex.svg';
import AnotherWorldGif from './Another-World.gif';

import type {
  PropSidebarItemCategory,
  PropSidebarItem,
} from '@docusaurus/plugin-content-docs';
import {
  useLatestVersion
} from '@docusaurus/plugin-content-docs/client'
import Link from '@docusaurus/Link';

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
                <Link href={item.href}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
};

const LandingPageView = (props) => {
  const { savePreferredVersionName } = useDocsPreferredVersion('default');
  const version = useLatestVersion()
  useEffect(() => {
    if (version) {
      savePreferredVersionName(version.name);
    }
  }, [version]);
  return (
    <DocPageLayout sidebar={props.sidebar}>
      <div className="max-w-[988px] mx-auto">
        <div className="text-h3 desktop:pb-5 pb-4 font-bold">
          {translate({
            id: 'theme.text.dochome',
            message: 'Doc Home',
          })}
        </div>
        <div className="flex justify-between flex-col desktop:flex-row desktop:space-x-5 desktop:mb-5">
          <div className="relative flex-1 h-32 overflow-hidden brand-blue-gradients rounded-sm mb-4">
            <div className="absolute left-[181px] inset-y-0">
              <NormalUserBg />
            </div>
            <Link href='/docs/hello_world' className="relative flex flex-col justify-between h-full px-5 pt-3 pb-4 text-black cursor-pointer hover:text-white">
              <div className="text-caption mb-2 text-black">
                {translate({
                  id: 'theme.docs.docHome.userhint',
                  message: 'Accelerate the Python frontend.',
                })}
              </div>
              <div className="flex flex-col">
                <UserIcon />
                <div className="flex justify-between items-center font-bold">
                  <div className="text-h3">
                    {translate({
                      id: 'theme.text.pythonuser',
                      message: 'Python User',
                    })}
                  </div>
                  <span>
                    <ArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="relative flex-1 h-32 overflow-hidden brand-cyan-gradients rounded-sm mb-4">
            <div className="absolute left-[181px] inset-y-0">
              <DeveloperUserBg />
            </div>
            <Link
              href="/docs/master/ndarray_android"
              className="relative flex flex-col justify-between h-full px-5 pt-3 pb-4 text-black cursor-pointer hover:text-white"
            >
              <div className="text-caption  mb-2 text-black">
                {translate({
                  id: 'theme.docs.docHome.developerhint',
                  message: 'Deploy Taichi programs in production.',
                })}
              </div>
              <div className="flex flex-col">
                <PackageIcon />
                <div className="flex justify-between items-center font-bold">
                  <div className="text-h3">
                    {translate({
                      id: 'theme.text.aotdeployment',
                      message: 'AOT Deployment',
                    })}
                  </div>
                  <ArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Link href="/api/" className="relative block h-24 rounded-sm bg-black desktop:mb-10 mb-6">
          <div className="absolute right-0 flex items-center inset-y-0 overflow-hidden">
            <AsyncImage src={AnotherWorldGif} />
          </div>
          <div className="flex relative flex-col h-full text-white justify-between px-4 py-3">
            <div className="flex justify-between">
              <div className="text-caption">
                {translate({
                  id: 'theme.docs.docHome.slogan',
                  message: 'Develop elegantly.',
                })}
              </div>
              <div className="text-caption hidden font-light desktop:block">
                Image by <span className="font-normal">peng-bo</span> in Voxel
                Challenge 2022
              </div>
            </div>
              <div className="flex justify-between font-bold">
                <div className="text-h4 text-brand-cyan-gradients">
                  {translate({
                    id: 'theme.docs.docHome.gotoapi',
                    message: 'Taichi’s API reference here',
                  })}
                </div>
                <ArrowRight />
              </div>
          </div>
        </Link>
        <div className="space-y-4 md:space-y-5">
          <div className="text-h2 font-bold">
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
  );
};

export default (props) => {
  return <Layout wrapperClassName={ThemeClassNames.wrapper.docsPages}
  pageClassName={ThemeClassNames.page.docsDocPage}>
    <LandingPageView {...props} />
  </Layout>
}
