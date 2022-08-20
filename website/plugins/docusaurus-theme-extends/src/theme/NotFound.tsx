/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

import NotfoundSvg from './icons/notfound.svg'

function NotFound(): JSX.Element {
  return (
    <Layout
      title={translate({
        id: 'theme.NotFound.title',
        message: 'Page Not Found',
      })}>
      <main className="container pb-20">
        <div className="w-full max-w-[960px] mx-auto flex items-center flex-wrap">
          <NotfoundSvg />
          <div className='mt-6 w-full desktop:w-fit text-center desktop:text-left desktop:ml-32'>
            <h1 className='font-bold mb-4'>Page not found.</h1>
            <div className='mb-8 text-grey-4'>Refresh the page or get back later</div>
            <button className='rounded-sm border bg-brand-cyan text-white py-2 text-center min-w-[9rem] w-full desktop:w-min' onClick={() => document.location.reload()}>Refresh</button>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default NotFound;
