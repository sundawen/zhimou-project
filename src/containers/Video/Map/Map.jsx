// vendor
import React from 'react'
import { injectIntl } from 'react-intl'
import echarts from 'echarts'
import initChinaMap from './china'
import styles from './Map.scss'
import zh_CN from '../../../i18n/zh_CN'

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        initChinaMap(this)
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

    drawChinaMap = () => {
        const optionMap = {
            backgroundColor: 'transparent',
            title: {
              text: zh_CN.factoryInChina,
              subtext: '',
              x: 'center',
              textStyle: {
                color: 'white',
                fontWeight: 500,
                fontSize: 16,
            },
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: '10%',
                top: '10%',
                data:[zh_CN.ordinaryFactory, zh_CN.smartFactory],
                textStyle: {
                    color: 'white',
                    fontSize: 12,
                },
            },
            // 左侧小导航图标
            visualMap: {
                min: 0,
                max: 200,
                right: '10%',
                top: '40%',
                itemWidth: 8,
                itemHeight: 50,
                text:[zh_CN.high, zh_CN.low],
                calculable : true,
                textStyle: {
                    color: 'white',
                    fontSize: 12,
                },
                color: ['#e0ffff', '#006edd'],
            },
            // 配置属性
            series: [{
                name: zh_CN.smartFactory,
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: Math.round(Math.random()*100)},
                    {name: '天津',value: Math.round(Math.random()*100)},
                    {name: '上海',value: Math.round(Math.random()*100)},
                    {name: '重庆',value: Math.round(Math.random()*100)},
                    {name: '安徽',value: Math.round(Math.random()*100)},
                    {name: '浙江',value: Math.round(Math.random()*100)},
                    {name: '吉林',value: Math.round(Math.random()*100)},
                    {name: '福建',value: Math.round(Math.random()*100)},
                    {name: '湖北',value: Math.round(Math.random()*100)},
                    {name: '广东',value: Math.round(Math.random()*100)},
                    {name: '四川',value: Math.round(Math.random()*100)},
                    {name: '香港',value: Math.round(Math.random()*100)},
                    {name: '澳门',value: Math.round(Math.random()*100)}
                ]
            },
            {
                name: zh_CN.ordinaryFactory,
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: Math.round(Math.random()*100)},
                    {name: '天津',value: Math.round(Math.random()*100)},
                    {name: '上海',value: Math.round(Math.random()*100)},
                    {name: '重庆',value: Math.round(Math.random()*100)},
                    {name: '河北',value: Math.round(Math.random()*100)},
                    {name: '河南',value: Math.round(Math.random()*100)},
                    {name: '云南',value: Math.round(Math.random()*100)},
                    {name: '辽宁',value: Math.round(Math.random()*100)},
                    {name: '黑龙江',value: Math.round(Math.random()*100)},
                    {name: '湖南',value: Math.round(Math.random()*100)},
                    {name: '安徽',value: Math.round(Math.random()*100)},
                    {name: '山东',value: Math.round(Math.random()*100)},
                    {name: '新疆',value: Math.round(Math.random()*100)},
                    {name: '江苏',value: Math.round(Math.random()*100)},
                    {name: '浙江',value: Math.round(Math.random()*100)},
                    {name: '江西',value: Math.round(Math.random()*100)},
                    {name: '湖北',value: Math.round(Math.random()*100)},
                    {name: '广西',value: Math.round(Math.random()*100)},
                    {name: '甘肃',value: Math.round(Math.random()*100)},
                    {name: '山西',value: Math.round(Math.random()*100)},
                    {name: '内蒙古',value: Math.round(Math.random()*100)},
                    {name: '陕西',value: Math.round(Math.random()*100)},
                    {name: '吉林',value: Math.round(Math.random()*100)},
                    {name: '福建',value: Math.round(Math.random()*100)},
                    {name: '贵州',value: Math.round(Math.random()*100)},
                    {name: '广东',value: Math.round(Math.random()*100)},
                    {name: '青海',value: Math.round(Math.random()*100)},
                    {name: '西藏',value: Math.round(Math.random()*100)},
                    {name: '四川',value: Math.round(Math.random()*100)},
                    {name: '宁夏',value: Math.round(Math.random()*100)},
                    {name: '海南',value: Math.round(Math.random()*100)},
                    {name: '台湾',value: Math.round(Math.random()*100)},
                    {name: '香港',value: Math.round(Math.random()*100)},
                    {name: '澳门',value: Math.round(Math.random()*100)}
                ]
            },],
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
