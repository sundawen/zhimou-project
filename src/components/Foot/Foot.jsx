import React from 'react'
import { injectIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import styles from './Foot.scss'
import {Col, Row } from 'antd';
import zh_CN from '../../i18n/zh_CN'

class Foot extends React.Component {

    render() {
        return (
            <Row gutter={16} className={styles.wrapper}>
                <Col span={24}>
                <ul>
                    <li><NavLink to="/video" activeClassName={styles.selected}>{zh_CN.realTimeVideo}</NavLink></li>
                    <li><NavLink to="/analysis" activeClassName={styles.selected}>{zh_CN.historicalRecord}</NavLink></li>
                </ul>
                </Col>
            </Row>
        )
    }
}

export default injectIntl(Foot)