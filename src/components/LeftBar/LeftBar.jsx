import React from 'react'
import { injectIntl } from 'react-intl'
import styles from './LeftBar.scss'
import { NavLink } from 'react-router-dom'

import { Menu, Icon } from 'antd';

class LeftBar extends React.Component {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  render() {
    return (
      <Menu className={styles.leftSideBar}
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
      >
        <Menu.Item key="1">
          <NavLink exact to='/video'>
            <span><Icon type="play-circle" /><span>实时视频</span></span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="3">
          <NavLink exact to='/chart'>
            <span><Icon type="bar-chart" /><span>历史记录</span></span>
          </NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}

export default injectIntl(LeftBar)