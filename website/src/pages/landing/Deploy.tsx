import React from 'react';
import Feature from './Feature';
import { FeatureProps } from './Develop';
import styles from './index.module.scss';

interface DeployProps {
  title?: string;
  features: FeatureProps[];
  theme?: string;
  platform?: string;
}

export default function Deploy({
  title,
  features,
  theme,
  platform,
}: DeployProps) {
  return (
    <div className={styles['description-wrapper']}>
      {title && (
        <div className={styles['title']}>
          <p>{title}</p>
        </div>
      )}
      {features &&
        features?.map((feature: any) => (
          <Feature
            theme={theme}
            platform={platform}
            position={feature.styles}
            left={feature.leftComponent}
            right={feature.rightComponent}
          />
        ))}
    </div>
  );
}
