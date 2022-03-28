import React from 'react';
import 'antd/lib/dropdown/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/switch/style/index.css';

import { StarOutlined, GithubOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import styles from './index.module.scss';

const resourcesMenu = (
  <Menu>
    <Menu.Item>
      <a href="/events">Events</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/tgc01">Curriculum</a>
    </Menu.Item>
  </Menu>
);
const communityMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" href="https://taichicommunity.slack.com/ssb/redirect">
        Slack
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        href="https://github.com/taichi-dev/taichi/discussions"
      >
        GitHub Discussions
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="/forum">Forum</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/user_stories">User Stories</a>
    </Menu.Item>
  </Menu>
);

interface stateProps {
  current: string;
  stars: any;
}
class HeadMenu extends React.Component<any, stateProps> {
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
        const stars = (data.stargazers_count / 1000).toFixed(1) + ' k';
        this.setState({ stars: stars });
      });
  }
  render() {
    return (
      <div className={styles['my-menu']}>
        <ul className={styles['menu-ul']}>
          <li className={styles['normal']}>
            <a target="_blank" href="https://github.com/taichi-dev/taichi">
              <GithubOutlined
                style={{ fontSize: '20px', marginRight: '10px' }}
              />
              <StarOutlined />
              &nbsp; {this.state.stars}
            </a>
          </li>
          <li className={styles['normal']}>
            <a href="/docs">Docs</a>
          </li>
          <li className={styles['normal']}>
            <a href="/blog">Blog</a>
          </li>
          <li className={styles['dropdown']}>
            <Dropdown overlay={resourcesMenu} placement="bottomLeft">
              <a href="JavaScript:void(0);">Resources</a>
            </Dropdown>
          </li>
          <li className={styles['dropdown']}>
            <Dropdown overlay={communityMenu} placement="bottomLeft">
              <a href="JavaScript:void(0);">Community</a>
            </Dropdown>
          </li>
        </ul>
      </div>
    );
  }
}

export default HeadMenu;
