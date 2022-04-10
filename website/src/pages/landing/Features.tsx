import React, { useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import { Transition } from '@headlessui/react';
import Particle from '../../components/applications/particle';
import { SwiperConfig } from '../../config';
import { ComponentProps } from './header';
import { UserStory } from '../../../src/components/rotate';
import styles from './index.module.scss';
import { MobileApplication } from '../../components/rotate';

interface FeaturesProps extends ComponentProps {
  index: number;
}
export enum FeaturePositions {
  Left = 'left',
  Right = 'right',
}

const ApplicationOptions = [
  {
    title: 'Real-time Physics for AR & Games',
    description:
      "Thanks to Taichi's AOT (Ahead-of-time) compilation solution, high-performance real-time physical simulations can be readily deployed on PCs or mobile devices.",
    component: (theme?: string) => {
      return <Particle theme={theme} />;
    },
  },
  {
    title: 'Numerical Computation',
    type: 'img',
    description:
      'Taichi allows researchers and engineers to quickly validate their assumptions and ideas, significantly increasing the efficiency of developing massive-scale scientific computation programs.',
    component: (
      <img style={{ height: '100%' }} src="/img/landingpage/karman.gif" />
    ),
  },
  {
    title: 'AI & ML',
    type: 'img',
    description:
      "Taichi's automatic differentiation feature supports end-to-end training of irregular neural network units, making complicated optimization or learning tasks a breeze.",
    component: (
      <img style={{ height: '100%' }} src="/img/landingpage/liquid.gif" />
    ),
  },
  {
    title: 'Vision & Robotics',
    type: 'video',
    description:
      "Taichi's automatic parallelization on GPU devices ensures high throughput for real-world data processing. This is of critical importance to Computer Vision and Robotics.",
    component: (
      <video
        style={{ width: '100%', marginTop: '-20px' }}
        src="https://taichi-graphics-prod-official-website.oss-cn-beijing.aliyuncs.com/taichislam.mp4"
        autoPlay
        loop
        controls
        preload="auto"
      ></video>
    ),
  },
  {
    title: 'Visual Effects',
    type: 'video',
    description:
      "Similar to OpenVDB and SPGrid, Taichi's sparse spatial data structures can be readily accessed to achieve high performance in physically-based animations running on GPUs.",
    component: (
      <video
        autoPlay
        controls
        loop
        preload="auto"
        style={{ width: '100%', marginTop: '-20px' }}
        src="https://taichi-graphics-prod-official-website.oss-cn-beijing.aliyuncs.com/mpm_235M.mp4"
      ></video>
    ),
  },
  {
    title: 'General-purpose Computing',
    type: 'video',
    description:
      "And there's much more. Taichi has found uses in many areas that require parallel computation.",
    component: (
      <video
        autoPlay
        controls
        loop
        preload="auto"
        style={{ height: '100%' }}
        src="https://taichi-graphics-prod-official-website.oss-cn-beijing.aliyuncs.com/graphics-course-collection.mp4"
      ></video>
    ),
  },
];

const ITEMS = (styles) => {
  return SwiperConfig.map((item, index) => (
    <div key={index} className={styles['custom-img']}>
      <div className={styles['text-content']}>
        {item['text']}
        <a href={item.link}>Read more</a>
        <div className={styles['logo']}>
          <span>{item.name}</span>
          <img src={item.src} alt="" />
        </div>
      </div>
    </div>
  ));
};
/**
 * A modular feature component.
 */
export default function Feature({ index, theme, platform }: FeaturesProps) {
  const [inView, setInView] = React.useState(false);
  const [description, setDescription] = React.useState(
    ApplicationOptions[0]['description'],
  );
  const [component, setComponent] = React.useState(
    ApplicationOptions[0]['component'],
  );
  useEffect(() => {
    setTimeout(() => {
      setInView(false);
    });
    setTimeout(() => {
      setInView(true);
      setComponent(ApplicationOptions[index]['component']);
      setDescription(ApplicationOptions[index]['description']);
    }, 300);
  }, [index]);

  return (
    <div>
      <div className={styles['features-content']}>
        {platform === 'pc' ? (
          <>
            <div className={styles['description-content']}>
              <InView onChange={setInView} threshold={0.5} triggerOnce>
                <Transition
                  show={inView}
                  className="animate__animated animate__fadeInLeft"
                >
                  <p className={styles['description']}>{description}</p>
                </Transition>
              </InView>
            </div>
            <InView onChange={setInView} threshold={0.5} triggerOnce>
              <Transition
                show={inView}
                className="animate__animated animate__fadeInRight"
              >
                <div className={styles['panel']}>
                  {component instanceof Function ? component(theme) : component}
                </div>
              </Transition>
            </InView>
          </>
        ) : (
          MobileApplication(ApplicationOptions, styles)
        )}
      </div>
      <div>
        <div className={styles['user-story-title']}>User stories</div>
        <div className={styles['user-story']}>{UserStory(ITEMS(styles))}</div>
      </div>
    </div>
  );
}
