// vendor
import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
// components
import Sider from '../LeftBar/LeftBar'
import { getChannelList } from '../../actions/apps'
// css
import styles from './Video.scss'

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      leftList: {'a':1, 'b':2},
      channelList: null,
    }
  }
  componentWillMount = () => {
    this.props.getChannelList()
  }
  componentDidMount = () => {
  }

  render() {
    return (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <div className={styles.wrapper}>
          <Sider
            leftList={this.state.leftList}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    channelList: state.channelList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getChannelList: bindActionCreators(getChannelList, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Video))
