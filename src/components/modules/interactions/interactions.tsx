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
  const [data, setData] = React.useState();
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [optionColors, setOptionColors] = React.useState<string[]>();

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
    series: isLineGraph ? optionColors : [],
    hAxis: {
      textStyle: {
        color: "#C4C4C4",
        fontSize: 11,
      },
      slantedText: true,
      slantedTextAngle: 80,
    },
    legend: isLineGraph ? { position: "bottom" } : "none",
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
          list.push([
            widget.data?.xaxis?.data[index].split(" ")[0].split("")[0] +
              "." +
              widget.data?.xaxis?.data[index].split(" ")[1],
          ]);
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
  const getSelectedButtons = (name: string) => {
    let buttons: string[] = [];
    if (isLineGraph) {
      if (selectedButton.includes(name)) {
        buttons = selectedButton.filter((item) => item !== name);
      } else {
        buttons = selectedButton.concat(name);
      }
    } else {
      buttons = [name];
    }
    if (buttons.length) {
      setSelectedButton(buttons);
    }
  };
  const getSelectedColors = (name: string) => {
    let colors: string[] = [];
    if (isLineGraph) {
      if (selectedColors?.includes(name)) {
        colors = selectedColors.filter((item) => item !== name);
      } else {
        colors = selectedColors?.concat(name);
      }
    } else {
      colors = [name];
    }
    if (colors.length) {
      setSelectedColors(colors);
    }
  };
  const resetFilter = (buttons: string[], colors: string[]) => {
    const lastButton: string = buttons[buttons.length - 1];
    const lastColor: string = colors[colors.length - 1];
    if (selectedButton.length) {
      setSelectedButton([lastButton]);
      setSelectedColors([lastColor]);
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

    setData(!isLineGraph ? getTableChartData() : getLineChartData());
  }, [isLineGraph]);

  React.useEffect(() => {
    if (isLineGraph) {
      setData(getLineChartData());
    } else {
      setData(getTableChartData());
    }
  }, [isLineGraph, sortBy, selectedButton]);

  React.useEffect(() => {
    if (selectedColors?.length) {
      const list: any = selectedColors.map((item: string) => {
        return { color: item };
      });
      const result = Object.assign({}, list);
      if (result) {
        setOptionColors(result);
      }
    }
  }, [selectedColors, isLineGraph]);
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
                  <input type={"checkbox"} />
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
              onClick={() => {
                element.name && getSelectedButtons(element.name);
                element.color && getSelectedColors(element.color);
              }}
            />
          ))}
        </div>
      )}
      <Chart
        chartType={!isLineGraph ? "ColumnChart" : "LineChart"}
        data={data}
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
              resetFilter(selectedButton, selectedColors);
            }}
          ></span>
          <span
            style={!isLineGraph ? { opacity: 0.4 } : {}}
            onClick={() => {
              onClick(true);
              selectedColors.length === 0 &&
                selectedButton[0] === "Total" &&
                getSelectedColors("#000000");
            }}
          ></span>
        </div>
      )}
    </div>
  );
};
