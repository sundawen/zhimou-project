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
import { API_HISTORYERROR_TODAY, API_HISTORYERROR_MONTH } from '../../constants/API'
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
    }
  }
  componentWillMount = () => {
    this.props.getChannelList()
  }
  componentDidMount = () => {
    let date = new Date();
    let mouth = date.getMonth() + 1;
    let time = date.getFullYear() + '-' + mouth + '-' + date.getDate();
    let params = '?date=' + time;
    let apiT = API_HISTORYERROR_TODAY + params;
    let apiM = API_HISTORYERROR_MONTH + params;
    this.getDonutData(apiT, 'today');
    this.getDonutData(apiM, 'month');
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.channelList.channel == "1") {
      this.setState({ box1: this.props.channelList }, () => {
      })
      this.addDonutNum();
    } else if (this.props.channelList.channel == "2") {
      this.setState({ box2: this.props.channelList }, () => {
      })
      this.addDonutNum();
    } else {
      this.setState({ box1: this.state.nullList }, () => {
      })
      this.setState({ box2: this.state.nullList }, () => {
      })
    }
  }

  getDonutData(api, tag) {
    fetch(api, { method: 'get' }).then(res => res.json()).then(json => {
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
      this.switchDonut(data, json, tag);
    }).catch(err => {
      // 测试代码数据
      console.log('测试数据');
      let json = { "totalnum": 30, "info": { "BlueScreen": 10, "Smear": 5, "Tortuosity": 15 } };
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
      this.switchDonut(data, json, tag);
    })
  }

  addDonutNum() {
    let errorType = this.props.channelList.info.ErrorType;
    if (errorType == 'BlueScreen') {
      this.state.chart[0].tDto[0].count++;
      this.state.chart[0].tTotal++;
      this.state.chart[1].mDto[0].count++;
      this.state.chart[1].mTotal++;
    } else if (errorType == 'Smear') {
      this.state.chart[0].tDto[1].count++;
      this.state.chart[0].tTotal++;
      this.state.chart[1].mDto[1].count++;
      this.state.chart[1].mTotal++;
    } else if (errorType == 'Tortuosity') {
      this.state.chart[0].tDto[2].count++;
      this.state.chart[0].tTotal++;
      this.state.chart[1].mDto[2].count++;
      this.state.chart[1].mTotal++;
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
            <Donut data={chart} />
            <Gradient />
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
