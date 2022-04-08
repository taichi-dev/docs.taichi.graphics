import React from 'react';
import { InView } from 'react-intersection-observer';
import { Transition } from '@headlessui/react';
import { LinkOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import BrowserOnly from '@docusaurus/BrowserOnly';

export enum FeaturePositions {
  Left = 'left',
  Right = 'right',
}

export interface FeatureProps {
  position?: any;
  left?: any;
  right?: any;
  theme?: string;
  platform?: string;
  feature?: any;
}

export default function Feature({
  position,
  left,
  right,
  theme,
  platform,
  feature,
}: FeatureProps) {
  const [inView, setInView] = React.useState(false);
  if (left?.type === 'module') {
    if (platform === 'mobile') {
      return (
        <BrowserOnly>
          {() => (
            <div className={styles['feature-content']} style={position}>
              <div style={right.styles}>
                <InView onChange={setInView} threshold={0.5} triggerOnce>
                  <Transition
                    show={inView}
                    className="animate__animated animate__fadeInRight"
                  >
                    <div aria-hidden="true" style={{ position: 'relative' }}>
                      {right?.description && (
                        <p className={styles['description']}>
                          {right.description}
                        </p>
                      )}
                      {right?.child &&
                        right.child.map((item: any) => (
                          <div key={item.name} className={styles['item']}>
                            <dt className={styles['item-icon']}></dt>
                            <dd
                              className={styles['item-text']}
                              style={item.style}
                            >
                              {item.description}
                              {item.link && renderLinkLong(item.link, item.url)}
                            </dd>
                          </div>
                        ))}
                    </div>
                  </Transition>
                </InView>
              </div>
              <div style={left.styles}>
                <InView onChange={setInView} threshold={0.5} triggerOnce>
                  <Transition
                    show={inView}
                    className="animate__animated animate__fadeInLeft"
                  >
                    {left.child instanceof Function
                      ? left?.child({ theme: theme })
                      : left?.child}
                  </Transition>
                </InView>
              </div>
            </div>
          )}
        </BrowserOnly>
      );
    }
    return (
      <BrowserOnly>
        {() => (
          <div className={styles['feature-content']} style={position}>
            <div style={left.styles}>
              <InView onChange={setInView} threshold={0.5} triggerOnce>
                <Transition
                  show={inView}
                  className="animate__animated animate__fadeInLeft"
                >
                  {left.child instanceof Function
                    ? left?.child({ theme: theme })
                    : left?.child}
                </Transition>
              </InView>
            </div>
            <div style={right.styles}>
              <InView onChange={setInView} threshold={0.5} triggerOnce>
                <Transition
                  show={inView}
                  className="animate__animated animate__fadeInRight"
                >
                  <div aria-hidden="true" style={{ position: 'relative' }}>
                    {right?.description && (
                      <p className={styles['description']}>
                        {right.description}
                      </p>
                    )}
                    {right?.child &&
                      right.child.map((item: any) => (
                        <div key={item.name} className={styles['item']}>
                          <dt className={styles['item-icon']}></dt>
                          <dd
                            className={styles['item-text']}
                            style={item.style}
                          >
                            {item.description}
                            {item.link && renderLinkLong(item.link, item.url)}
                          </dd>
                        </div>
                      ))}
                  </div>
                </Transition>
              </InView>
            </div>
          </div>
        )}
      </BrowserOnly>
    );
  }
  return (
    <BrowserOnly>
      {() => (
        <div className={styles['feature-content']} style={position}>
          <div style={left.styles}>
            <InView onChange={setInView} threshold={0.5} triggerOnce>
              <Transition
                show={inView}
                className="animate__animated animate__fadeInLeft"
              >
                {left?.description && (
                  <p className={styles['description']}>{left.description}</p>
                )}
                {left?.child &&
                  left.child.map((item: any) => (
                    <div key={item.name} className={styles['item']}>
                      <dt className={styles['item-icon']}></dt>
                      <dd className={styles['item-text']} style={item.style}>
                        {item.description}
                        {item.link && renderLink(item.link, item.url)}
                      </dd>
                    </div>
                  ))}
              </Transition>
            </InView>
          </div>
          <div style={right.styles}>
            <InView onChange={setInView} threshold={0.5} triggerOnce>
              <Transition
                show={inView}
                className="animate__animated animate__fadeInRight"
              >
                {right?.child && right.child}
              </Transition>
            </InView>
          </div>
        </div>
      )}
    </BrowserOnly>
  );
}

function renderLink(link, url) {
  if (link)
    return (
      <BrowserOnly>
        {() => (
          <a
            className={styles['link-img']}
            target="_blank"
            href={url}
            style={{ color: '#687DE5' }}
          >
            {link}
            &nbsp;
          </a>
        )}
      </BrowserOnly>
    );
}
function renderLinkLong(link, url) {
  if (link)
    return (
      <BrowserOnly>
        {() => (
          <a
            className={styles['link-imglong']}
            target="_blank"
            href={url}
            style={{ color: '#687DE5' }}
          >
            {link}
            &nbsp;
          </a>
        )}
      </BrowserOnly>
    );
}
