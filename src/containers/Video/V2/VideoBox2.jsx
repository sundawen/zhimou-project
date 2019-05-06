import React from 'react'
import { injectIntl } from 'react-intl'
import {Col, Layout, Row, Card} from 'antd';
import styles from './VideoBox2.scss'

const {Content} = Layout;
const { Meta } = Card;

class VideoBox2 extends React.Component {

  constructor(props) {
    super(props)
    this.videoData = [
      { 'Img': 'img/23.jpeg', 
        'Info': 
        { 'Date': '2019-04-30 16:59:42', 
          'Location': 'Beijing',
          'CameraID': 'Cam00222222222221', 
          'ProductionLineID': 'BJ_01222222222', 
          'Model': 'Lenovo Y470', 
          'SerialNum': 'LBJ00120331CN', 
          'ErrorType': 'Blue_Screen' } 
      }
    ]
    this.state = {
      videoImg: this.videoData[0].Img,
      videoCameraID: this.videoData[0].Info.CameraID,
      videoErrorType: this.videoData[0].Info.ErrorType,
      videoLocation: this.videoData[0].Info.Location,
      videoProductionLineID: this.videoData[0].Info.ProductionLineID,
      videoModel: this.videoData[0].Info.Model,
      videoSerialNum: this.videoData[0].Info.SerialNum,
      videoDate: this.videoData[0].Info.Date,
    }
  }

    render() {
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
                              <li><label>摄像头ID:</label>{this.state.videoCameraID}</li>
                              <li><label>设备故障类型:</label> {this.state.videoErrorType}</li>
                              <li><label>生产线ID: </label>{this.state.videoProductionLineID}</li>
                              <li><label>故障设备型号: </label>{this.state.videoModel}</li>
                              <li><label>故障设备序列号: </label>{this.state.videoSerialNum}</li>
                              <li><label>工厂地址: </label>{this.state.videoLocation}</li>
                              <li><label>故障发生时间: </label>{this.state.videoDate}</li>
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
                                description={this.state.videoImg}
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