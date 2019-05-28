import React from 'react'
import { injectIntl } from 'react-intl'
import styles from './Gradient.scss'
import zh_CN from '../../../i18n/zh_CN'
import { Chart, Geom, Axis, Tooltip, Coord, Guide} from "bizcharts";
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
        const { DataView } = DataSet;
        const dv = new DataView();
        dv.source(this.props.data.chartData).transform({
            type: "percent",
            field: "count",
            dimension: "item",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = val * 100 + "%";
                    return val;
                }
            }
        };

        return (
            <Chart height={300} data={dv} forceFit>
                <Coord transpose />
                <Axis
                    name="item"
                    label={{
                        offset: 12
                    }}
                />
                <Axis name="count" />
                <Tooltip />
                <Geom type="interval" position="item*count" />
            </Chart>
        )
    }
}

export default injectIntl(Gradient)