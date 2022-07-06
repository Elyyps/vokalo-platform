import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { IProfile } from "../../../types/modules/squad";
import { converToHours } from "../../../utils/convertTime";
import { sortColumn } from "../../../utils/sortColumn";
import { TrendComponent } from "../../cores/trend/trend";
import style from "./squad-table.module.scss";
interface ISquadTableComponent {
  squad: IProfile[];
}
export const SquadTableComponent = ({ squad }: ISquadTableComponent) => {
  const [sortConfig, setSortConfig] = React.useState<any>({
    column: { name: "name", param: "" },
    ascending: true,
  });
  let navigate = useNavigate();
  const columns = [
    { name: "speech time", param: "" },
    { name: "type", param: "" },
    { name: "speech time", param: "" },
    { name: "average interaction length", param: "" },
    { name: "average tnteractions", param: "" },
    { name: "distribution", param: "" },
    { name: "percentage", param: "" },
  ];
  const getPercentage = (value: number) => {
    return Math.round(value * 100);
  };
  const sortedSquad = React.useMemo(() => {
    let sortableSquad = [...squad];
    return sortColumn(
      sortableSquad,
      sortConfig.column.name,
      sortConfig.column.param,
      sortConfig.ascending
    );
  }, [sortConfig, squad]);

  return sortedSquad ? (
    <div className={` ${style["squad-table"]} section-item`}>
      <div className={` ${style["squad-table"]} section-item`}>
        <table>
          <thead>
            <tr>
              <th colSpan={2} scope="colgroup">
                Personal
              </th>
              <th colSpan={3} scope="colgroup">
                Communication
              </th>
              <th colSpan={1} scope="colgroup">
                Feedback
              </th>
              <th colSpan={1} scope="colgroup">
                Orientation
              </th>
            </tr>
            <tr>
              {columns.map((column, key) => (
                <th key={key}>
                  <span
                    onClick={() =>
                      setSortConfig({
                        column,
                        ascending: !sortConfig.ascending,
                      })
                    }
                  >
                    {column.name} <ReactSVG src="/icons/arrow-down.svg" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedSquad.map((row: IProfile, key) => (
              <tr key={key} onClick={() => navigate("/squad/" + row.id)}>
                <td>
                  {row.firstName} {row.lastName}
                </td>
                <td>{row.role}</td>
                <td>{converToHours(row.communicationAggregations.minutes)}</td>
                <td>
                  {converToHours(
                    row.communicationAggregations.averageInteractionLength
                  )}
                </td>
                <td>
                  {converToHours(
                    row.communicationAggregations.averageInteractions
                  )}
                </td>
                <td>
                  <div className={style["squad-table-progress"]}>
                    <div
                      style={{
                        width: `${getPercentage(row.moodAggregations.value)}%`,
                      }}
                    />
                  </div>
                </td>
                <td>
                  <TrendComponent
                    trendLabel={getPercentage(
                      row.orientationAggregations.value
                    )}
                    trendDirection={row.moodAggregations.trendDirection}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div />
  );
};
