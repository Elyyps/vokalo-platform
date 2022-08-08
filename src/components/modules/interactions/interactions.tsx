import React from "react";
import { Chart } from "react-google-charts";
import { ButtonComponent } from "../../cores/button/button";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./interactions.module.scss";
interface IInteractionsComponent {
  widget: any;
  isLineGraph?: boolean;
  hasButtons?: boolean;
  onClick: (isLineGraph: boolean) => void;
  isNotDefault?: boolean;
}

export const InteractionsComponent = ({
  widget,
  isLineGraph,
  onClick,
  hasButtons,
  isNotDefault,
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
      baseline: 0,
    },
    hAxis: { textStyle: { color: "#C4C4C4" } },
    legend: isLineGraph ? { position: "bottom" } : "none",
  };
  const getTableChartData = () => {
    let header: any = [
      [widget.data?.xaxis?.name ? widget.data?.xaxis?.name : ""],
    ];
    header[0].push("", { role: "style" });
    let filteredList =
      widget.data?.yaxis &&
      widget.data?.yaxis.filter((item: any) =>
        selectedButton.includes(item.name)
      );
    let list: any = header;
    widget.data?.xaxis?.data.forEach((item: any, index: number) => {
      if (!isLineGraph && item !== "/") {
        item &&
          list.push([widget.data?.xaxis?.data[index].match(/\b\w/g).join(".")]);
      } else {
        item && list.push([widget.data?.xaxis?.data[index]]);
      }
      item &&
        filteredList.forEach((element: any, key: number) => {
          list[index + 1].push(filteredList[key].data[index].value);
          list[index + 1].push(filteredList[key].data[index].color);
        });
    });
    return list.length > 1 ? sortList(list) : undefined;
  };
  const getLineChartData = () => {
    let result = widget.data?.dataSets?.find(
      (item: any) => item.name === sortBy
    );
    if (result) {
      let header: any = [
        [widget.data?.xaxis?.name ? widget.data?.xaxis?.name : ""],
      ];
      selectedButton.forEach((element) => header[0].push(element));
      let filteredList = result.data?.yaxis.filter((item: any) =>
        selectedButton.includes(item.name)
      );
      let list: any = header;
      result.data?.xaxis?.data.forEach((item: any, index: number) => {
        if (item) {
          list.push([result.data?.xaxis?.data[index]]);
          filteredList.forEach((element: any, key: number) => {
            list[index + 1].push(filteredList[key].data[index].value);
          });
        }
      });
      return list && list;
    }
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
    if (isLineGraph) {
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
  const getButtons = () => {
    if (isLineGraph) {
      return widget.data?.dataSets?.find((item: any) => item.name === sortBy);
    } else {
      return widget;
    }
  };
  React.useEffect(() => {
    isLineGraph
      ? isNotDefault
        ? setSortBy(widget.data?.dataSets[1].name)
        : setSortBy("All")
      : setSortBy("Default");
  }, [isLineGraph]);

  return (
    <div className={` ${style["interactions"]} widget-container`}>
      <div className={style["interactions-header"]}>
        <h6>{widget.header}</h6>
        <DropdownComponent title={sortBy} hasBorder>
          {!isLineGraph ? (
            <ul>
              <li onClick={() => setSortBy("Default")}>Default</li>
              <li onClick={() => setSortBy("Ascending")}>Ascending</li>
              <li onClick={() => setSortBy("Descending")}>Descending</li>
            </ul>
          ) : (
            <ul style={{ minWidth: "130px" }}>
              {widget.data?.dataSets.map((item: any, key: number) => (
                <li key={key} onClick={() => setSortBy(item.name)}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </DropdownComponent>
      </div>
      {hasButtons && getButtons() && (
        <div className={style["interactions-buttons"]}>
          {getButtons().data?.yaxis?.map((element: any, key: number) => (
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
        chartType={!isLineGraph ? "ColumnChart" : "LineChart"}
        data={!isLineGraph ? getTableChartData() : getLineChartData()}
        options={options}
        className={style["interactions-graph"]}
        width="100%"
      />
      {hasButtons && (
        <div className={style["interactions-switch"]}>
          <span
            style={!isLineGraph ? {} : { opacity: 0.4 }}
            onClick={() => {
              onClick(false);
              resetFilter(selectedButton);
            }}
          ></span>
          <span
            style={!isLineGraph ? { opacity: 0.4 } : {}}
            onClick={() => {
              onClick(true);
              console.log("heree");
            }}
          ></span>
        </div>
      )}
    </div>
  );
};
