import React from 'react'
import { injectIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import styles from './Head.scss'
import ImgVMiddle from '../../components/ImgVMiddle/ImgVMiddle'
import zh_CN from '../../i18n/zh_CN'
import {Col, Row } from 'antd';

// images
import LENOVOLOGO from './lenovo.png'

class Head extends React.Component {

  render() {
    return (
      <Row gutter={16} className={styles.wrapper}>
        <Col span={8}>
          <NavLink exact to='/video'>
            <ImgVMiddle style={{ width: '135px', height: '45px' }} image={LENOVOLOGO} alt="logo" />
          </NavLink>
        </Col>
        <Col span={8} className={styles.middle}>
          {zh_CN.logoTitle}
        </Col>
        <Col span={8}></Col>
      </Row>
    )
  }
}

export default injectIntl(Head)