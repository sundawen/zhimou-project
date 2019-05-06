import React from 'react'
import { injectIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import ImgVMiddle from '../../components/ImgVMiddle/ImgVMiddle'

// images
import LENOVOLOGO from './lenovo.png'
// css
import styles from './LeftBar.scss'

const {Sider} = Layout;

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <NavLink exact to='/video'>
          <ImgVMiddle style={{ width: '201px', height: '67px' }} image={LENOVOLOGO} alt="logo" />
        </NavLink>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <NavLink exact to='/video'>
              <span><Icon type="play-circle" /><span>实时视频</span></span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink exact to='/chart'>
              <span><Icon type="bar-chart" /><span>历史记录</span></span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default injectIntl(LeftBar)