/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useRef, memo} from 'react';
import type {Props} from '@theme/Toggle';
import {useThemeConfig, type ColorModeConfig} from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';

import clsx from 'clsx';
import styles from './styles.module.css';

import MoonIcon from './moon.svg'
import SunIcon from './sun.svg'

// Based on react-toggle (https://github.com/aaronshaf/react-toggle/).
const ToggleComponent = memo(
  ({
    className,
    switchConfig,
    checked: defaultChecked,
    disabled,
    onChange,
  }: Props & {
    switchConfig: ColorModeConfig['switchConfig'];
    disabled: boolean;
  }): JSX.Element => {

    const [checked, setChecked] = useState(defaultChecked);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div
        className={clsx(styles.toggle, className, {
          [styles.toggleChecked]: checked,
          [styles.toggleFocused]: focused,
          [styles.toggleDisabled]: disabled,
        })}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={styles.toggleTrack}
          role="button"
          tabIndex={-1}
          onClick={() => inputRef.current?.click()}>
          <div className={clsx(styles.toggleTrackThumb, 'dark:bg-yellow-main bg-brand-cyan')}>
            <MoonIcon className='hidden dark:block' />
            <SunIcon className='dark:hidden' />
          </div>
        </div>

        <input
          ref={inputRef}
          checked={checked}
          type="checkbox"
          className={styles.toggleScreenReader}
          aria-label="Switch between dark and light mode"
          onChange={onChange}
          onClick={() => setChecked(!checked)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              inputRef.current?.click();
            }
          }}
        />
      </div>
    );
  },
);

export default function Toggle(props: Props): JSX.Element {
  const {
    colorMode: {switchConfig},
  } = useThemeConfig();
  const isBrowser = useIsBrowser();

  return (
    <ToggleComponent
      switchConfig={switchConfig}
      disabled={!isBrowser}
      {...props}
    />
  );
}
