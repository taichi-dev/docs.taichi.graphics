/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {ThemeClassNames, useDocsVersion} from '@docusaurus/theme-common';
import clsx from 'clsx';
import type {Props} from '@theme/DocVersionBadge';

export default function DocVersionBadge({
  className,
}: Props): JSX.Element | null {
  const versionMetadata = useDocsVersion();
  if (versionMetadata.badge) {
    return (
      <span className='text-grey-4 text-caption'>
        Version: {versionMetadata.label}
      </span>
    );
  }
  return null;
}
