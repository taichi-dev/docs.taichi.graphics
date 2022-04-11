import React from 'react';
import Header from './landing/header';
import Banner from './landing/Banner';
import Content from './landing/taichi';

import MobileHeader from './landing/mobileHeader';
import MobileBanner from './landing/mobileBanner';
import 'animate.css';
import PropTypes from 'prop-types';
interface StateProps {
  theme: string;
  platform: string;
}

export default class LandingPage extends React.Component<any, StateProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: 'light',
      platform: 'pc',
    };
    this.onChange = this.onChange.bind(this);
    this.flexable();
  }
  static childContextTypes = {
    theme: PropTypes.string,
  };
  // switch themes
  onChange(val) {
    this.setTheme(val);
    this.setState({ theme: val ? 'night' : 'light' });
  }
  setTheme(type) {
    window.document.documentElement.setAttribute(
      'data-theme',
      type ? 'night' : 'light',
    );
    document.body.style.background = type ? '#000' : '#fff';
  }
  flexable() {
    if (
      document.documentElement.clientWidth < 904 &&
      this.state.platform === 'pc'
    ) {
      this.setState({ platform: 'mobile' });
    }
    if (
      document.documentElement.clientWidth >= 904 &&
      this.state.platform === 'mobile'
    ) {
      this.setState({ platform: 'pc' });
    }
  }
  componentDidMount(): void {
    if (document.documentElement.clientWidth < 904) {
      this.setState({ platform: 'mobile' });
    }
    window.onresize = (e) => {
      this.flexable();
    };
  }
  //   render() {
  //     const { theme, platform } = this.state;
  //     return layoutTemplate(
  //       theme,
  //       platform,
  //       { onChange: this.onChange },
  //       Header,
  //       Banner,
  //       Content,
  //     );
  //   }
  render() {
    const { theme, platform } = this.state;
    return layoutTemplate(
      theme,
      platform,
      { onChange: this.onChange },
      platform === 'pc' ? Header : MobileHeader,
      platform === 'pc' ? Banner : MobileBanner,
      Content,
    );
  }
}

function layoutTemplate(theme, platform, callback, ...Component: any) {
  return (
    <div>
      {Component &&
        Component.map((Item: any) => {
          return (
            <Item
              callback={callback.onChange}
              theme={theme}
              platform={platform}
            />
          );
        })}
    </div>
  );
}
