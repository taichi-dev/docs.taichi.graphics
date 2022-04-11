import React, { useState } from 'react';
import { Popup, Collapse } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import { NAV_IMG } from '../../config';
import styles from './index.mobile.module.scss';

import { ComponentProps } from './header';

export default (props: ComponentProps) => {
  const [visible6, setVisible6] = useState(false);
  const [themeState, setThemeState] = useState(true);
  const { theme } = props;
  const { callback } = props;
  return (
    <div className={styles['custom-header']}>
      <div className={styles['logo']}>
        <img
          src={theme === 'light' ? NAV_IMG.logo.light : NAV_IMG.logo.night}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={
            themeState
              ? '/img/landingpage/Sun.svg'
              : '/img/landingpage/Moon.svg'
          }
          onClick={() => {
            callback(themeState);
            setThemeState(!themeState);
          }}
          style={{ marginRight: '30px' }}
          alt=""
        />
        <img
          onClick={() => {
            setVisible6(true);
          }}
          src="/img/landingpage/burger_menu.svg"
          alt=""
        />
      </div>

      <Popup
        visible={visible6}
        position="right"
        bodyStyle={{
          width: '100vw',
          background: theme === 'light' ? '#fff' : '#000',
        }}
        onMaskClick={() => {
          setVisible6(false);
        }}
      >
        <div style={{ height: '100vh', overflow: 'auto' }}>
          <div className={styles['Popup-close']}>
            <img
              style={{ width: '20px', height: '20px' }}
              onClick={() => {
                setVisible6(false);
              }}
              src="/img/landingpage/close_moible.svg"
              alt=""
            />
          </div>
          <div className={theme === 'night' ? 'collapseDark' : 'collapseLight'}>
            <a
              href="https://docs.taichi-lang.org/docs"
              className={styles['menu-line']}
            >
              Docs
            </a>
            <a
              href="https://docs.taichi-lang.org/blog"
              className={styles['menu-line']}
            >
              Blog
            </a>
            <Collapse
              accordion
              style={{ background: theme === 'light' ? '#fff' : '#000' }}
            >
              <Collapse.Panel
                key="1"
                title="Reources"
                style={{
                  background: theme === 'light' ? '#fff' : '#000',
                }}
              >
                <a
                  href="https://docs.taichi-lang.org/tgc01"
                  className={styles['menu-line']}
                >
                  Curriculum
                </a>
              </Collapse.Panel>
              <Collapse.Panel
                key="2"
                title="Community"
                style={{ background: theme === 'light' ? '#fff' : '#000' }}
              >
                <a
                  className={styles['menu-line']}
                  target="_blank"
                  href="https://taichicommunity.slack.com/ssb/redirect"
                >
                  Slack
                </a>
                <a
                  target="_blank"
                  href="https://github.com/taichi-dev/taichi/discussions"
                  className={styles['menu-line']}
                >
                  Forum
                </a>
                <a
                  target="_blank"
                  href="https://forum.taichi.graphics/"
                  className={styles['menu-line']}
                >
                  论坛
                </a>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      </Popup>
    </div>
  );
};
