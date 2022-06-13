import React from "react";
import { Chart } from "react-google-charts";
import { IWidget } from "../../../types/cores/widget";
import { ButtonComponent } from "../../cores/button/button";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./interactions.module.scss";

type SortType = "Ascending" | "Descending" | "Default";
interface IInteractionsComponent {
  widget: IWidget;
  isLineChart?: boolean;
  onClick: (isLineChart: boolean) => void;
}

export const InteractionsComponent = ({
  widget,
  isLineChart,
  onClick,
}: IInteractionsComponent) => {
  const [selectedButton, setSelectedButton] = React.useState<string[]>([
    "Total",
  ]);
  const [sortBy, setSortBy] = React.useState<SortType>("Default");

  const options = {
    curveType: "function",
    chartArea: {
      width: "90%",
    },
    vAxis: {
      textStyle: { color: "#C4C4C4" },
      baselineColor: "none",
    },
    hAxis: { textStyle: { color: "#C4C4C4" } },
    legend: isLineChart ? { position: "bottom" } : "none",
  };

  const getChartData = () => {
    let header: any = [[widget.graph?.xAxis?.name]];
    if (!isLineChart) {
      header[0].push("", { role: "style" });
    } else {
      selectedButton.forEach((element) => header[0].push(element));
    }
    let filteredList = widget.graph?.yAxis.filter((item: any) =>
      selectedButton.includes(item.name)
    );

    let list: any = header;
    widget.graph?.xAxis?.data.forEach((item, index) => {
      list.push([widget.graph?.xAxis?.data[index].match(/\b(\w)/g).join(".")]);
      filteredList.forEach((element: any, key: number) => {
        list[index + 1].push(filteredList[key].data[index].value);
        if (!isLineChart) {
          list[index + 1].push(filteredList[key].data[index].color);
        }
      });
    });
    return sortList(list);
  };
  const sortList = (list: any) => {
    if (sortBy !== "Default") {
      return list.sort((a: any, b: any) => {
        if (a[1] && b[1]) {
          return sortBy === "Ascending" ? a[1] - b[1] : b[1] - a[1];
        }
      });
    } else {
      return list;
    }
  };
  const onButtonSelected = (name: string) => {
    let list: string[] = [];
    if (isLineChart) {
      if (selectedButton.includes(name)) {
        list = selectedButton.filter((item) => item !== name);
      } else {
        list = selectedButton.concat(name);
      }
    } else {
      list = [name];
    }
    if (list.length) {
      setSelectedButton(list);
    }
  };
  const resetFilter = (list: string[]) => {
    const lastButton: string = list[list.length - 1];
    if (selectedButton.length) {
      setSelectedButton([lastButton]);
    }
  };

  return (
    <div className={` ${style["interactions"]} widget-container`}>
      <div className={style["interactions-header"]}>
        <h6>{widget.header}</h6>
        <DropdownComponent
          title="Sort"
          hasBorder
          variant={isLineChart ? "disabled" : "transparent"}
        >
          <ul>
            <li onClick={() => setSortBy("Default")}>Default</li>
            <li onClick={() => setSortBy("Ascending")}>Ascending</li>
            <li onClick={() => setSortBy("Descending")}>Descending</li>
          </ul>
        </DropdownComponent>
      </div>

      <div className={style["interactions-buttons"]}>
        {widget.graph?.yAxis?.map((element: any, key: number) => (
          <ButtonComponent
            title={element.name}
            key={key}
            variant={
              selectedButton.includes(element.name) ? "transparent" : "disabled"
            }
            hasBorder
            onClick={() => element.name && onButtonSelected(element.name)}
          />
        ))}
      </div>
      <Chart
        chartType={isLineChart ? "LineChart" : "ColumnChart"}
        data={getChartData()}
        options={options}
        className={style["interactions-graph"]}
        width="100%"
      />
      <div className={style["interactions-switch"]}>
        <span
          style={isLineChart ? { opacity: 0.4 } : {}}
          onClick={() => {
            onClick(false);
            resetFilter(selectedButton);
          }}
        ></span>
        <span
          style={!isLineChart ? { opacity: 0.4 } : {}}
          onClick={() => {
            onClick(true);
            setSortBy("Default");
          }}
        ></span>
      </div>
    </div>
  );
};
