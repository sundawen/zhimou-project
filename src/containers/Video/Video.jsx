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

import { clearTimer, getChannelList } from '../../actions/apps'
import { Col, Row } from 'antd';
import { API_HISTORYERROR_STATISTIC_PERIOD } from '../../constants/API'
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
        },
        channel: '',
      },
      box2: {
        img: '',
        info: {
        },
        channel: '',
      },
      chart: [{
        tDto: [],
        tTotal: 0
      }, {
        mDto: [],
        mTotal: 0
      }],
      yAdd: {
        'BlueScreen': 0,
        'Scratch': 0,
        'Object': 0
      }
    }
  }
  componentWillMount = () => {
    this.props.getChannelList()
  }
  componentDidMount = () => {
    let apiT = API_HISTORYERROR_STATISTIC_PERIOD + 'today';
    let apiM = API_HISTORYERROR_STATISTIC_PERIOD + 'month';
    this.getDonutData(apiT, 'today');
    this.getDonutData(apiM, 'month');
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.channelList.channel == "1") {
      if (nextProps.channelList.info.ErrorType && nextProps.channelList.info.Location) {
        let errorType = nextProps.channelList.info.ErrorType
        let location = nextProps.channelList.info.Location
        this.typeZh(errorType, location, nextProps)
      }
      this.setState({ box1: nextProps.channelList }, () => {
      })
      if (nextProps.channelList.info.ErrorType) {
        this.addDonutNum(nextProps.channelList.info.ErrorType);
      }
      if (nextProps.channelList.info) {
        this.switchYDto(nextProps.channelList.info.ErrorType);
      }
    } else if (nextProps.channelList.channel == "2") {
      if (nextProps.channelList.info.ErrorType && nextProps.channelList.info.Location) {
        let errorType = nextProps.channelList.info.ErrorType
        let location = nextProps.channelList.info.Location
        this.typeZh(errorType, location, nextProps)
      }
      this.setState({ box2: nextProps.channelList }, () => {
      })
      if (nextProps.channelList.info.ErrorType) {
        this.addDonutNum(nextProps.channelList.info.ErrorType);
      }
      if (nextProps.channelList.info) {
        this.switchYDto(nextProps.channelList.info.ErrorType);
      }
    } else {
      this.setState({ box1: this.state.nullList }, () => {
      })
      this.setState({ box2: this.state.nullList }, () => {
      })
    }
  }
  
  // 清空 SSE 定时器
  componentWillUnmount = () => {
    clearTimer();
  }

  typeZh(type, location, data) {
    if (type == 'BlueScreen' || type == 'blueScreen' || type == 'Bluescreen' || type == 'bluescreen') {
      data.channelList.info.ErrorType = zh_CN.blueScreen
    }
    if (type == 'Scratch' || type == 'scratch') {
      data.channelList.info.ErrorType = zh_CN.scratch
    }
    if (type == 'Object' || type == 'object') {
      data.channelList.info.ErrorType = zh_CN.object
    }

    if (location == 'Huiyang' || location == 'huiYang') {
      data.channelList.info.Location = zh_CN.hy
    }
    if (location == 'Shenzhen' || location == 'shenzhen') {
      data.channelList.info.Location = zh_CN.sz
    }
  }

  getDonutData(api, tag) {
    fetch(api, { method: 'get' }).then(res => res.json()).then(json => {
      let data = [
        {
          item: zh_CN.blueScreen,
          count: json.info.BlueScreen
        },
        {
          item: zh_CN.scratch,
          count: json.info.Scratch
        },
        {
          item: zh_CN.object,
          count: json.info.Object
        }
      ];
      this.switchDonut(data, json, tag);
    }).catch(err => {
      // 测试代码数据
      console.log('测试数据');
      let json = { "totalnum": 11415, "info": { "BlueScreen": 20, "Scratch": 5, "Object": 25 } };
      let data = [
        {
          item: zh_CN.blueScreen,
          count: json.info.BlueScreen
        },
        {
          item: zh_CN.scratch,
          count: json.info.Scratch
        },
        {
          item: zh_CN.object,
          count: json.info.Object
        }
      ];
      this.switchDonut(data, json, tag);
    })
  }

  addDonutNum(errorType) {
    if (this.state.chart[0].tTotal && this.state.chart[1].mTotal) {
      if (errorType == zh_CN.blueScreen) {
        this.state.chart[0].tDto[0].count++;
        this.state.chart[0].tTotal++;
        this.state.chart[1].mDto[0].count++;
        this.state.chart[1].mTotal++;
      } else if (errorType == zh_CN.scratch) {
        this.state.chart[0].tDto[1].count++;
        this.state.chart[0].tTotal++;
        this.state.chart[1].mDto[1].count++;
        this.state.chart[1].mTotal++;
      } else if (errorType == zh_CN.object) {
        this.state.chart[0].tDto[2].count++;
        this.state.chart[0].tTotal++;
        this.state.chart[1].mDto[2].count++;
        this.state.chart[1].mTotal++;
      }
    }
  }

  switchYDto = (errorType) => {
    switch (errorType) {
      case zh_CN.blueScreen:
        this.setState({
          yAdd: {
            'BlueScreen': 1,
            'Scratch': 0,
            'Object': 0
          }
        });
        break
      case zh_CN.scratch:
        this.setState({
          yAdd: {
            'BlueScreen': 0,
            'Scratch': 1,
            'Object': 0
          }
        });
        break
      case zh_CN.object:
        this.setState({
          yAdd: {
            'BlueScreen': 0,
            'Scratch': 0,
            'Object': 1
          }
        });
        break
      default:
        this.setState({
          yAdd: {
            'BlueScreen': this.state.yAdd.BlueScreen,
            'Scratch': this.state.yAdd.Scratch,
            'Object': this.state.yAdd.Object
          }
        });
    }
  }

  switchDonut = (data, json, tag) => {
    switch (tag) {
      case 'today':
        this.setState({
          chart: [{
            tDto: data,
            tTotal: json.totalnum
          }, {
            mDto: this.state.chart[1].mDto,
            mTotal: this.state.chart[1].mTotal
          }]
        });
        break
      case 'month':
        this.setState({
          chart: [{
            tDto: this.state.chart[0].tDto,
            tTotal: this.state.chart[0].tTotal
          }, {
            mDto: data,
            mTotal: json.totalnum
          }]
        });
        break
      default:
        this.setState({
          chart: [{
            tDto: [],
            tTotal: 0
          }, {
            mDto: [],
            mTotal: 0
          }]
        });
    }
  }

  render() {
    const { chart, yAdd } = this.state;

    return (
      <div>
        <Header />
        <Row>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <VideoBox1 videoBox1Data={this.state.box1} />
            <VideoBox2 videoBox2Data={this.state.box2} />
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24} className={styles.charts}>
            <Donut data={chart} />
            <Gradient yAdd={yAdd}/>
            <Map />
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
