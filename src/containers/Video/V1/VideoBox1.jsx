import React from 'react'
import { injectIntl } from 'react-intl'
import {Col, Layout, Row, Card, Table } from 'antd';
import styles from './VideoBox1.scss'
import zh_CN from '../../../i18n/zh_CN'
import bg from '../../../components/backGround.png'
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

const {Content} = Layout;

class VideoBox1 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      width:'100%',
      minHeight: '100%',
      height: '100%',
    }
  }

  componentDidMount() {
    this.player = videojs('video1', {}, function onPlayerReady() {
      this.play();
    })
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

    render() {
      const videoImg = this.props.videoBox1Data.img
        return (
          <Content className={styles.wrapper}>
            <div className={styles.mainBody}>
              <div className={styles.mainCard}>
                <Row gutter={16}>
                  <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.cardTitle}>
                      <div className={styles.cardHead}>{zh_CN.ChannelOne}</div>
                    </div>
                    <div className={styles.cardBack}>
                      <div className={styles.cardHeight}>
                        <video
                          style={ { minHeight: this.state.minHeight, height:this.state.height, width:this.state.width } }
                          className="video-js" 
                          id="video1"
                          muted
                          controls 
                          autoPlay="autoPlay"
                          loop="loop"
                          preload="none">
                          <source src="rtmp://10.112.57.54:1935/live/room" type="rtmp/flv" />
                        </video>
                      </div>
                    </div>
                  </Col>
                  <Col xl={15} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.cardTitle}>
                      <div className={styles.cardHead}>{zh_CN.RealTimeFaultData}</div>
                    </div>
                    <div className={styles.noCursor} className={styles.cardBack}>
                      <div className={styles.cardHeight}>
                        <Row gutter={16}>
                          <Col span={12}>
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
                                  <td>{this.props.videoBox1Data.info.CameraID}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.errorType}</td>
                                  <td>{this.props.videoBox1Data.info.ErrorType}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.productionLineID}</td>
                                  <td>{this.props.videoBox1Data.info.ProductionLineID}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.model}</td>
                                  <td>{this.props.videoBox1Data.info.Model}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.location}</td>
                                  <td>{this.props.videoBox1Data.info.Location}</td>
                                </tr>
                                <tr>
                                  <td>{zh_CN.date}</td>
                                  <td>{this.props.videoBox1Data.info.Date}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Col>
                          <Col span={12}>
                            <img className={styles.boxImg}
                              src={videoImg}
                              onError={(e) => {e.target.onerror = null;e.target.src=bg}}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
        )
    }
}

export default injectIntl(VideoBox1)