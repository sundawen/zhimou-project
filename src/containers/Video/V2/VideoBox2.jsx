import React from 'react'
import { injectIntl } from 'react-intl'
import { Col, Layout, Row } from 'antd';
import styles from '../Video.scss'
import zh_CN from '../../../i18n/zh_CN'
import bg from '../../../components/backGround.png'
import blackbg from '../../../components/blackbg.png'
import 'video.js/dist/video-js.min.css';
import { API_FAKEVIDEO } from '../../../constants/API'

const { Content } = Layout;

class VideoBox2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      width: '100%',
      minHeight: '100%',
      height: '100%',
    }
  }

  render() {
    const videoImg = this.props.videoBox2Data.img;
    return (
      <Content className={styles.wrapper}>
        <Row gutter={16}>
          <Col xl={9} lg={24} md={24} sm={24} xs={24}>
            <div className={styles.cardTitle}>
              <div className={styles.cardText}>{zh_CN.ChannelTwo}</div>
            </div>
            <div className={styles.cardContent}>
              <img
                style={{ 
                  minHeight: this.state.minHeight, 
                  height: this.state.height, 
                  width: this.state.width,
                  paddingTop: 40,
                  paddingBottom: 40 }}
                src={API_FAKEVIDEO}
                onError={(e) => { e.target.onerror = null; e.target.src = blackbg }}
              />
            </div>
          </Col>
          <Col xl={15} lg={24} md={24} sm={24} xs={24}>
            <div className={styles.cardTitle}>
              <div className={styles.cardText}>{zh_CN.RealTimeFaultData}</div>
            </div>
            <div className={styles.cardContent}>
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
                <Col span={12} className={styles.imgWap}>
                  <img
                    src={videoImg}
                    onError={(e) => { e.target.onerror = null; e.target.src = bg }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

      </Content>
    )
  }
}

export default injectIntl(VideoBox2)