import React from 'react';
import Nav from './landing/header';
import Banner from './landing/Banner';
import Content from './landing/taichi';
import 'animate.css';
interface StateProps {
  theme: string;
}
export default class LandingPage extends React.Component<any, StateProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: 'light',
    };
    this.onChange = this.onChange.bind(this);
  }
  // 切换主题
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
  render() {
    const { theme } = this.state;
    return layoutTemplate(
      theme,
      { onChange: this.onChange },
      Nav,
      Banner,
      Content,
    );
  }
}

function layoutTemplate(theme, callback, ...Component: any) {
  return (
    <div>
      {Component &&
        Component.map((Item: any) => {
          return <Item callback={callback.onChange} theme={theme} />;
        })}
    </div>
  );
}
