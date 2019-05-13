import React from 'react'
import { injectIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import styles from './Head.scss'
import ImgVMiddle from '../../components/ImgVMiddle/ImgVMiddle'
import zh_CN from '../../i18n/zh_CN'

// images
import LENOVOLOGO from './lenovo.png'

class Head extends React.Component {

    render() {
        return (
            <nav className={styles.nav}>
            <div className={styles.left}>
                <NavLink exact to='/video'>
                    <ImgVMiddle style={{ width: '201px', height: '64px' }} image={LENOVOLOGO} alt="logo" />
                </NavLink>
            </div>
            <div className={styles.middle}>
              <ul>
                <li><NavLink to="/video" activeClassName={styles.selected}>{zh_CN.realTimeVideo}</NavLink></li>
                <li><NavLink to="/analysis" activeClassName={styles.selected}>{zh_CN.historicalRecord}</NavLink></li>
              </ul>
            </div>
          </nav>
        )
    }
}

export default injectIntl(Head)