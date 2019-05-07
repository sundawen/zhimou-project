import React from 'react'
import { injectIntl } from 'react-intl'
import {Col, Layout, Row, Card} from 'antd';
import styles from './VideoBox2.scss'

const {Content} = Layout;
const { Meta } = Card;

class VideoBox2 extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
    }
  }

    render() {
      const videoInfo = this.props.videoBox2Data.info
      const videoImg = this.props.videoBox2Data.img
      
        return (
          <Content className={styles.wrapper}>
            <div className={styles.mainBody}>
              <div className={styles.mainCard}>
                <Row gutter={16}>
                  <Col span={7}>
                    <Card title="频道一" bordered={false}>
                      <div className={styles.cardHeight}>
                        <video
                          className={styles.video}
                          src="https://codata.lenovo.com/static/app.mp4"
                          muted controls
                          preload="none"
                          title="title"
                          autoPlay="autoPlay"
                          >
                        </video>
                      </div>
                    </Card>
                  </Col>
                  <Col span={17}>
                    <Card hoverable title="实时数据" bordered={false}>

                      <div className={styles.cardHeight}>
                        <Row gutter={16} className={styles.noCursor}>
                          <Col span={11}>
                            <ul>
                              <li><label>摄像头ID:</label>{videoInfo.CameraID}</li>
                              <li><label>设备故障类型:</label> {videoInfo.ErrorType}</li>
                              <li><label>生产线ID: </label>{videoInfo.production_line}</li>
                              <li><label>故障设备型号: </label>{videoInfo.Model}</li>
                              <li><label>故障设备序列号: </label>{videoInfo.SerialNum}</li>
                              <li><label>工厂地址: </label>{videoInfo.location}</li>
                              <li><label>故障发生时间: </label>{videoInfo.date}</li>
                            </ul>
                          </Col>
                          <Col span={13}>
                            <Card>
                              <img className={styles.boxImg}
                                src="https://gw.alipayobjects.com/zos/antfincdn/h%24wFbzuuzz/HBWnDEUXCnGnGrRfrpKa.png"
                                alt="map"
                              />
                              <Meta
                                title="异常画面信息"
                                description={videoImg}
                              />
                            </Card>
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

export default injectIntl(VideoBox2)