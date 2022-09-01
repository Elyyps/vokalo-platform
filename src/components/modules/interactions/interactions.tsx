import React from "react";
import { Chart } from "react-google-charts";
import { ButtonComponent } from "../../cores/button/button";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./interactions.module.scss";
type ISort = {
  value: string;
  index?: number;
};
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
  const [sortBy, setSortBy] = React.useState<ISort[]>([{ value: "Default" }]);
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
    series: isLineGraph && sortBy.length === 1 ? optionColors : [],
    hAxis: {
      textStyle: {
        color: "#C4C4C4",
        fontSize: 11,
      },
      slantedText: !isLineGraph && true,
      slantedTextAngle: !isLineGraph && 80,
    },
    legend: isLineGraph ? { position: "bottom" } : "none",
  };
  const sortList = (list: any) => {
    if (sortBy[0].value !== "Default") {
      return list.sort((a: any, b: any) => {
        if (a[1] && b[1]) {
          return sortBy[0].value === "Ascending" ? a[1] - b[1] : b[1] - a[1];
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
      (item: any) => sortBy[0].value === item.name
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
          list.push([item]);
          filteredList.forEach((element: any, key: number) => {
            list[index + 1].push(filteredList[key].data[index].value);
          });
        }
      });
      return list && list;
    }
  };
  const getPlayersLineChartData = () => {
    let result = widget.data?.dataSets?.filter((item: any, key: number) =>
      sortBy.some((i) => i.value === item.name && i.index === key)
    );
    if (result) {
      let header: any = [
        [widget.data?.xaxis?.name ? widget.data?.xaxis?.name : ""],
      ];
      sortBy.forEach((element) => header[0].push(element.value));
      let list: any = header;
      result[0].data?.xaxis?.data.forEach((item: any) => {
        list.push([item]);
      });
      result.forEach((part: any) => {
        part.data?.yaxis?.forEach((item: any, index: number) => {
          if (item.name === selectedButton[0]) {
            result[0].data?.xaxis?.data.forEach((element: any, key: number) => {
              list[key + 1].push(item.data[key] ? item.data[key].value : "");
            });
          }
        });
      });
      return list && list;
    }
  };
  const getSelectedButtons = (name: string) => {
    let buttons: string[] = [];
    if (isLineGraph) {
      if (sortBy.length > 1) {
        resetSort();
      }
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
  const resetFilter = () => {
    const lastButton: string = selectedButton[selectedButton.length - 1];
    const lastColor: string = selectedColors[selectedColors.length - 1];
    if (selectedButton.length) {
      setSelectedButton([lastButton]);
      setSelectedColors([lastColor]);
    }
  };
  const resetSort = () => {
    const lastOption = sortBy[sortBy.length - 1];
    if (selectedButton.length) {
      setSortBy([lastOption]);
    }
  };
  const getButtons = () => {
    if (isLineGraph) {
      return widget.data?.dataSets?.find(
        (item: any) => item.name === sortBy[0].value
      );
    } else {
      return widget;
    }
  };
  const getFilters = (name: string, index: number) => {
    let list: any = [];
    const result = sortBy.some((i) => i.value === name && i.index === index);
    if (result) {
      list = sortBy.filter(
        (item) => item.value !== name && item.index !== index
      );
    } else {
      list = sortBy.concat({ value: name, index: index });
    }
    list.length > 0 && setSortBy(list);
  };
  React.useEffect(() => {
    isLineGraph
      ? isNotDefault
        ? setSortBy([{ value: widget.data?.dataSets[0].name, index: 0 }])
        : setSortBy([{ value: "All", index: 0 }])
      : setSortBy([{ value: "Default" }]);

    setData(!isLineGraph ? getTableChartData() : getLineChartData());
  }, [isLineGraph]);

  React.useEffect(() => {
    if (isLineGraph) {
      if (sortBy.length === 1) {
        setData(getLineChartData());
      } else {
        setData(getPlayersLineChartData());
      }
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

  React.useEffect(() => {
    if (sortBy.length > 1) {
      resetFilter();
    }
  }, [sortBy]);
  return (
    <div className={` ${style["interactions"]} widget-container`}>
      <div className={style["interactions-header"]}>
        <h6>{widget.header}</h6>
        <DropdownComponent title={sortBy[0].value} hasBorder>
          {!isLineGraph ? (
            <ul>
              <li onClick={() => setSortBy([{ value: "Default" }])}>Default</li>
              <li onClick={() => setSortBy([{ value: "Ascending" }])}>
                Ascending
              </li>
              <li onClick={() => setSortBy([{ value: "Descending" }])}>
                Descending
              </li>
            </ul>
          ) : (
            <ul style={{ minWidth: "130px" }}>
              {widget.data?.dataSets.map((item: any, key: number) => (
                <li key={key}>
                  <input
                    type={"checkbox"}
                    checked={
                      sortBy.some(
                        (i) => i.value === item.name && i.index === key
                      ) && true
                    }
                    onChange={() => getFilters(item.name, key)}
                  />
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
                selectedButton.some((i) => i.includes(element.name))
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
              resetFilter();
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
