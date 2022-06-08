import React from "react";
import { TrendComponent } from "../trend/trend";
import style from "./usage-widget.module.scss";
import { Chart } from "react-google-charts";
import { IWidget } from "../../../types/cores/widget";
interface IUsageWidget {
  widget: IWidget;
}
export const UsageWidget = ({ widget }: IUsageWidget) => {
  const options = {
    legend: "none",
    curveType: "function",
    backgroundColor: "transparent",
    chartArea: {
      width: "100%",
      height: "100%",
    },
    colors: ["#f05056"],
    lineWidth: 4,
    hAxis: {
      baselineColor: "none",
      ticks: [],
    },
    vAxis: {
      baselineColor: "none",
      gridlines: { count: 3 },
      gridlineColor: "#E4E4E4",
    },
  };

  const getChartData = () => {
    let list: any = [[widget.graph?.xAxis?.name, widget.graph?.yAxis.name]];
    widget.graph?.xAxis?.data.forEach((item, index) => {
      list.push([
        widget.graph?.xAxis?.data[index],
        widget.graph?.yAxis.data[index],
      ]);
    });
    return list;
  };

  return (
    <div className={` ${style["usage-widget"]} widget-container`}>
      <div className="widget-header">
        <h6>{widget.header}</h6>
        {!widget.label && (
          <TrendComponent
            trendLabel={widget.trendLabel}
            trendDirection={widget.trendDirection}
          />
        )}
      </div>
      <div className={style["usage-widget-content"]}>
        <div className={widget.label && style["usage-widget-graph"]}>
          <Chart
            chartType={widget.label ? "LineChart" : "AreaChart"}
            data={getChartData()}
            options={options}
            width="100%"
            height="100%"
          />
        </div>
        {widget.label && (
          <div className={style["usage-widget-content-right"]}>
            <span>Speech time</span>
            <h3>{widget.label}</h3>
            <div>
              <small>{widget.subHeader}</small>
              <TrendComponent
                trendLabel={widget.trendLabel}
                trendDirection={widget.trendDirection}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
