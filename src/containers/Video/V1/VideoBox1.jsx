import React from 'react'
import { injectIntl } from 'react-intl'
import {Col, Layout, Row, Card} from 'antd';
import styles from './VideoBox1.scss'
import zh_CN from '../../../i18n/zh_CN'
import bg from '../bg.png'
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

const {Content} = Layout;

class VideoBox1 extends React.Component {

  constructor() {
    super()
    this.state = {
      width:'100%',
      minHeight: '100%',
      height: '100%'
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
      const videoInfo = this.props.videoBox1Data.info
      const videoImg = this.props.videoBox1Data.img
        return (
          <Content className={styles.wrapper}>
            <div className={styles.mainBody}>
              <div className={styles.mainCard}>
                <Row gutter={16}>
                  <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                    <Card title={zh_CN.ChannelOne} bordered={false}>
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
                        {/* src="rtmp://58.200.131.2:1935/livetv/hunantv" */}
                      </div>
                    </Card>
                  </Col>
                  <Col xl={15} lg={24} md={24} sm={24} xs={24}>
                    <Card hoverable title={zh_CN.RealTimeFaultData} bordered={false} className={styles.noCursor}>
                      <div className={styles.cardHeight}>
                        <Row gutter={16}>
                          <Col span={14}>
                            <ul>
                              <li><label>{zh_CN.cameraID}:</label>{videoInfo.CameraID}</li>
                              <li><label>{zh_CN.errorType}:</label> {videoInfo.ErrorType}</li>
                              <li><label>{zh_CN.productionLineID}: </label>{videoInfo.ProductionLineID}</li>
                              <li><label>{zh_CN.model}: </label>{videoInfo.Model}</li>
                              <li><label>{zh_CN.serialNum}: </label>{videoInfo.SerialNum}</li>
                              <li><label>{zh_CN.location}: </label>{videoInfo.Location}</li>
                              <li><label>{zh_CN.date}: </label>{videoInfo.Date}</li>
                            </ul>
                          </Col>
                          <Col span={10}>
                            <img className={styles.boxImg}
                              src={videoImg}
                              onError={(e) => {e.target.onerror = null;e.target.src=bg}}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
        )
    }
}

export default injectIntl(VideoBox1)