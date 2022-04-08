import React from 'react';
import Feature from './Feature';
import styles from './index.module.scss';

export interface FeatureProps {
  leftComponent?: any;
  rightComponent?: any;
  styles?: any;
}
export interface DevelopProps {
  title?: string;
  description?: string;
  features?: FeatureProps[];
  theme?: string;
  platform?: string;
}

export default function Develop({
  title,
  description,
  theme,
  features,
  platform,
}: DevelopProps) {
  return (
    <div className={styles['description-wrapper']}>
      <div className={styles['title']}>
        <p>{title}</p>
      </div>
      {features &&
        features.map((feature: any) => (
          <Feature
            theme={theme}
            platform={platform}
            position={feature.styles}
            left={feature.leftComponent}
            right={feature.rightComponent}
            feature={feature}
          />
        ))}
    </div>
  );
}
