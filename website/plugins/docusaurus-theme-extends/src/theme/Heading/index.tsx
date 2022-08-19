/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import { useThemeConfig } from '@docusaurus/theme-common';

import copy from 'copy-text-to-clipboard';

import LinkIcon from './link.svg'

import './styles.css';
import styles from './styles.module.css';

function AnchorHeading({ as: As, id, ...props }: Props) {
  const [showCopied, setShowCopied] = useState(false);
  const {
    navbar: { hideOnScroll },
  } = useThemeConfig();

  if (!id) {
    return <As {...props} />;
  }

  const copyHashLink = () => {
    const location = window.location;
    copy(location.origin + location.pathname + '#' + id);
    setShowCopied(true);

    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <As
      {...props}
      className={clsx('anchor', {
        [styles.anchorWithHideOnScrollNavbar]: hideOnScroll,
        [styles.anchorWithStickyNavbar]: !hideOnScroll,
      })}
      id={id}
    >
      {props.children}
      <a
        className="hash-link"
        onClick={copyHashLink}
        title={translate({
          id: 'theme.common.headingLinkTitle',
          message: 'Direct link to heading',
          description: 'Title for link to heading',
        })}
      >
        <LinkIcon />
      </a>
      <span className={styles.anchorCopiedText}>
        {showCopied && (
          <Translate
            id="theme.anchorHeading.copied"
            description="The copied button label on anchor heading"
          >
            URL copied
          </Translate>
        )}
      </span>
    </As>
  );
}

export default function Heading({ as, ...props }: Props): JSX.Element {
  if (as === 'h1') {
    return (
      <h1
        {...props}
        id={undefined} // h1 headings do not need an id because they don't appear in the TOC
      >
        {props.children}
      </h1>
    );
  }
  return <AnchorHeading as={as} {...props} />;
}
