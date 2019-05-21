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
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <div>
        <Header />
        <Content className={styles.wrapper}>
          <FaultChart />
        </Content>
        <Foot />
      </div>
    )
  }
}

export default injectIntl(Analysis)
