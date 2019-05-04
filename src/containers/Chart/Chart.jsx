// vendor
import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
// components
import Sider from '../../components/LeftBar/LeftBar'
import NavDev from '../../components/NavDev/NavDev'
// css
import styles from './Chart.scss'

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount = () => {
  }
  componentDidMount = () => {
  }

  render() {
    return (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <div className={styles.wrapper}>
          <Sider/>
                  ccccccccccccccccccccccccc
        </div>
        <NavDev/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Video))
