import React, { useState } from 'react';
import Features from './Features';
import styles from './index.module.scss';
import BrowserOnly from '@docusaurus/BrowserOnly';

import { ComponentProps } from './Header';

export default function Application({ theme, platform }: ComponentProps) {
  const [key, setKey] = useState(0);
  const handleClick = (index) => {
    setKey(index);
  };
  return (
    <div className={styles['applications']}>
      <div className={styles['title']}>Applications</div>
      {platform === 'pc' ? (
        <div style={{ margin: '80px 0 0 -20px' }}>
          {Menus(key, handleClick)}
        </div>
      ) : (
        ''
      )}
      <Features index={key} theme={theme} platform={platform} />
    </div>
  );
}

const MenusConfig = [
  {
    render: (
      <div className={styles['item']}>
        <p>Real-time Physics</p>
        <p>for AR & Games</p>
      </div>
    ),
  },
  {
    render: (
      <div className={styles['item']}>
        <p>Numerical</p>
        <p>Computation</p>
      </div>
    ),
  },
  {
    render: <div className={styles['item']}>AI & ML</div>,
  },
  {
    render: <div className={styles['item']}>Vision & Robotics</div>,
  },
  {
    render: <div className={styles['item']}>Visual Effects</div>,
  },
  {
    render: (
      <div className={styles['item']}>
        <p>General-purpose</p>
        <p>Computing</p>
      </div>
    ),
  },
];

const Menus = (key, tabChange) => {
  return (
    <BrowserOnly>
      {() => (
        <div className={styles['my-menu']}>
          <ul className={styles['menu-ul']}>
            {MenusConfig &&
              MenusConfig?.map((item, index) => {
                return (
                  <li
                    className={`${styles['normal']} ${
                      index === key ? styles['active-normal'] : ''
                    }`}
                    onClick={() => tabChange(index)}
                  >
                    {item.render}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </BrowserOnly>
  );
};
