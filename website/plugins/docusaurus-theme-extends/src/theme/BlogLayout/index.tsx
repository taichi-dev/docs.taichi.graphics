/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';

import type {Props} from '@theme/BlogLayout';

import clsx from 'clsx';

function BlogLayout(props: Props): JSX.Element {
  const {sidebar, toc, children, ...layoutProps} = props;

  return (
    <Layout {...layoutProps} pageClassName={clsx('bg-grey-1', layoutProps.pageClassName)}>
      <div className="max-w-docmain desktop:mb-14 space-y-4 mx-auto">
          <main
            itemScope
            itemType="http://schema.org/Blog">
            {children}
          </main>
      </div>
    </Layout>
  );
}

export default BlogLayout;
