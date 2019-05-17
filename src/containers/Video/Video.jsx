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
import { Layout } from 'antd';
// css
import styles from './Video.scss'

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelList: {
        img: '',
        info: {},
        channel: '',
      },
      nullList: {
        img: '',
        info: {},
        channel: '',
      },
      box1: {
        img: '',
        info: {},
        channel: '',
      },
      box2: {
        img: '',
        info: {},
        channel: '',
      },
    }
  }
  componentWillMount = () => {
    this.props.getChannelList()
  }
  componentDidMount = () => {
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.channelList.channel == "1") {
      this.setState({ box1: this.props.channelList }, () => {
      })
      this.setState({ box2: this.state.nullList }, () => {
      })
      // if (this.props.channelList !== nextProps.channelList) {
      //   this.setState({ box1: this.props.channelList }, () => {
      //   })
      // }
    }else if (this.props.channelList.channel == "2") {
      this.setState({ box2: this.props.channelList }, () => {
      })
      this.setState({ box1: this.state.nullList }, () => {
      })
    } else {
      this.setState({ box1: this.state.nullList }, () => {
      })
      this.setState({ box2: this.state.nullList }, () => {
      })
    }
  }

  render() {
    return (
      <Layout>
        <Layout>
          <Header/>
          <VideoBox1 videoBox1Data = {this.state.box1}/>
          <VideoBox2 videoBox2Data = {this.state.box2}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Video))
