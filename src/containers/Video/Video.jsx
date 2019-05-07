// vendor
import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
// components
import Header from '../../components/Head/Head'
import Foot from '../../components/Foot/Foot'
import VideoBox1 from '../Video/V1/VideoBox1'
import VideoBox2 from '../Video/V2/VideoBox2'
import { getChannelList } from '../../actions/apps'
import { getVideo2Data } from '../../actions/apps'
import { Layout } from 'antd';
// css
import styles from './Video.scss'

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelList: {
        img: '',
        info: ''
      },
      videoData2List: {
        img: '',
        info: ''
      },
    }
  }
  componentWillMount = () => {
    this.props.getChannelList()
    this.props.getVideo2Data()
  }
  componentDidMount = () => {
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.channelList !== nextProps.channelList) {
      this.setState({ channelList: nextProps.channelList }, () => {
      })
    }
    if (this.props.videoData2List !== nextProps.videoData2List) {
      this.setState({ videoData2List: nextProps.videoData2List }, () => {
      })
    }
  }

  render() {
    return (
      <Layout>
        <Layout>
          <Header/>
          <VideoBox1 videoBox1Data = {this.state.channelList}/>
          <VideoBox2 videoBox2Data = {this.state.videoData2List}/>
          <Foot />
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    channelList: state.channelList,
    videoData2List: state.videoData2List,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getChannelList: bindActionCreators(getChannelList, dispatch),
    getVideo2Data: bindActionCreators(getVideo2Data, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Video))
