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
  Spin,
  Tabs
} from 'antd';
import { Chart, Tooltip, Axis, Legend, Geom} from 'bizcharts';
import { getTimeDistance } from '../../../utils/utils';
// import { getAnalysis1 } from '../../../actions/apps'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import zh_CN from '../../../i18n/zh_CN'

// css
import styles from './FaultChart.scss';

const FormItem = Form.Item;
const Content = Layout;
const TabPane = Tabs.TabPane;
const DataSet = require('@antv/data-set');
const { RangePicker } = DatePicker;
const { Option } = Select;

// 画面故障类型集合
const errorTypes = [{
  key: 'All', text: zh_CN.all,
}, {
  key: 'BlueScreen', text: zh_CN.blueScreen,
}, {
  key: 'Smear', text: zh_CN.smear,
}, {
  key: 'Tortuosity', text: zh_CN.tortuosity,
}]

/**
 * 故障数图表
 */
class FaultChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangePickerValue: getTimeDistance('week'), // 默认时间为一年内
      loading         : { chart: false, table: false},                   // 加载中
      faultData       : [],                      // 故障数据
      faultFields     : [],                      // 故障横坐标字段 - 日期
      detailsData     : [],
      pagination      : { defaultPageSize: 5 },
      searchs         : {                        // 列表搜索框
        time     : getTimeDistance('week'),
        errorType: 'All',
      },
      tmpSearchs      : {
        time     : getTimeDistance('week'),
        errorType: 'All',
      },
      sortedInfo      : {},                    // 排序
      apiUrl          : {                        // API URL
        queryHistoryError       : '/HistoryError/total',
        queryHistoryErrorDetails: '/HistoryError/details',
      },
      camIds          : [{                       // camId 集合
        camId: 1, title: zh_CN.video1,
      }, {
        camId: 2, title: zh_CN.video2,
      }],                            
      currentCamId: 1,                           // 当前 tab 选中的 camId
    };
  }

  componentDidMount = () => {
    this.getTabData();
  }

  /**
   * 获取根据当前选择的日期获取故障数据
   */
  getFaultData() {
    const { rangePickerValue, apiUrl, loading, currentCamId } = this.state,
    start = rangePickerValue[0].format('YYYY-MM-DD HH:mm:ss'),
    end   = rangePickerValue[1].format('YYYY-MM-DD HH:mm:ss');
    let params = '?camId='+currentCamId+'&StartTime='+start+'&EndTime='+end;
    loading.chart = true;
    this.setState({loading});
    fetch(apiUrl.queryHistoryError+params, {method: 'get'}).then(res => res.json()).then(data => {
      if (data.hasOwnProperty('length') && data.length > 0) {
        let newData = [
          { name: zh_CN.blueScreen },
          { name: zh_CN.smear },
          { name: zh_CN.tortuosity },
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
      }
      loading.chart = false;
      this.setState({loading});
    }).catch(err => {
      // 测试代码数据
      console.log('测试数据');
      let data = require('./FaultChartData.json');
      let newData = [
        { name: zh_CN.blueScreen },
        { name: zh_CN.smear },
        { name: zh_CN.tortuosity },
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
    const { apiUrl, pagination, loading, searchs, sortedInfo, currentCamId } = this.state;
    let tag     = pagination.hasOwnProperty('current') ? (pagination.current-1)*5 : 0,
      errorType = searchs.errorType,
      start     = searchs.time[0].format('YYYY-MM-DD HH:mm:ss'),
      end       = searchs.time[1].format('YYYY-MM-DD HH:mm:ss'),
      sortKey   = sortedInfo.hasOwnProperty('columnKey') ? sortedInfo.columnKey : '',
      order     = sortedInfo.hasOwnProperty('order') 
                  ? (sortedInfo.order == 'descend' ? 'desc' : 'asc') : '',
      sortType  = (sortKey != '' && order != '') ? '&SortType='+sortKey+'-'+order : '';
    loading.table = true;
    this.setState({loading});
    let params = '?camId='+currentCamId+'&tag='+tag+'&StartTime='+start
                +'&EndTime='+end+'&ErrorType='+errorType+sortType;
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
    if (
      rangePickerValue[0].isSame(value[0], 'day') && 
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
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
   * 切换 tab，重置搜索条件
   */
  changeTab = (activeKey) => {
    const { searchs, pagination, tmpSearchs } = this.state;
    tmpSearchs.errorType = searchs.errorType = 'All';
    tmpSearchs.time = searchs.time = getTimeDistance('week');
    pagination.current = 1;
    // sortedInfo = {};
    this.setState(
      {
        currentCamId: activeKey,
        searchs,
        pagination,
        sortedInfo: {},
        tmpSearchs
      }, 
      this.getTabData
    );
  }

  /**
   * 获取 tab 数据，包括 chart & table
   */
  getTabData() {
    // 获取故障数据
    this.getFaultData();
    // 获取故障列表数据
    this.getHistoryErrorDetailsData();
  }

  /**
   * 分页
   */
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState(
      { pagination: pager, sortedInfo: sorter }, 
      this.getHistoryErrorDetailsData
    );
  }

  /**
   * 获取 errorType 对应的提示
   */
  getErrorTypeText(key) {
    let text = '';
    for (let i = 0; i < errorTypes.length; i++) {
      if (errorTypes[i].key == key) {
        text = errorTypes[i].text;
        break;
      }
    }
    return text;
  }

  render() {
    const { rangePickerValue, loading, faultData, faultFields, 
      detailsData, pagination, tmpSearchs, sortedInfo, camIds } = this.state;
    const dv = new DataSet.View().source(faultData);
    dv.transform({
      type  : 'fold',
      fields: faultFields,
      key   : 'date',
      value : 'num'
    });
    const data = dv.rows;
    const extra = (
      <div className={styles.extraWrap}>
        <div className={styles.opt}>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>{zh_CN.theWeek}</a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>{zh_CN.theMonth}</a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>{zh_CN.theYear}</a>
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
      title: zh_CN.cameraID,
      dataIndex: 'CameraID',
    }, {
      title: zh_CN.typOfFaultScreen,
      dataIndex: 'ErrorType',
      sorter: (a, b) => a.ErrorType.length - b.ErrorType.length,
      sortOrder: sortedInfo.columnKey === 'ErrorType' && sortedInfo.order,
      render: ErrorType => this.getErrorTypeText(ErrorType),
    }, {
      title: zh_CN.productionLineID,
      dataIndex: 'ProductionLineID',
    }, {
      title: zh_CN.model,
      dataIndex: 'Model',
      sorter: (a, b) => a.Model.length - b.Model.length,
      sortOrder: sortedInfo.columnKey === 'Model' && sortedInfo.order,
    }, {
      title: zh_CN.location,
      dataIndex: 'Location',
    }, {
      title: zh_CN.date,
      dataIndex: 'Date',
      sorter: (a, b) => a.Date.length - b.Date.length,
      sortOrder: sortedInfo.columnKey === 'Date' && sortedInfo.order,
    }, {
      title: zh_CN.operation,
      key: 'action',
      render: (text, record) => (
        <span><a href={record.Img} target={'_blank'}>{zh_CN.viewAbnormalPicture}</a></span>
      ),
    }];

    // 搜索框
    const searchBar = (
      <Row className={styles.searchBar}>
        <Col>
          <Button type="primary" icon="search" className={styles.searchBtn}
            onClick={() => this.search()}>{zh_CN.search}</Button>
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
            {errorTypes.map((item) => {
              return <Option value={item.key}>{item.text}</Option>
            })}
          </Select>
          <span className={styles.label}>{zh_CN.typOfFaultScreen}：</span>
        </Col>
      </Row>
    );

    // 防止横坐标柱状溢出和日期显示问题
    const len = faultFields.length;
    const scale = len > 7 ? {
      'date': {
        range: [1/(len-1), 1-1/(len-1)],
      }
    } : {
      'date': {
        type: 'cat'
      }
    };

    return (
      <div className={styles.mainBody}>
        <div className={styles.mainCard}>
          <Row gutter={16}>
            <Col span={24}>
              <Card className={styles.faultCard} bordered={true}
                bodyStyle={{ padding: 0}}
              >
                <Tabs tabBarExtraContent={extra} size="large" onChange={this.changeTab}>
                {camIds.map((cam) => {
                  return (
                    <TabPane tab={cam.title} key={cam.camId}>
                      <Row gutter={16}>
                        <Col span={24} style={{padding: '0 32px'}}>
                          <Spin spinning={loading.chart}>
                            <Chart height={360} data={data} forceFit scale={scale}>
                              <Legend />
                              <Axis name="date" />
                              <Axis name="num" />
                              <Tooltip />
                              <Geom
                                type="intervalStack"
                                position="date*num"
                                color="name"
                              />
                            </Chart>
                          </Spin>
                        </Col>
                        <Col span={24} style={{padding: '0 32px'}}>
                          {searchBar}
                          <Table
                            columns={columns}
                            dataSource={detailsData}
                            pagination={pagination}
                            onChange={this.handleTableChange}
                            rowKey={record => record.key}
                            loading={loading.table}
                            size="middle"
                          >
                          </Table>
                        </Col>
                      </Row>
                    </TabPane>
                  );
                })}
                </Tabs>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default injectIntl(FaultChart)

