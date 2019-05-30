import React from 'react'
import { injectIntl } from 'react-intl'
import styles from './Donut.scss'
import zh_CN from '../../../i18n/zh_CN'
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide } from "bizcharts";
import { Col, Row } from 'antd';
import DataSet from "@antv/data-set";

class Donut extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tDto: [],
            tTotal: 0
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { DataView } = DataSet;
        const { Html } = Guide;
        const dv = new DataView();
        dv.source(this.props.data.tDto).transform({
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
            <Row>
                <Col span={12}>
                    <Chart
                        height={300}
                        data={dv}
                        scale={cols}
                        padding={[70, 20, 20, 20]}
                        forceFit
                    >
                        <Coord type={"theta"} radius={0.9} innerRadius={0.8} />
                        <Axis name="percent" />
                        <Legend
                            position="right"
                            offsetY={-300 / 2 + 120}
                            offsetX={-100}
                        />
                        <Tooltip
                            showTitle={false}
                            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                        />
                        <Guide>
                            <Html
                                position={["50%", "50%"]}
                                html={() => { return ('<div style=color:white;font-size:1.16em;text-align:center;width: 10em;>' + zh_CN.faultStatisticsOfTheDay + '<br><span style=color:white;font-size:2.5em>' + this.props.data.tTotal + '</span>' + zh_CN.platform + '') }}
                                alignX="middle"
                                alignY="middle"
                            />
                        </Guide>
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color="item"
                            tooltip={[
                                "item*percent",
                                (item, percent) => {
                                    percent = percent * 100 + "%";
                                    return {
                                        name: item,
                                        value: percent
                                    };
                                }
                            ]}
                            style={{
                                lineWidth: 1,
                                stroke: "#fff"
                            }}
                        >
                            <Label
                                content="percent"
                                formatter={(val, item) => {
                                    return item.point.item;
                                }}
                            />
                        </Geom>
                    </Chart>
                </Col>
                <Col span={12}>
                    <Chart
                        height={300}
                        data={dv}
                        scale={cols}
                        padding={[70, 20, 20, 20]}
                        forceFit
                    >
                        <Coord type={"theta"} radius={0.9} innerRadius={0.8} />
                        <Axis name="percent" />
                        <Legend
                            position="right"
                            offsetY={-300 / 2 + 120}
                            offsetX={-100}
                        />
                        <Tooltip
                            showTitle={false}
                            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                        />
                        <Guide>
                            <Html
                                position={["50%", "50%"]}
                                html={() => { return ('<div style=color:white;font-size:1.16em;text-align:center;width: 10em;>' + zh_CN.faultStatisticsOfTheMonth + '<br><span style=color:white;font-size:2.5em>' + this.props.data.tTotal + '</span>' + zh_CN.platform + '') }}
                                alignX="middle"
                                alignY="middle"
                            />
                        </Guide>
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color="item"
                            tooltip={[
                                "item*percent",
                                (item, percent) => {
                                    percent = percent * 100 + "%";
                                    return {
                                        name: item,
                                        value: percent
                                    };
                                }
                            ]}
                            style={{
                                lineWidth: 1,
                                stroke: "#fff"
                            }}
                        >
                            <Label
                                content="percent"
                                formatter={(val, item) => {
                                    return item.point.item;
                                }}
                            />
                        </Geom>
                    </Chart>
                </Col>
            </Row>

        )
    }
}

export default injectIntl(Donut)