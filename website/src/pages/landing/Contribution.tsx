import React, { useState } from 'react';
import { FeatureSectionProps } from './Develop';
import { generateUrl } from '../../utils';
import { communityImg } from '../../config';
import styles from './index.module.scss';

export default function Application(props: FeatureSectionProps) {
  const { theme } = props;
  return (
    <div className={styles['contribution']}>
      <div className={styles['title']}>Thrive through open-source</div>
      <img
        style={{ marginTop: '80px' }}
        src="/img/landingpage/User Avtars.svg"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '280px',
        }}
      >
        <div className={styles['community']}>Community</div>
        <div>
          {communityImg.map((item) => (
            <a href={item.url} target="_blank">
              <img
                style={{ width: '90px', marginLeft: '60px' }}
                src={generateUrl(item, theme)}
                alt=""
              />
            </a>
          ))}
        </div>
      </div>
      <p className={styles['liscense']}>
        ©Taichi Lang.2022 All rights reserved.
      </p>
    </div>
  );
}
