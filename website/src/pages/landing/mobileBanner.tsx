import React from 'react';
import { message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'antd/lib/message/style/index.css';
import { ComponentProps } from './header';
import { Efficient } from '../../components/rotate';
import styles from './index.mobile.module.scss';
import { StarOutlined, GithubOutlined } from '@ant-design/icons';

import BrowserOnly from '@docusaurus/BrowserOnly';
export default class Banner extends React.Component<ComponentProps> {
  installPython: string;
  execPython: string;
  constructor(props) {
    super(props);
    this.installPython = 'python3 -m pip install taichi';
    this.execPython = 'python3 -m taichi gallery';
    this.state = {
      stars: '',
    };
  }
  componentDidMount() {
    fetch('https://api.github.com/repos/taichi-dev/taichi')
      .then((response) => response.json())
      .then((data) => {
        const stars = (data.stargazers_count / 1000).toFixed(1) + ' k';
        this.setState({ stars: stars });
      });
  }
  render() {
    return (
      <div className={styles['banner']}>
        <div className={styles['banner-ribbon']}></div>
        <div className={styles['banner-content']}>
          <Lists />
          <div className={styles['command']} style={{ float: 'right' }}>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div className={styles['input']}>{this.installPython}</div>
              <CopyToClipboard
                text={this.installPython}
                top={200}
                onCopy={() => message.success('Copied successfully!')}
              >
                <div className={styles['btn']}></div>
              </CopyToClipboard>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div className={styles['input']}>{this.execPython}</div>
              <CopyToClipboard
                text={this.execPython}
                onCopy={() => message.success('Copied successfully!')}
              >
                <div className={styles['btn']}></div>
              </CopyToClipboard>
            </div>
            <a
              href="/lang/articles/basic/overview"
              className={styles['documentation']}
            >
              Documentation
            </a>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <a target="_blank" href="https://github.com/taichi-dev/taichi">
                <GithubOutlined
                  style={{
                    fontSize: '20px',
                    marginRight: '10px',
                    marginTop: '32px',
                  }}
                />
                <StarOutlined />
                &nbsp; {this.state.stars}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Lists = () => {
  return (
    <BrowserOnly>
      {() => (
        <div className={styles['list-content']}>
          <p className={styles['lists']}>
            <p>
              The<span>Taichi</span>
            </p>
            <p>Programming</p>
            <p>Language</p>
          </p>
          <p className={styles['sub-banner']}>
            <p style={{ paddingTop: '19px' }}>
              &nbsp;Parallel Programming for everyone:
            </p>
            <div>
              <Efficient />
            </div>
          </p>
        </div>
      )}
    </BrowserOnly>
  );
};
