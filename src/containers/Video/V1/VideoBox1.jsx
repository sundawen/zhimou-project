import React from 'react'
import { injectIntl } from 'react-intl'
import {Col, Layout, Row, Card} from 'antd';
import styles from './VideoBox1.scss'

const {Content} = Layout;

class VideoBox1 extends React.Component {

    render() {
        return (
          <Content className={styles.wrapper}>
            <div className={styles.mainBody}>
              <div className={styles.mainCard}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="Card title" bordered={false}>
                      <div className={styles.cardHeight}></div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Card title" bordered={false}>
                      <div className={styles.cardHeight}></div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Card title" bordered={false}>
                      <div className={styles.cardHeight}></div>
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