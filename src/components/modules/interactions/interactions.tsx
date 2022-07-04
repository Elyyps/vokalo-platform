import React from "react";
import { Chart } from "react-google-charts";
import { IWidget } from "../../../types/cores/widget";
import { ButtonComponent } from "../../cores/button/button";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./interactions.module.scss";
type graphType = "Table" | "AllLine" | "Line";
interface IInteractionsComponent {
  widget: IWidget;
  graphType?: graphType;
  hasButtons?: boolean;
  onClick: (graphType: graphType) => void;
}

export const InteractionsComponent = ({
  widget,
  graphType,
  onClick,
  hasButtons,
}: IInteractionsComponent) => {
  const [selectedButton, setSelectedButton] = React.useState<string[]>([
    "Total",
  ]);
  const [sortBy, setSortBy] = React.useState<string>("Default");

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
    legend: graphType !== "Table" ? { position: "bottom" } : "none",
  };

  const getChartData = () => {
    let header: any = [[widget.data?.xaxis?.name]];
    if (graphType === "Table") {
      header[0].push("", { role: "style" });
    } else {
      selectedButton.forEach((element) => header[0].push(element));
    }
    let filteredList = widget.data?.yaxis.filter((item: any) =>
      selectedButton.includes(item.name)
    );

    let list: any = header;
    widget.data?.xaxis?.data.forEach((item, index) => {
      if (graphType === "Table") {
        list.push([widget.data?.xaxis?.data[index].match(/\b(\w)/g).join(".")]);
      } else {
        list.push([widget.data?.xaxis?.data[index]]);
      }
      filteredList.forEach((element: any, key: number) => {
        list[index + 1].push(filteredList[key].data[index].value);
        if (graphType === "Table") {
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
    if (graphType !== "Table") {
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
        <DropdownComponent title={sortBy} hasBorder>
          {graphType === "Table" ? (
            <ul>
              <li onClick={() => setSortBy("Default")}>Default</li>
              <li onClick={() => setSortBy("Ascending")}>Ascending</li>
              <li onClick={() => setSortBy("Descending")}>Descending</li>
            </ul>
          ) : (
            <ul>
              <li onClick={() => setSortBy("Total")}>Total</li>
              {}
              <li onClick={() => setSortBy("Default")}>Total</li>
            </ul>
          )}
        </DropdownComponent>
      </div>
      {hasButtons && (
        <div className={style["interactions-buttons"]}>
          {widget.data?.yaxis?.map((element: any, key: number) => (
            <ButtonComponent
              title={element.name}
              key={key}
              variant={
                selectedButton.includes(element.name)
                  ? "transparent"
                  : "disabled"
              }
              hasBorder
              onClick={() => element.name && onButtonSelected(element.name)}
            />
          ))}
        </div>
      )}
      <Chart
        chartType={graphType === "Table" ? "ColumnChart" : "LineChart"}
        data={getChartData()}
        options={options}
        className={style["interactions-graph"]}
        width="100%"
      />
      {hasButtons && (
        <div className={style["interactions-switch"]}>
          <span
            style={graphType === "Table" ? {} : { opacity: 0.4 }}
            onClick={() => {
              onClick("Table");
              resetFilter(selectedButton);
            }}
          ></span>
          <span
            style={graphType === "Table" ? { opacity: 0.4 } : {}}
            onClick={() => {
              onClick("AllLine");
              setSortBy("Default");
            }}
          ></span>
        </div>
      )}
    </div>
  );
};
