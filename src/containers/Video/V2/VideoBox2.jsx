import React from 'react'
import { injectIntl } from 'react-intl'
import { Col, Layout, Row, Card, Table } from 'antd';
import styles from './VideoBox2.scss'
import zh_CN from '../../../i18n/zh_CN'
import bg from '../../../components/backGround.png'
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import { API_FAKEVIDEO } from '../../../constants/API'

const { Content } = Layout;

class VideoBox2 extends React.Component {

  constructor(props) {
    super(props)
    // let url = window.location.host
    // if (url) {
    //   if (url.indexOf(':') != -1 && window.location.port) {
    //     url = url.substring(0, url.indexOf(window.location.port) - 1);
    //   }
    // }
    // let player2 = 'rtmp://' + url + ':' + '6666' + '/live/room2';
    // console.log('player2 url', player2)
    this.state = {
      // player2: player2,
      width: '100%',
      minHeight: '100%',
      height: '100%',
    }
  }

  componentDidMount() {
    // this.player = videojs('video2', {}, function onPlayerReady() {
    //   this.play();
    // })
  }

  componentWillUnmount() {
    // if (this.player) {
    //   this.player.dispose()
    // }
  }

  render() {
    // const player2 = this.state.player2
    const videoImg = this.props.videoBox2Data.img;
    return (
      <Content className={styles.wrapper}>
        <div className={styles.mainBody}>
          <div className={styles.mainCard}>
            <Row gutter={16}>
              <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.cardTitle}>
                  <div className={styles.cardHead}>{zh_CN.ChannelTwo}</div>
                </div>
                <div className={styles.cardBack}>
                  <div className={styles.cardHeight}>
                    {/* <video
                      style={{ minHeight: this.state.minHeight, height: this.state.height, width: this.state.width }}
                      className="video-js"
                      id="video2"
                      muted
                      controls
                      autoPlay="autoPlay"
                      loop="loop"
                      preload="none">
                      <source src={player2} type="rtmp/flv" />
                    </video> */}
                    <img
                      style={{ minHeight: this.state.minHeight, height: this.state.height, width: this.state.width }}
                      src={API_FAKEVIDEO}
                      onError={(e) => { e.target.onerror = null; e.target.src = bg }}
                    />
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
                      <Col span={12}>
                        <img className={styles.boxImg}
                          src={videoImg}
                          onError={(e) => { e.target.onerror = null; e.target.src = bg }}
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

export default injectIntl(VideoBox2)