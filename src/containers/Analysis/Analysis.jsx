// vendor
import React from 'react';
import { injectIntl } from 'react-intl';
import { Layout } from 'antd';

// components
import Header from '../../components/Head/Head';
import Foot from '../../components/Foot/Foot';
import FaultChart from './components/FaultChart';

// css
import styles from './Analysis.scss';

const Content = Layout;

/**
 * 历史数据分析图表，目前只有故障数
 */
class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      camIds: [1, 2], // camId 集合
    };
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
  }

  render() {
    const { camIds } = this.state;
    return (
      <Layout>
        <Layout>
          <Header/>
          <Content className={styles.wrapper}>
            {camIds.map((camId) => {
              return <FaultChart camId={camId} key={camId} />
            })}
          </Content>
          <Foot />
        </Layout>
      </Layout>
    )
  }
}

export default injectIntl(Analysis)
