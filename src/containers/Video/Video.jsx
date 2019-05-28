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
import Donut from '../Video/Donut/Donut'
import Gradient from '../Video/Gradient/Gradient'
import Map from '../Video/Map/Map'

import { getChannelList } from '../../actions/apps'
import { Col, Row } from 'antd';
import { API_CHART } from '../../constants/API'
import zh_CN from '../../i18n/zh_CN'
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
        info: {
          // CameraID: 'Cam00148',
          // ErrorType: '蓝屏',
          // ProductionLineID: 'BJ_01',
          // Model: 'Lenovo Y470',
          // Location: 'Beijing',
          // Date: '2019-04-30 16:59:42'
        },
        channel: '',
      },
      box2: {
        img: '',
        info: {
          // CameraID: 'Cam00148',
          // ErrorType: '蓝屏',
          // ProductionLineID: 'BJ_01',
          // Model: 'Lenovo Y470',
          // Location: 'Beijing',
          // Date: '2019-04-30 16:59:42'
        },
        channel: '',
      },
      chart:{
        chartData: [],
        chartTotal: 0
      },
    }
  }
  componentWillMount = () => {
    this.props.getChannelList()
  }
  componentDidMount = () => {
    this.getCurrentDateData();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.channelList.channel == "1") {
      this.setState({ box1: this.props.channelList }, () => {
      })
      this.getCurrentInfo();
    } else if (this.props.channelList.channel == "2") {
      this.setState({ box2: this.props.channelList }, () => {
      })
      this.getCurrentInfo();
    } else {
      this.setState({ box1: this.state.nullList }, () => {
      })
      this.setState({ box2: this.state.nullList }, () => {
      })
    }
  }

  getCurrentDateData() {
    let date = new Date();
    let mouth = date.getMonth() + 1;
    let time = date.getFullYear() + '-' + mouth + '-' + date.getDate();
    let params = '?date=' + time;
    fetch(API_CHART + params).then(res => res.json()).then(json => {
      let data = [
        {
          item: zh_CN.blueScreen,
          count: json.info.BuleScreen
        },
        {
          item: zh_CN.smear,
          count: json.info.Smear
        },
        {
          item: zh_CN.tortuosity,
          count: json.info.Tortuosity
        }
      ];
      this.setState({
        chart: {
          chartData: data,
          chartTotal: json.totalnum
        }
      });
    }).catch(err => {
      // 测试代码数据
      console.log('测试数据');
      let json = {"totalnum":30,"info":{"BlueScreen":10,"Smear":5,"Tortuosity":15}};
      let data = [
        {
          item: zh_CN.blueScreen,
          count: json.info.BlueScreen
        },
        {
          item: zh_CN.smear,
          count: json.info.Smear
        },
        {
          item: zh_CN.tortuosity,
          count: json.info.Tortuosity
        }
      ];
      this.setState({
        chart: {
          chartData: data,
          chartTotal: json.totalnum
        }
      });
    })
  }

  getCurrentInfo() {
    let errorType = this.props.channelList.info.ErrorType;
    if (errorType == 'BlueScreen') {
      this.state.chart.chartData[0].count++;
      this.state.chart.chartTotal++;
    } else if (errorType == 'Smear') {
      this.state.chart.chartData[1].count++;
      this.state.chart.chartTotal++;
    } else if (errorType == 'Tortuosity') {
      this.state.chart.chartData[2].count++;
      this.state.chart.chartTotal++;
    }
  }

  render() {
    const { chart } = this.state;

    return (
      <div>
        <Header />
        <Row>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <VideoBox1 videoBox1Data={this.state.box1} />
            <VideoBox2 videoBox2Data={this.state.box2} />
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Donut data={chart}/>
            <Gradient data={chart}/>
            <Map data={chart}/>
          </Col>
        </Row>
        <Foot />
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
