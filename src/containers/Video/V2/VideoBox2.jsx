import React from 'react'
import { injectIntl } from 'react-intl'
import {Col, Layout, Row, Card, Table } from 'antd';
import styles from './VideoBox2.scss'
import zh_CN from '../../../i18n/zh_CN'
import bg from '../../../components/backGround.png'
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from "bizcharts";
import DataSet from "@antv/data-set";

const {Content} = Layout;
const { DataView } = DataSet;
const { Html } = Guide;

class VideoBox2 extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      width:'100%',
      minHeight: '100%',
      height: '100%',
      chartData: [],
    }
  }

  componentDidMount() {
    this.player = videojs('video2', {}, function onPlayerReady() {
      this.play();
    })
    this.getCuuentDateData();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  getCuuentDateData() {
    const data = [
      {
        item: zh_CN.blueScreen,
        count: 11
      },
      {
        item: zh_CN.smear,
        count: 7
      },
      {
        item: zh_CN.tortuosity,
        count: 11
      }
    ];
    this.setState({ chartData: data, });
  }

    render() {
      const videoImg = this.props.videoBox2Data.img;
      const { chartData } = this.state;
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
          <Content className={styles.wrapper}>
            <div className={styles.mainBody}>
              <div className={styles.mainCard}>
                <Row gutter={16}>
                  <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.cardTitle}>
                      <div className={styles.cardHead}>{zh_CN.ChannelTwo}</div>
                    </div>
                    <Card bordered={false} className={styles.cardBack}>
                    <div className={styles.cardHeight}>
                        <video
                          style={ { minHeight: this.state.minHeight, height:this.state.height, width:this.state.width } }
                          className="video-js" 
                          id="video2"
                          muted
                          controls 
                          autoPlay="autoPlay"
                          loop="loop"
                          preload="none">
                          <source src="rtmp://10.112.57.54:1935/live/room2" type="rtmp/flv" />
                        </video>
                      </div>
                    </Card>
                  </Col>
                  <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.cardTitle}>
                      <div className={styles.cardHead}>{zh_CN.RealTimeFaultData}</div>
                    </div>
                    <Card className={styles.noCursor} className={styles.cardBack}>
                      <div className={styles.cardHeight}>
                        <Row gutter={16}>
                          <Col span={14} style={{ height: 300 }} >
                            <table>
                              <thead>
                                <tr>
                                  <th>{zh_CN.Attribute}</th>
                                  <th>{zh_CN.Result}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{zh_CN.cameraID}</td>
                                  <td>{this.props.videoBox2Data.info.CameraID}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.errorType}</td>
                                  <td>{this.props.videoBox2Data.info.ErrorType}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.productionLineID}</td>
                                  <td>{this.props.videoBox2Data.info.ProductionLineID}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.model}</td>
                                  <td>{this.props.videoBox2Data.info.Model}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.location}</td>
                                  <td>{this.props.videoBox2Data.info.Location}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.date}</td>
                                  <td>{this.props.videoBox2Data.info.Date}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Col>
                          <Col span={10} style={{height:300}}>
                            <img className={styles.boxImg}
                              src={videoImg}
                              onError={(e) => {e.target.onerror = null;e.target.src=bg}}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                  <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                    <Chart
                      height={400}
                      data={dv}
                      scale={cols}
                      padding={[20, 50, 20, 50]}
                      forceFit
                    >
                      <Coord type={"theta"} radius={0.9} innerRadius={0.8} />
                      <Axis name="percent" />
                      <Legend
                        position="left"
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
                          html="<div style=&quot;color:white;font-size:1.16em;text-align: center;width: 10em;&quot;>当日监控二故障统计<br><span style=&quot;color:white;font-size:2.5em&quot;>29</span>台</div>"
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
              </div>
            </div>
          </Content>
        )
    }
}

export default injectIntl(VideoBox2)