import React from 'react';
import { Switch } from 'antd';
import HeadMenu from './Menu';
import { NAV_IMG } from '../../config';
import { generateUrl } from '../../utils';
import styles from './index.module.scss';
import PropTypes from 'prop-types';
interface CallbackFunc {
  (val: boolean): void;
}
export interface ComponentProps {
  callback: CallbackFunc;
  theme?: string;
  platform?: string;
}
interface NAV_IMG {
  night: string;
  light: string;
}
class Header extends React.Component<ComponentProps> {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
      stars: '',
    };
  }
  componentDidMount() {
    fetch('https://api.github.com/repos/taichi-dev/taichi')
      .then((response) => response.json())
      .then((data) => {
        let stars;
        if (data.stargazers_count) {
          stars = (data.stargazers_count / 1000).toFixed(1) + ' k';
        } else {
          stars = '18 k';
        }
        this.setState({ stars: stars });
      });
  }
  handleClick = (e) => {
    this.setState({ current: e.key });
  };
  handleChange = (val) => {
    this.props.callback(val);
  };
  render() {
    const { theme } = this.props;
    return (
      <div className={styles['custom-header']}>
        <div className={styles['logo']}>
          <img src={generateUrl(NAV_IMG.logo, theme, '')} />
        </div>
        <div
          className={theme === 'light' ? 'lightTheme' : 'nightTheme'}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <HeadMenu />
          <Switch
            className={styles['custom-switch']}
            style={{ fontSize: '20px' }}
            checkedChildren={
              <img
                style={{ width: '14px', marginTop: '4px' }}
                src="/img/landingpage/Moon.svg"
              />
            }
            unCheckedChildren={
              <img
                style={{ width: '14px', marginTop: '4px' }}
                src="/img/landingpage/Sun.svg"
              />
            }
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Header;
