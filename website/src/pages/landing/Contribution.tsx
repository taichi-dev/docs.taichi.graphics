import React, { useState } from 'react';
import { FeatureSectionProps } from './Develop';
import { generateUrl } from '../../utils';
import { communityImg } from '../../config';
import styles from './index.module.scss';

export default function Contribution(props: FeatureSectionProps) {
  const { theme, platform } = props;
  const [indexKey, setIndex] = useState('');
  const onMouseEnter = (index) => {
    setIndex(index);
  };
  const onMouseLeave = () => {
    setIndex('');
  };
  return (
    <div className={styles['contribution']}>
      <div className={styles['title']}>Thrive through open-source</div>
      <img
        style={{ marginTop: '50px' }}
        src={
          platform === 'pc'
            ? '/img/landingpage/User Avtars.svg'
            : '/img/landingpage/Mobile_community.svg'
        }
      />
      <div className={styles['contribution_content']}>
        <div className={styles['community']}>Community</div>
        <div className={styles['flexable']}>
          {communityImg.map((item, index) => (
            <a href={item.url} target="_blank">
              <img
                onMouseEnter={() => {
                  onMouseEnter(index);
                }}
                onMouseLeave={() => {
                  onMouseLeave();
                }}
                src={generateUrl(item, theme, index, indexKey)}
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
