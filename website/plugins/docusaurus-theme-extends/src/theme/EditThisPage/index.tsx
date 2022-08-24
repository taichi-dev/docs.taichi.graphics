/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Translate from '@docusaurus/Translate';

import type {Props} from '@theme/EditThisPage';
// import IconEdit from '@theme/IconEdit';
import IconEdit from '../icons/edit.svg';
import {ThemeClassNames} from '@docusaurus/theme-common';
import clsx from 'clsx';

export default function EditThisPage({editUrl}: Props): JSX.Element {
  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={clsx(ThemeClassNames.common.editThisPage, 'flex items-center')}>
      <IconEdit width={16} height={16} className='mr-1'   />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page">
        Edit this page
      </Translate>
    </a>
  );
}
