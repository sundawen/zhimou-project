import React from 'react'
import { injectIntl } from 'react-intl'
import styles from './Gradient.scss'
import zh_CN from '../../../i18n/zh_CN'
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

class Gradient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            chartData: [],
            chartTotal: 0
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const data = [
            {
                month: "Jan",
                BlueScreen: 8,
                Smear: 12,
                Tortuosity: 5
            },
            {
                month: "Feb",
                BlueScreen: 4,
                Smear: 15,
                Tortuosity: 5
            },
            {
                month: "Mar",
                BlueScreen: 10,
                Smear: 16,
                Tortuosity: 8
            },
            {
                month: "Apr",
                BlueScreen: 11,
                Smear: 7,
                Tortuosity: 12
            },
            {
                month: "May",
                BlueScreen: 15,
                Smear: 12,
                Tortuosity: 21
            },
            {
                month: "Jun",
                BlueScreen: 21,
                Smear: 15,
                Tortuosity: 7
            },
            {
                month: "Jul",
                BlueScreen: 25,
                Smear: 17,
                Tortuosity: 23
            },
            {
                month: "Aug",
                BlueScreen: 22,
                Smear: 6,
                Tortuosity: 5
            },
            {
                month: "Sep",
                BlueScreen: 22,
                Smear: 14,
                Tortuosity: 12
            },
            {
                month: "Oct",
                BlueScreen: 17,
                Smear: 11,
                Tortuosity: 5
            },
            {
                month: "Nov",
                BlueScreen: 14,
                Smear: 23,
                Tortuosity: 7
            },
            {
                month: "Dec",
                BlueScreen: 9,
                Smear: 12,
                Tortuosity: 23
            }
        ];
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: "fold",
            fields: ["BlueScreen", "Smear", "Tortuosity"],
            // 展开字段集
            key: "city",
            // key字段
            value: "temperature" // value字段
        });
        console.log(dv);
        const cols = {
            month: {
                range: [0, 1]
            }
        };

        return (
            <div>
                <Chart height={300} data={dv} scale={cols} forceFit className={styles.wrapper}>
                    <Legend />
                    <Axis name="month" />
                    <Axis
                        name="temperature"
                        label={{
                            formatter: val => `${val}`
                        }}
                    />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="line"
                        position="month*temperature"
                        size={2}
                        color={"city"}
                        shape={"smooth"}
                    />
                    <Geom
                        type="polygon"
                        position="month*temperature"
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
        )
    }
}

export default injectIntl(Gradient)