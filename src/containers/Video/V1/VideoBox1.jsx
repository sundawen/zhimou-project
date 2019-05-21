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
      columns: [
        {
          title: zh_CN.Attribute,
          dataIndex: 'attribute',
        },
        {
          title: zh_CN.Result,
          dataIndex: 'result',
        },
      ],
      data: [
        {
          key: '1',
          attribute: zh_CN.cameraID,
          result: this.props.videoBox1Data.info.CameraID,
        },
        {
          key: '2',
          attribute: zh_CN.errorType,
          result: this.props.videoBox1Data.info.ErrorType,
        },
        {
          key: '3',
          attribute: zh_CN.productionLineID,
          result: this.props.videoBox1Data.info.ProductionLineID,
        },
        {
          key: '4',
          attribute: zh_CN.model,
          result: this.props.videoBox1Data.info.Model,
        },
        {
          key: '5',
          attribute: zh_CN.serialNum,
          result: this.props.videoBox1Data.info.SerialNum,
        },
        {
          key: '6',
          attribute: zh_CN.location,
          result: this.props.videoBox1Data.info.Location,
        },
        {
          key: '7',
          attribute: zh_CN.date,
          result: this.props.videoBox1Data.info.Date,
        },
      ],
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
                    <Card bordered={false} className={styles.cardBack}>
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
                    </Card>
                  </Col>
                  <Col xl={15} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.cardTitle}>
                      <div className={styles.cardHead}>{zh_CN.RealTimeFaultData}</div>
                    </div>
                    <Card className={styles.noCursor} className={styles.cardBack}>
                      <div className={styles.cardHeight}>
                        <Row gutter={16}>
                          <Col span={14} style={{height:300}}>
                            <Table columns={this.state.columns} dataSource={this.state.data} size="small" pagination={false}/>
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