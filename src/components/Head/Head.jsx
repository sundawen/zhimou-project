import React from 'react'
import { injectIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import styles from './Head.scss'
import ImgVMiddle from '../../components/ImgVMiddle/ImgVMiddle'
import zh_CN from '../../i18n/zh_CN'
import { Col, Row } from 'antd';

// images
import LENOVOLOGO from './yidong.png'

class Head extends React.Component {

  render() {
    return (
      <Row className={styles.wrapper}>
        <Col span={8}></Col>
        <Col span={8} className={styles.middle}>
          {zh_CN.logoTitle}
        </Col>
        <Col span={8}>
          <NavLink exact to='/video'>
            {/* style={{ width: '135px', height: '45px' }} */}
            <ImgVMiddle style={{ width: '135px', height: '45px' }} image={LENOVOLOGO} alt="logo" />
          </NavLink>
        </Col>
      </Row>
    )
  }
}

export default injectIntl(Head)