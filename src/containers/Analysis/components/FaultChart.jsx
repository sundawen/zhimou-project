// vendor
import React from 'react';
import { injectIntl } from 'react-intl';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { 
  Layout, 
  Card, 
  DatePicker, 
  Row, 
  Col, 
  Table, 
  Form, 
  Input,
  Button,
  Select,
  Spin
} from 'antd';
import { Chart, Tooltip, Axis, Legend, StackBar } from 'viser-react';
import { getTimeDistance } from '../../../utils/utils';
// import { getAnalysis1 } from '../../../actions/apps'
import locale from 'antd/lib/date-picker/locale/zh_CN';

// css
import styles from './FaultChart.scss';

const FormItem = Form.Item;
const Content = Layout;
const DataSet = require('@antv/data-set');
const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * 故障数图表
 * @todo 接口未对接
 */
class FaultChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangePickerValue: getTimeDistance('year'), // 默认时间为一年内
      loading         : { chart: false, table: false},                   // 加载中
      faultData       : [],                      // 故障数据
      faultFields     : [],                      // 故障横坐标字段 - 日期
      detailsData     : [],
      pagination      : { defaultPageSize: 5 },
      searchs         : {                        // 列表搜索框
        time     : getTimeDistance('year'),
        errorType: 'All',
      },
      tmpSearchs      : {
        time     : getTimeDistance('year'),
        errorType: 'All',
      },
      apiUrl          : {                        // API URL
        queryHistoryError       : '/HistoryError',
        queryHistoryErrorDetails: '/HistoryErrorDetails',
      },
    };
  }

  componentWillMount = () => {
    // this.props.getAnalysis1(1, '2019-01-01', '2019-12-31', 'All')
  }

  componentDidMount = () => {
    // 获取故障数据
    this.getFaultData();
    // 获取故障列表数据
    const { searchs } = this.state;
    this.getHistoryErrorDetailsData({
      errorType: searchs.errorType,
      time: searchs.time
    });
  }
  // componentWillReceiveProps = (nextProps) => {
  //   if (this.props.analysisList1 !== nextProps.analysisList1) {
  //     this.setState({ analysisList1: nextProps.analysisList1 }, () => {
  //     })
  //   }
  // }

  /**
   * 获取根据当前选择的日期获取故障数据
   */
  getFaultData() {
    const { rangePickerValue, apiUrl, loading } = this.state,
    start = rangePickerValue[0].format('YYYY-MM-DD HH:mm:ss'),
    end   = rangePickerValue[1].format('YYYY-MM-DD HH:mm:ss'),
    camId = this.props.hasOwnProperty('camId') ? this.props.camId : '';
    let params = '?camId='+camId+'&StartTime='+start+'&EndTime='+end;
    loading.chart = true;
    this.setState({loading});
    fetch(apiUrl.queryHistoryError+params, {method: 'get'}).then(res => res.json()).then(data => {
      let newData = [
        { name: "蓝屏" },
        { name: "拖影" },
        { name: "变形" },
      ];
      let fields = [''];
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
      this.state.faultFields.push('')
      console.log(this.state.faultData);
      loading.chart = false;
      this.setState({loading});
    }).catch(err => {
      // 测试代码数据
      console.log('测试数据');
      let data = require('./FaultChartData.json');
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
      // 测试 end
      console.log('[Error] query history error: ', err);
      loading.chart = false;
      this.setState({loading});
    });
  }

  /**
   * 获取历史故障列表数据
   */
  getHistoryErrorDetailsData() {
    const { apiUrl, pagination, loading, searchs } = this.state;
    let tag     = pagination.hasOwnProperty('current') ? (pagination.current-1)*5 : 0,
      camId     = this.props.hasOwnProperty('camId') ? this.props.camId : '',
      errorType = searchs.errorType,
      start     = searchs.time[0].format('YYYY-MM-DD HH:mm:ss'),
      end       = searchs.time[1].format('YYYY-MM-DD HH:mm:ss');
    loading.table = true;
    this.setState({loading});
    let params = '?camId='+camId+'&tag='+tag+'&StartTime='+start+'&EndTime='+end+'&ErrorType='+errorType;
    fetch(apiUrl.queryHistoryErrorDetails + params).then(res => res.json()).then(data => {
      pagination.total = parseInt(data.totalnum);
      data.totalinfo.forEach((item, key) => {
        item.key = key;
      });
      this.setState({
        detailsData: data.totalinfo,
        pagination
      });
      loading.table = false;
      this.setState({loading});
    }).catch(err => {
      // 测试代码数据
      console.log('测试数据');
      let data = require('./HistoryErrorDetails.json');
      pagination.total = parseInt(data.totalnum);
      data.totalinfo.forEach((item, key) => {
        item.key = key;
      });
      this.setState({
        detailsData: data.totalinfo,
        pagination
      });
      // 测试 end
      console.log('[Error] query history error details: ', err);
      loading.table = false;
      this.setState({loading});
    })
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

  /**
   * 搜索
   */
  search() {
    const { tmpSearchs, searchs, pagination } = this.state;
    searchs.errorType = tmpSearchs.errorType;
    searchs.time = tmpSearchs.time;
    pagination.current = 1;
    this.setState({searchs, pagination}, this.getHistoryErrorDetailsData);
  }

  /**
   * 设置搜索条件 - 故障类型
   * @param {string} value 故障类型
   */
  changeSearchErrorType(value) {
    const { tmpSearchs } = this.state;
    tmpSearchs.errorType = value;
    this.setState({
      tmpSearchs
    });
  }

  /**
   * 设置搜索条件 - 时间
   * @param {string} value 时间
   */
  changeSearchTime = (value) => {
    const { tmpSearchs } = this.state;
    tmpSearchs.time = value;
    this.setState({
      tmpSearchs
    });
  }

  /**
   * 分页
   */
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState(
      { pagination: pager }, 
      this.getHistoryErrorDetailsData
    );
  }

  render() {
    const { rangePickerValue, loading, faultData, faultFields, detailsData, pagination, tmpSearchs } = this.state;
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
          showTime={{format:"HH:mm:ss"}}
          format="YYYY-MM-DD HH:mm:ss"
        />
      </div>
    );

    const columns = [{
      title: '摄像头ID',
      dataIndex: 'CameraID',
    }, {
      title: '设备故障类型',
      dataIndex: 'ErrorType',
    }, {
      title: '生产线ID',
      dataIndex: 'ProductionLineID',
    }, {
      title: '故障设备型号',
      dataIndex: 'Model',
    }, {
      title: '故障设备序列号',
      dataIndex: 'SerialNum',
    }, {
      title: '工厂地址',
      dataIndex: 'Location',
    }, {
      title: '故障发生时间',
      dataIndex: 'Date',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span><a href={record.Img} target={'_blank'}>查看故障图片</a></span>
      ),
    }];

    // 搜索框
    const searchBar = (
      <Row className={styles.searchBar}>
        <Col>
          <Button type="primary" icon="search" className={styles.searchBtn}
            onClick={() => this.search()}>搜索</Button>
          <RangePicker 
            locale={locale}
            value={tmpSearchs.time} 
            onChange={this.changeSearchTime}
            className={styles.picker}
            showTime={{format:"HH:mm:ss"}}
            format="YYYY-MM-DD HH:mm:ss"
            className={styles.rangePicker}
          />
          <Select defaultValue={tmpSearchs.errorType} className={styles.select}
            onChange={this.changeSearchErrorType.bind(this)}>
            <Option value="All">全部</Option>
            <Option value="BlueScreen">蓝屏</Option>
            <Option value="Smear">拖影</Option>
            <Option value="Tortuosity">变形</Option>
          </Select>
          <span className={styles.label}>故障类型：</span>
        </Col>
      </Row>
    );

    return (
      <div className={styles.mainBody}>
        <div className={styles.mainCard}>
          <Row gutter={16}>
            <Col span={24}>
              <Card className={styles.faultCard} bordered={true}
                title="故障统计"
                extra={extra}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Spin spinning={loading.chart}>
                      <Chart forceFit height={400} data={data}>
                        <Tooltip />
                        <Axis />
                        <Legend />
                        <StackBar position="日期*故障数" color="name" />
                      </Chart>
                    </Spin>
                  </Col>
                  <Col span={24}>
                    {searchBar}
                    <Table
                      columns={columns}
                      dataSource={detailsData}
                      pagination={pagination}
                      onChange={this.handleTableChange}
                      rowKey={record => record.key}
                      loading={loading.table}
                    >
                    </Table>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default injectIntl(FaultChart)

// const mapStateToProps = (state) => {
//   return {
//     analysisList1: state.analysisList1,
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getAnalysis1: bindActionCreators(getAnalysis1, dispatch),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FaultChart))

