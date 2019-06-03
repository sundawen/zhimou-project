// vendor
import React from 'react'
import { injectIntl } from 'react-intl'
import echarts from 'echarts'
import initChinaMap from './china'
import styles from './Map.scss'
import zh_CN from '../../../i18n/zh_CN'

const data = require('./map.json');

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        initChinaMap(this)
        this.initData(data)
        this.drawChinaMap()
    }

    handleRegionZoneData = (rawData) => {
        const data = {}
        for (let zone of rawData) {
            data[zone.Region] = zone.num
        }
        return data
    }
    randomData = () => 0

    initData = (rawData) => {
        const data = this.handleRegionZoneData(rawData)
        const ne = data['东北大区']
        const se = data['东南大区']
        const nc = data['华北大区']
        const ec = data['华东大区']
        const sc = data['华南大区']
        const nw = data['西北大区']
        const sw = data['西南大区']
        const me = data['中东大区']
    
        this.largeAreaData = [
          // 东北大区
          { name: '黑龙江', value: ne || this.randomData() },
          { name: '辽宁', value: ne || this.randomData() },
          { name: '吉林', value: ne || this.randomData() },
          // 东南大区
          { name: '福建', value: se || this.randomData() },
          { name: '江西', value: se || this.randomData() },
          { name: '浙江', value: se || this.randomData() },
          // 华北大区
          { name: '北京', value: nc || this.randomData() },
          { name: '河北', value: nc || this.randomData() },
          { name: '内蒙古', value: nc || this.randomData() },
          { name: '山西', value: nc || this.randomData() },
          { name: '天津', value: nc || this.randomData() },
          // 华东大区
          { name: '安徽', value: ec || this.randomData() },
          { name: '江苏', value: ec || this.randomData() },
          { name: '上海', value: ec || this.randomData() },
          // 华南大区 备注：缺少深圳
          { name: '广东', value: sc || this.randomData() },
          { name: '广西', value: sc || this.randomData() },
          { name: '海南', value: sc || this.randomData() },
    
          // 西北大区
          { name: '甘肃', value: nw || this.randomData() },
          { name: '宁夏', value: nw || this.randomData() },
          { name: '青海', value: nw || this.randomData() },
          { name: '陕西', value: nw || this.randomData() },
          { name: '新疆', value: nw || this.randomData() },
          // 西南大区
          { name: '贵州', value: sw || this.randomData() },
          { name: '四川', value: sw || this.randomData() },
          { name: '西藏', value: sw || this.randomData() },
          { name: '云南', value: sw || this.randomData() },
          { name: '重庆', value: sw || this.randomData() },
          // 中东大区
          { name: '河南', value: me || this.randomData() },
          { name: '湖北', value: me || this.randomData() },
          { name: '湖南', value: me || this.randomData() },
          { name: '山东', value: me || this.randomData() },
          // 其他
          { name: '台湾', value: -1 },
          { name: '香港', value: -1 },
          { name: '澳门', value: -1 },
        ]
        this.data = this.largeAreaData
      }

    drawChinaMap = () => {
        const optionMap = {
            backgroundColor: 'transparent',
            // title: {
            //   text: '全国地图大数据',
            //   subtext: '',
            //   x: 'center',
            // },
            tooltip: {
                trigger: 'item',
            },
            // 左侧小导航图标
            visualMap: {
                show: true,
                x: '5%',
                y: '5%',
                precision: '2',
                itemWidth: '60',
                itemHeight: '20',
                textStyle: {
                    color: 'white',
                    fontSize: 12,
                },
                splitList: [
                    { start: 50 },
                    // { start: 25, end: 50 },
                    { start: 0, end: 25 },
                    // { end: 0 },
                ],
                color: ['#089E50', '#E93323', ],
            },
            // 配置属性
            series: [{
                name: zh_CN.equipment,
                type: 'map',
                mapType: 'china',
                roam: true,
                label: {
                    normal: {
                        show: false, // 省份名称
                    },
                    emphasis: {
                        show: false,
                    },
                },
                  data: this.data, // 数据
            }],
        }
        // 初始化echarts实例
        this.myChart = echarts.init(this.mapArea)

        // 使用制定的配置项和数据显示图表
        this.myChart.setOption(optionMap)
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.mapArea} ref={(input) => { this.mapArea = input }} />
            </div>
        )
    }
}

export default injectIntl(Map)
