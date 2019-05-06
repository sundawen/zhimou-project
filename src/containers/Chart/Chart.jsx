// vendor
import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
// components
import Sider from '../../components/LeftBar/LeftBar'
import Header from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import VideoBox1 from '../Video/V1/VideoBox1'
import VideoBox2 from '../Video/V2/VideoBox2'
import { getChannelList } from '../../actions/apps'
import { Layout } from 'antd';
// css
import styles from './Chart.scss'

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      <Layout>
        <Sider/>
        <Layout>
          <Header/>
          <div style={{minHeight:800}}>
            sssssss
          </div>
          <Foot />
        </Layout>
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Chart))
