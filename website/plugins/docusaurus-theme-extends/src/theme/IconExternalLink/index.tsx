/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import type { Props } from '@theme/IconExternalLink';

import styles from './styles.module.css';

function IconExternalLink({ width = 16, height = 16 }: Props): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.iconExternalLink}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.82353 6.88235C5.57391 6.88235 5.33452 6.98151 5.15802 7.15802C4.98151 7.33452 4.88235 7.57391 4.88235 7.82353V18.1765C4.88235 18.4261 4.98151 18.6655 5.15802 18.842C5.33452 19.0185 5.57391 19.1176 5.82353 19.1176H16.1765C16.4261 19.1176 16.6655 19.0185 16.842 18.842C17.0185 18.6655 17.1176 18.4261 17.1176 18.1765V12.5294C17.1176 12.0096 17.539 11.5882 18.0588 11.5882C18.5786 11.5882 19 12.0096 19 12.5294V18.1765C19 18.9253 18.7025 19.6435 18.173 20.173C17.6435 20.7025 16.9253 21 16.1765 21H5.82353C5.07468 21 4.35651 20.7025 3.82699 20.173C3.29748 19.6435 3 18.9253 3 18.1765V7.82353C3 7.07468 3.29748 6.35651 3.82699 5.82699C4.35651 5.29748 5.07468 5 5.82353 5H11.4706C11.9904 5 12.4118 5.42138 12.4118 5.94118C12.4118 6.46097 11.9904 6.88235 11.4706 6.88235H5.82353Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 3.875C14 3.39175 14.3918 3 14.875 3H20.125C20.6082 3 21 3.39175 21 3.875V9.125C21 9.60825 20.6082 10 20.125 10C19.6418 10 19.25 9.60825 19.25 9.125V4.75H14.875C14.3918 4.75 14 4.35825 14 3.875Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.7522 3.24783C21.0826 3.57828 21.0826 4.11403 20.7522 4.44448L11.4445 13.7522C11.114 14.0826 10.5783 14.0826 10.2478 13.7522C9.91739 13.4217 9.91739 12.886 10.2478 12.5555L19.5555 3.24783C19.886 2.91739 20.4217 2.91739 20.7522 3.24783Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default IconExternalLink;
