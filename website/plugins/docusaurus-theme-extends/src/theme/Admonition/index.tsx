/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Admonition';

import TipIcon from './coffee.svg'
import NoteIcon from './book-open.svg'
import AlertIcon from './alert-octagon.svg'

const icons = {
  note: (
    <NoteIcon />
  ),
  tip: (
    <TipIcon />
  ),
  danger: (
    <AlertIcon />
  ),
  info: (
    <AlertIcon />
  ),
  caution: (
    <AlertIcon />
  ),
};

const ifmClassNames = {
  note: 'secondary',
  tip: 'success',
  danger: 'danger',
  info: 'info',
  caution: 'warning',
};

export default function Admonition({
  children,
  type,
  title = type,
  icon = icons[type],
}: Props): JSX.Element {
  return (
    <div
      className={clsx(
        'admonition',
        `admonition-${type}`,
        'alert',
        `alert--${ifmClassNames[type]}`,
      )}>
      <div className="admonition-heading">
        <h5>
          <span className="admonition-icon">{icon}</span>
          {title}
        </h5>
      </div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
