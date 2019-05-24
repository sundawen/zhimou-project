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
import { Col, Layout, Row, Card, Table } from 'antd';
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from "bizcharts";
import DataSet from "@antv/data-set";
import { API_CHART } from '../../constants/API'
import zh_CN from '../../i18n/zh_CN'
// css
import styles from './Video.scss'

const { Content } = Layout;
const { DataView } = DataSet;

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
      chartData: [],
      chartTotal: 33,
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
      this.setState({ box2: this.state.nullList }, () => {
      })
      // if (this.props.channelList !== nextProps.channelList) {
      //   this.setState({ box1: this.props.channelList }, () => {
      //   })
      // }
    } else if (this.props.channelList.channel == "2") {
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

    if (this.props.videoBox1Data.info.ErrorType) {
      let errorType = this.props.videoBox1Data.info.ErrorType;
      if (errorType == 'BlueScreen') {
        this.state.chartData[0].count++;
      } else if (errorType == 'Smear') {
        this.state.chartData[1].count++;
      } else if (errorType == 'Tortuosity') {
        this.state.chartData[2].count++;
      }
    }
  }

  getCurrentDateData() {
    const { cameraId } = this.state;
    let date = new Date();
    let mouth = date.getMonth() + 1;
    let time = date.getFullYear() + mouth + date.getDate();
    let params = '?camId=' + cameraId + '&time=' + time;
    fetch(API_CHART + params).then(res => res.json()).then(data => {
      pagination.total = parseInt(data.totalnum);
      data.totalinfo.forEach((item, key) => {
        item.key = key;
      });
      this.setState({
        detailsData: data.totalinfo,
        pagination
      });
      loading.table = false;
      this.setState({ loading });
    }).catch(err => {
      // 测试代码数据
      console.log('测试数据');
      // let data = {"totalnum":"47","info":[{"blueScreen":"18","smear":"6","tortuosity":"23"}]};
      const data = [
        {
          item: zh_CN.blueScreen,
          count: 1
        },
        {
          item: zh_CN.smear,
          count: 2
        },
        {
          item: zh_CN.tortuosity,
          count: 3
        }
      ];
      this.setState({
        chartData: data,
      });
    })
  }

  render() {
    const { chartData, chartTotal } = this.state;
    const { Html } = Guide;
    const dv = new DataView()
    dv.source(chartData).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Header />
        <Row>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <VideoBox1 videoBox1Data={this.state.box1} />
            <VideoBox2 videoBox2Data={this.state.box2} />
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Chart
              height={350}
              data={dv}
              scale={cols}
              padding={[70, 50, 20, 50]}
              forceFit
            >
              <Coord type={"theta"} radius={0.9} innerRadius={0.8} />
              <Axis name="percent" />
              <Legend
                position="right"
                offsetY={-300 / 2 + 120}
                offsetX={-100}
              />
              <Tooltip
                showTitle={false}
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
              />
              <Guide>
                <Html
                  position={["50%", "50%"]}
                  html={() => { return ('<div style=color:white;font-size:1.16em;text-align:center;width: 10em;>当日监控一故障统计<br><span style=color:white;font-size:2.5em>' + this.state.chartTotal + '</span>台') }}
                  alignX="middle"
                  alignY="middle"
                />
              </Guide>
              <Geom
                type="intervalStack"
                position="percent"
                color="item"
                tooltip={[
                  "item*percent",
                  (item, percent) => {
                    percent = percent * 100 + "%";
                    return {
                      name: item,
                      value: percent
                    };
                  }
                ]}
                style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}
              >
                <Label
                  content="percent"
                  formatter={(val, item) => {
                    return item.point.item;
                  }}
                />
              </Geom>
            </Chart>
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
