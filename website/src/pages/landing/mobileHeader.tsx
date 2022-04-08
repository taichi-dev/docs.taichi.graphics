import React, { useState } from 'react';
import { Popup, Button, Collapse } from 'antd-mobile';
import { CloseOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { NAV_IMG } from '../../config';
import { generateUrl } from '../../utils';
import styles from './index.mobile.module.scss';

import { ComponentProps } from './Header';

export default (props: ComponentProps) => {
  const [visible6, setVisible6] = useState(false);
  const { theme } = props;
  return (
    <div className={styles['custom-header']}>
      <div className={styles['logo']}>
        <img
          src={theme === 'light' ? NAV_IMG.logo.light : NAV_IMG.logo.night}
        />
      </div>
      <UnorderedListOutline
        onClick={() => {
          setVisible6(true);
        }}
      />
      <Popup
        visible={visible6}
        position="right"
        bodyStyle={{ width: '100vw' }}
        onMaskClick={() => {
          setVisible6(false);
        }}
      >
        <div style={{ height: '100vh', overflow: 'auto' }}>
          <div className={styles['Popup-close']}>
            <CloseOutline
              onClick={() => {
                setVisible6(false);
              }}
            />
          </div>
          <div>
            <a href="/docs" className={styles['menu-line']}>
              Docs
            </a>
            <a href="/blog" className={styles['menu-line']}>
              Blog
            </a>
            <Collapse accordion>
              <Collapse.Panel key="1" title="Reources">
                <a href="/events" className={styles['menu-line']}>
                  Events
                </a>
                <a href="/tgc01" className={styles['menu-line']}>
                  Curriculum
                </a>
              </Collapse.Panel>
              <Collapse.Panel key="2" title="Community">
                <a
                  className={styles['menu-line']}
                  target="_blank"
                  href="https://taichicommunity.slack.com/ssb/redirect"
                >
                  Slack
                </a>
                <a
                  className={styles['menu-line']}
                  target="_blank"
                  href="https://github.com/taichi-dev/taichi/discussions"
                >
                  GitHub Discussions
                </a>
                <a href="/forum" className={styles['menu-line']}>
                  Forum
                </a>
                <a href="/user_stories" className={styles['menu-line']}>
                  User Stories
                </a>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      </Popup>
    </div>
  );
};
