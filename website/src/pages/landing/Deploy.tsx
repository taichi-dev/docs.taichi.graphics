import React from 'react';
import Feature from './Feature';
import { FeatureProps } from './Develop';
import styles from './index.module.scss';

interface FeatureSectionProps {
  title?: string;
  features: FeatureProps[];
  theme?: any;
}

export default function FeatureSection({
  title,
  features,
  theme,
}: FeatureSectionProps) {
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
            position={feature.styles}
            left={feature.leftComponent}
            right={feature.rightComponent}
          />
        ))}
    </div>
  );
}
