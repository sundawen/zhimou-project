import React from 'react'
import { injectIntl } from 'react-intl'
import styles from './Map.scss'
import zh_CN from '../../../i18n/zh_CN'
import {Chart, Geom, Axis, Tooltip, Coord, Guide} from "bizcharts";
import DataSet from "@antv/data-set";

class Map extends React.Component {

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
        const { DataView } = DataSet;
        const { Html } = Guide;
        const dv = new DataView().source(this.props.data.chartData);
        dv.transform({
            type: "fold",
            fields: ["count"],
            // 展开字段集
            key: "user",
            // key字段
            value: "score" // value字段
        });

        const colsc = {
            score: {
                min: 0,
                max: 80
            }
        };

        return (
            <Chart
                height={300}
                data={dv}
                padding={[0, 0, 0, 0]}
                scale={colsc}
                forceFit
            >
                <Coord type="polar" radius={0.8} />
                <Axis
                    name="item"
                    line={null}
                    tickLine={null}
                    grid={{
                        lineStyle: {
                            lineDash: null
                        },
                        hideFirstLine: false
                    }}
                />
                <Tooltip />
                <Axis
                    name="score"
                    line={null}
                    tickLine={null}
                    grid={{
                        type: "polygon",
                        lineStyle: {
                            lineDash: null
                        },
                        alternateColor: "rgba(0, 0, 0, 0.04)"
                    }}
                />
                <Geom type="line" position="item*score" color="user" size={2} />
                <Geom
                    type="point"
                    position="item*score"
                    color="user"
                    shape="circle"
                    size={4}
                    style={{
                        stroke: "#fff",
                        lineWidth: 1,
                        fillOpacity: 1
                    }}
                />
            </Chart>
        )
    }
}

export default injectIntl(Map)