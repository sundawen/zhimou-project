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
      chartTotal: 0,
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
      this.getCurrentInfo();
      // if (this.props.channelList !== nextProps.channelList) {
      //   this.setState({ box1: this.props.channelList }, () => {
      //   })
      // }
    } else if (this.props.channelList.channel == "2") {
      this.setState({ box2: this.props.channelList }, () => {
      })
      this.setState({ box1: this.state.nullList }, () => {
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
          count: json.info[0].blueScreen
        },
        {
          item: zh_CN.smear,
          count: json.info[0].smear
        },
        {
          item: zh_CN.tortuosity,
          count: json.info[0].tortuosity
        }
      ];
      this.setState({
        chartData: data,
        chartTotal: json.totalnum,
      });
    }).catch(err => {
      // 测试代码数据
      console.log('测试数据');
      let json = {"totalnum":30,"info":{"blueScreen":10,"smear":5,"tortuosity":15}};
      let data = [
        {
          item: zh_CN.blueScreen,
          count: json.info.blueScreen
        },
        {
          item: zh_CN.smear,
          count: json.info.smear
        },
        {
          item: zh_CN.tortuosity,
          count: json.info.tortuosity
        }
      ];
      this.setState({
        chartData: data,
        chartTotal: json.totalnum,
      });
    })
  }

  getCurrentInfo() {
    let errorType = this.props.channelList.info.ErrorType;
    if (errorType == 'BlueScreen') {
      this.state.chartData[0].count++;
      this.state.chartTotal++;
    } else if (errorType == 'Smear') {
      this.state.chartData[1].count++;
      this.state.chartTotal++;
    } else if (errorType == 'Tortuosity') {
      this.state.chartData[2].count++;
      this.state.chartTotal++;
    }
  }

  render() {
    const { chartData } = this.state;
    const { Html } = Guide;

    const dv = new DataView();
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

    const ds = new DataSet();
    const cv = ds.createView().source(chartData);
    cv.source(chartData).transform({
      type: "sort",

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.count - b.count > 0;
      }
    });

    const dc = new DataView().source(chartData);
    dc.transform({
      type: "fold",
      fields: ["count"],
      // 展开字段集
      key: "user",
      // key字段
      value: "score" // value字段
    });

    const colsc = {
      score: {
        min: 0,
        max: 80
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
              height={300}
              data={dv}
              scale={cols}
              padding={[70, 20, 20, 20]}
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
                  html={() => { return ('<div style=color:white;font-size:1.16em;text-align:center;width: 10em;>当日故障统计<br><span style=color:white;font-size:2.5em>' + this.state.chartTotal + '</span>台') }}
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
            <Chart height={300} data={cv} forceFit>
              <Coord transpose />
              <Axis
                name="item"
                label={{
                  offset: 12
                }}
              />
              <Axis name="count" />
              <Tooltip />
              <Geom type="interval" position="item*count" />
            </Chart>
            <Chart
              height={300}
              data={dc}
              padding={[0, 0, 0, 0]}
              scale={colsc}
              forceFit
            >
              <Coord type="polar" radius={0.8} />
              <Axis
                name="item"
                line={null}
                tickLine={null}
                grid={{
                  lineStyle: {
                    lineDash: null
                  },
                  hideFirstLine: false
                }}
              />
              <Tooltip />
              <Axis
                name="score"
                line={null}
                tickLine={null}
                grid={{
                  type: "polygon",
                  lineStyle: {
                    lineDash: null
                  },
                  alternateColor: "rgba(0, 0, 0, 0.04)"
                }}
              />
              <Geom type="line" position="item*score" color="user" size={2} />
              <Geom
                type="point"
                position="item*score"
                color="user"
                shape="circle"
                size={4}
                style={{
                  stroke: "#fff",
                  lineWidth: 1,
                  fillOpacity: 1
                }}
              />
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
