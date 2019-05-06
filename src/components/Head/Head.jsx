import React from 'react'
import { injectIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import styles from './Head.scss'
import ImgVMiddle from '../../components/ImgVMiddle/ImgVMiddle'

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
                <li><NavLink to="/video" activeClassName={styles.selected}>实时视频</NavLink></li>
                <li><NavLink to="/chart" activeClassName={styles.selected}>历史记录</NavLink></li>
              </ul>
            </div>
          </nav>
        )
    }
}

export default injectIntl(Head)