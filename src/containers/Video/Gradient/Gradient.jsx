import React from 'react'
import { injectIntl } from 'react-intl'
import styles from './Gradient.scss'
import zh_CN from '../../../i18n/zh_CN'
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";
import { Spin } from 'antd';
import { API_HISTORYERROR_STATISTIC_PERIOD } from '../../../constants/API'

class Gradient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: { gradent: false },
            data: []
        }
    }

    componentDidMount() {
        this.getYearData();
    }

    componentWillUnmount() {
    }

    getYearData() {
        const { loading } = this.state;
        loading.gradent = true;
        this.setState({ loading });
        fetch(API_HISTORYERROR_STATISTIC_PERIOD + 'year').then(res => res.json()).then(data => {
            data[0].Month = "Jan";
            data[1].Month = "Feb";
            data[2].Month = "Mar";
            data[3].Month = "Apr";
            data[4].Month = "May";
            data[5].Month = "Jun";
            data[6].Month = "Jul";
            data[7].Month = "Aug";
            data[8].Month = "Sep";
            data[9].Month = "Oct";
            data[10].Month = "Nov";
            data[11].Month = "Dec";
            this.setState({
                data: data
            });
            loading.gradent = false;
            this.setState({ loading });
        }).catch(err => {
            // 测试代码数据
            console.log('全年折线图为测试数据');
            let data = [
                { Month: "1", BlueScreen: 23, Smear: 12, Tortuosity: 5 },
                { Month: "2", BlueScreen: 4, Smear: 15, Tortuosity: 5 },
                { month: "3", BlueScreen: 10, Smear: 16, Tortuosity: 8 },
                { Month: "4", BlueScreen: 11, Smear: 7, Tortuosity: 12 },
                { Month: "5", BlueScreen: 15, Smear: 12, Tortuosity: 21 },
                { Month: "6", BlueScreen: 21, Smear: 15, Tortuosity: 7 },
                { Month: "7", BlueScreen: 25, Smear: 17, Tortuosity: 23 },
                { Month: "8", BlueScreen: 22, Smear: 6, Tortuosity: 5 },
                { Month: "9", BlueScreen: 22, Smear: 14, Tortuosity: 12 },
                { Month: "10", BlueScreen: 17, Smear: 11, Tortuosity: 5 },
                { Month: "11", BlueScreen: 14, Smear: 23, Tortuosity: 7 },
                { Month: "12", BlueScreen: 9, Smear: 12, Tortuosity: 23 }
            ];
            data[0].Month = "Jan";
            data[1].Month = "Feb";
            data[2].Month = "Mar";
            data[3].Month = "Apr";
            data[4].Month = "May";
            data[5].Month = "Jun";
            data[6].Month = "Jul";
            data[7].Month = "Aug";
            data[8].Month = "Sep";
            data[9].Month = "Oct";
            data[10].Month = "Nov";
            data[11].Month = "Dec";
            this.setState({
                data: data
            });
            loading.gradent = false;
            this.setState({ loading });
        })
    }

    render() {
        const { data, loading } = this.state;
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: "fold",
            fields: ["BlueScreen", "Smear", "Tortuosity"],
            // 展开字段集
            key: "city",
            // key字段
            value: "num" // value字段
        });
        console.log(dv);
        const cols = {
            Month: {
                range: [0, 1]
            }
        };

        return (
            <Spin spinning={loading.gradent}>
                <div>
                    <Chart height={300} data={dv} scale={cols} forceFit className={styles.wrapper}>
                        <Legend 
                            textStyle={{fill:'white',fontSize:12}}
                        />
                        <Axis name="Month"
                            label={{
                                textStyle: {
                                    fontWeight: 200,
                                    fill: 'white',
                                },
                            }}
                        />
                        <Axis
                            name="num"
                            label={{
                                formatter: val => `${val}`,
                                textStyle: {
                                    fontWeight: 200,
                                    fill: 'white',
                                  },
                            }}
                            grid={{
                                lineStyle: {
                                  stroke: 'rgba(255,255,255,.255)',
                                },
                              }}
                        />
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom
                            type="line"
                            position="Month*num"
                            size={2}
                            color={"city"}
                            shape={"smooth"}
                        />
                        <Geom
                            type="polygon"
                            position="Month*num"
                            size={4}
                            shape={"circle"}
                            color={"city"}
                            style={{
                                stroke: "#fff",
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                </div>
            </Spin>
        )
    }
}

export default injectIntl(Gradient)