import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { injectIntl } from 'react-intl'

// images
import LENOVOLOGO from './lenovo.png'

// Components
import ImgVMiddle from '../../components/ImgVMiddle/ImgVMiddle'

// scss
import styles from './NavDev.scss'

class NavDev extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDashboard:true,
    }
  }

  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.left}>
          <NavLink exact to='/homePage'>
            <ImgVMiddle style={{ width: '180px', height: '60px' }} image={LENOVOLOGO} alt="logo" />
          </NavLink>
        </div>
        <div>
          {this.state.showDashboard ?
            <div className={styles.middle} onClick={() => { window.location.reload() }}>
              <NavLink exact to='/homePage'>
                Dashboard
              </NavLink>
            </div> : null
          }
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NavDev))
