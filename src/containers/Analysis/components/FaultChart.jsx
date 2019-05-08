// vendor
import React from 'react';
import { injectIntl } from 'react-intl';
import { Layout, Card, DatePicker, Row, Col } from 'antd';
import { Chart, Tooltip, Axis, Legend, StackBar, Line, Point } from 'viser-react';
import { getTimeDistance } from '../../../utils/utils';
import locale from 'antd/lib/date-picker/locale/zh_CN';

// css
import styles from './FaultChart.scss';

const Content = Layout;
const DataSet = require('@antv/data-set');
const { RangePicker } = DatePicker;

/**
 * 故障数图表
 * @todo 接口未对接
 */
class FaultChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangePickerValue: getTimeDistance('year'), // 默认时间为一年内
      loading         : false,                   // 加载中
      faultData       : [],                      // 故障数据
      faultFields     : [],                      // 故障横坐标字段 - 日期
      apiUrl          : {                        // API URL
        fault: 'http://10.121.133.29:8888/ancientfalut',
      },
    };
  }

  componentWillMount = () => {
    console.log(this.props);
  }

  componentDidMount = () => {
    this.getFaultData();
  }

  /**
   * 获取根据当前选择的日期获取故障数据
   */
  getFaultData() {
    this.setState({loading: true});
    const { rangePickerValue, apiUrl } = this.state,
          start = rangePickerValue[0].format('YYYY-MM-DD'),
          end   = rangePickerValue[1].format('YYYY-MM-DD'),
          camId = this.props.hasOwnProperty('camId') ? this.props.camId : '';
    let params = '?camId='+camId+'&StartTime='+start+'&EndTime='+end;
    fetch(apiUrl.fault+params, {method: 'get'}).then(res => res.json()).then(data => {
      let newData = [
        { name: "蓝屏" },
        { name: "拖影" },
        { name: "变形" },
      ];
      let fields = [];
      for (let i in data) {
        fields.push(data[i].Date);
        newData[0][data[i].Date] = data[i].BlueScreen;
        newData[1][data[i].Date] = data[i].Smear;
        newData[2][data[i].Date] = data[i].Tortuosity;
      }
      this.setState({
        faultData  : newData,
        faultFields: fields,
      });
      console.log(this.state.faultData);
      this.setState({loading: false});
    }).catch(err => {
      console.log('query statistics data error: ', err);
      this.setState({loading: false});
    });
  }

  /**
   * 设置日期，并更新数据
   * @param {string}
   */
  handleRangePickerChange = rangePickerValue => {
    this.setState({rangePickerValue}, this.getFaultData);
  }

  /**
   * 选择时间段，并更新数据
   * @param {string} type 日期类型
   */
  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    }, this.getFaultData);
  }

  /**
   * 是否选中
   * @param {string} type 日期类型
   */
  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate;
    }
    return '';
  }

  render() {
    const { rangePickerValue, loading, faultData, faultFields } = this.state;
    const dv = new DataSet.View().source(faultData);
    dv.transform({
      type  : 'fold',
      fields: faultFields,
      key   : '日期',
      value : '故障数'
    });
    const data = dv.rows;
    const extra = (
      <div className={styles.extraWrap}>
        <div className={styles.opt}>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>本周</a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>本月</a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>本年</a>
        </div>
        <RangePicker 
          locale={locale}
          value={rangePickerValue} 
          onChange={this.handleRangePickerChange} 
          className={styles.picker}
        />
      </div>
    );

    return (
      <div className={styles.mainBody}>
        <div className={styles.mainCard}>
          <Row gutter={16}>
            <Col span={24}>
              <Card className={styles.faultCard} loading={loading} bordered={true}
                title="故障统计"
                extra={extra}
              >
                <Chart forceFit={true} height={300} data={data}>
                  <Tooltip />
                  <Axis />
                  <Legend />
                  <StackBar position="日期*故障数" color="name" />
                  {/* <Line position="日期*故障数" color="name" /> */}
                  {/* <Point position="日期*故障数" color="name" size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape="circle"/> */}
                </Chart>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default injectIntl(FaultChart)
