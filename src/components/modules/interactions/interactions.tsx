import React from "react";
import { Chart } from "react-google-charts";
import { useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ButtonComponent } from "../../cores/button/button";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import { EmptyStateComponent } from "../../cores/empty-state/empty-state";
import { LightBoxComponent } from "../../cores/lightbox/lightbox";
import { Tooltip } from "../../cores/tooltip/tooltip";
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
  tooltip?: string;
  interval?: number;
  onIntervalChange?: (value: number) => void;
}

export const InteractionsComponent = ({
  widget,
  isLineGraph,
  onClick,
  hasButtons,
  isNotDefault,
  tooltip,
  onIntervalChange,
  interval,
}: IInteractionsComponent) => {
  const { pathname } = useLocation();
  const [selectedButton, setSelectedButton] = React.useState<string[]>([
    "Total",
  ]);
  const [sortBy, setSortBy] = React.useState<ISort[]>([
    { value: pathname.includes("/squad") ? "By date" : "Descending" },
  ]);
  const [data, setData] = React.useState<any[]>();
  const [selectedColors, setSelectedColors] = React.useState<string[]>([
    "#000000",
  ]);
  const [optionColors, setOptionColors] = React.useState<string[]>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const getXaxisTitle = () => {
    if (isLineGraph && widget.data && widget.data.dataSets[0]) {
      return widget.data.dataSets[0].data.xaxis.name
        ? widget.data.dataSets[0].data.xaxis.name
        : "";
    }
  };
  const getYaxisTitle = () => {
    if (isLineGraph) {
      return widget.data?.dataSets[0]?.data?.yaxis.name
        ? widget.data.dataSets[0].data.yaxis.name
        : "Interactions";
    } else {
      return widget.data.yaxis.name
        ? widget.data.yaxis.name
        : "Interactions per minute";
    }
  };
  const options = {
    curveType: "function",
    chartArea: {
      width: "85%",
    },
    vAxis: {
      title: getYaxisTitle(),
      textStyle: { color: "#C4C4C4", fontSize: isOpen ? 20 : 11 },
      baseline: 0,
      viewWindowMode: "explicit",
      viewWindow: { min: 0 },
    },
    seriesType: !isLineGraph && "bars",
    series:
      isLineGraph && sortBy.length === 1
        ? optionColors
        : { 1: { type: "line" } },
    hAxis: {
      title: getXaxisTitle(),
      textStyle: {
        color: "#C4C4C4",
        fontSize: isOpen ? 20 : 11,
      },
      slantedText: !isLineGraph && widget.data?.xaxis.name !== "Date" && true,
      slantedTextAngle:
        !isLineGraph && widget.data?.xaxis.name !== "Date" && 80,
    },
    legend: isLineGraph
      ? { position: "bottom", textStyle: { fontSize: isOpen && 18 } }
      : "none",
  };
  const sortList = (list: any) => {
    if (sortBy[0].value === "Alphabetically") {
      return list;
    } else if (sortBy[0].value === "By date") {
      let sorted = list.slice(1, list.length).sort((a: any, b: any) => {
        return a[0] - b[0];
      });
      sorted = [list[0]].concat(sorted);
      return sorted;
    } else {
      let sorted = list.slice(1, list.length).sort((a: any, b: any) => {
        if (b[1] >= 0 && a[1] >= 0) {
          return sortBy[0].value === "Ascending" ? a[1] - b[1] : b[1] - a[1];
        }
      });
      sorted = [list[0]].concat(sorted);
      return sorted;
    }
  };
  const getTableChartData = () => {
    let header: any = [
      [widget.data?.xaxis?.name ? widget.data?.xaxis?.name : ""],
    ];
    // header[0].push("", { role: "style" });
    header[0].push("", "Average");
    let filteredList =
      widget.data?.yaxis &&
      widget.data?.yaxis.filter((item: any) =>
        selectedButton.includes(item.name)
      );
    let total = 0;
    filteredList[0].data.map((a: any, key: any) => (total += a.value));
    const average = total / filteredList[0].data.length;
    let list: any = header;
    widget.data?.xaxis?.data.forEach((item: any, index: number) => {
      if (!isLineGraph && item !== "/") {
        if (widget["type"] == "PROFILE_INTERACTION_GRAPHS") {
          list.push([item]);
        } else if (item && item.includes(" ")) {
          let firstName = widget.data?.xaxis?.data[index].split(" ")[0];
          let firstNameStart = firstName[0];
          let lastName = widget.data?.xaxis?.data[index].split(" ")[1];
          if (lastName.length > 1) {
            list.push([firstNameStart + "." + lastName]);
          } else {
            list.push([firstName]);
          }
        } else {
          list.push([item.replace("-", "").replace("-", "")]);
        }
      } else {
        item && list.push([widget.data?.xaxis?.data[index]]);
      }

      item &&
        filteredList.forEach((element: any, key: number) => {
          list[index + 1].push(filteredList[key].data[index].value);
          list[index + 1].push(average);
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
      let sortedList = filteredList.sort(
        (a: any, b: any) =>
          selectedButton.indexOf(a.name) - selectedButton.indexOf(b.name)
      );
      result.data?.xaxis?.data.forEach((item: any, index: number) => {
        if (item) {
          list.push([item]);
          sortedList.forEach((element: any, key: number) => {
            list[index + 1].push(sortedList[key].data[index].value);
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
      let idsToIndexes: string[] = [];
      for (var i = 0; i < sortBy.length; i++) {
        idsToIndexes.push(sortBy[i].value);
      }
      let sortedResult = result.sort(
        (a: any, b: any) =>
          idsToIndexes.indexOf(a.name) - idsToIndexes.indexOf(b.name)
      );
      sortedResult.forEach((part: any) => {
        part.data?.yaxis?.forEach((item: any, index: number) => {
          if (item.name === selectedButton[0]) {
            sortedResult[0].data?.xaxis?.data.forEach(
              (element: any, key: number) => {
                list[key + 1].push(item.data[key] ? item.data[key].value : "");
              }
            );
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
  const getDropdownTitle = () => {
    if (sortBy.length > 1) {
      return sortBy.length + " selections";
    } else {
      return sortBy[0].value;
    }
  };
  React.useEffect(() => {
    isLineGraph
      ? isNotDefault
        ? setSortBy([{ value: widget.data?.dataSets[0]?.name, index: 0 }])
        : setSortBy([{ value: "Average", index: 0 }])
      : setSortBy([
          { value: pathname.includes("/squad") ? "By date" : "Descending" },
        ]);

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
  }, [isLineGraph, sortBy, selectedButton, widget]);

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

  const returnContent = () => {
    return (
      <div
        className={` ${style["interactions"]} ${
          isOpen && style["interactions-big"]
        } widget-container`}
      >
        <div className={style["interactions-header"]}>
          <h6>
            {widget.header}
            {tooltip && <Tooltip content={tooltip} />}
          </h6>
          <div>
            {!isOpen && (
              <span onClick={() => setIsOpen(true)}>
                <ReactSVG src="/icons/fullscreen.svg" />
              </span>
            )}
            {data && onIntervalChange && isLineGraph && (
              <DropdownComponent title={`${interval}`} hasBorder>
                <ul>
                  <li onClick={() => onIntervalChange(1)}>1</li>
                  <li onClick={() => onIntervalChange(2)}>2</li>
                  <li onClick={() => onIntervalChange(5)}>5</li>
                  <li onClick={() => onIntervalChange(10)}>10</li>
                </ul>
              </DropdownComponent>
            )}
            {data && data[1] && data[1].length > 1 && (
              <DropdownComponent title={getDropdownTitle()} hasBorder>
                {!isLineGraph ? (
                  <ul>
                    <li
                      onClick={() =>
                        setSortBy([
                          {
                            value: pathname.includes("/squad")
                              ? "By date"
                              : "Alphabetically",
                          },
                        ])
                      }
                    >
                      {pathname.includes("/squad")
                        ? "By date"
                        : "Alphabetically"}
                    </li>
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
                      <li key={key} onClick={() => getFilters(item.name, key)}>
                        <input
                          type={"checkbox"}
                          onChange={() => ""}
                          checked={
                            sortBy.some(
                              (i) => i.value === item.name && i.index === key
                            ) && true
                          }
                        />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </DropdownComponent>
            )}
          </div>
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
        {data && data[1] && data[1].length > 1 ? (
          <div className={style["interactions-content"]}>
            {hasButtons && (
              <span
                // style={isLineGraph ? {} : { opacity: 0.4 }}
                onClick={() => {
                  onClick(!isLineGraph);
                  resetFilter();
                }}
              >
                <ReactSVG src="/icons/arrow-down.svg" />
              </span>
            )}
            <Chart
              chartType={!isLineGraph ? "ComboChart" : "LineChart"}
              data={data}
              options={options}
              className={style["interactions-graph"]}
              width="100%"
            />
            {hasButtons && (
              <span
                // style={isLineGraph ? { opacity: 0.4 } : {}}
                onClick={() => {
                  onClick(!isLineGraph);
                  isLineGraph && resetFilter();
                  selectedColors.length === 0 &&
                    selectedButton[0] === "Total" &&
                    getSelectedColors("#000000");
                }}
              >
                <ReactSVG src="/icons/arrow-down.svg" />
              </span>
            )}
          </div>
        ) : (
          <EmptyStateComponent />
        )}
        {hasButtons && data && data[1] && data[1].length > 1 && (
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
  return !isOpen ? (
    returnContent()
  ) : (
    <LightBoxComponent
      isLightBoxOpen={isOpen}
      setLightBoxOpen={() => setIsOpen(false)}
    >
      {returnContent()}
    </LightBoxComponent>
  );
};
