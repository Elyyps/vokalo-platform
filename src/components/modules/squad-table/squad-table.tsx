import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { IProfile } from "../../../types/modules/squad";
import { converToHours, converToMinutes } from "../../../utils/convertTime";
import { sortColumn } from "../../../utils/sortColumn";
import { PaginationComponent } from "../../cores/pagination/pagination";
import { TrendComponent } from "../../cores/trend/trend";
import style from "./squad-table.module.scss";
interface ISquadTableComponent {
  squad: IProfile[];
}
export const SquadTableComponent = ({ squad }: ISquadTableComponent) => {
  const [cookies] = useCookies(["rows"]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [sortConfig, setSortConfig] = React.useState<any>({
    column: { name: "name", param: [""] },
    ascending: false,
  });
  let navigate = useNavigate();
  const columns = [
    { name: "name", param: ["name"] },
    { name: "type", param: ["role"] },
    { name: "playing time", param: ["communicationAggregations", "minutes"] },
    {
      name: "average interaction length",
      param: ["communicationAggregations", "averageInteractionLength"],
    },
    {
      name: "average interactions",
      param: ["communicationAggregations", "averageInteractions"],
    },
    // { name: "distribution", param: ["moodAggregations", "value"] },
    { name: "percentage", param: ["orientationAggregations", "value"] },
  ];
  const rows = cookies.rows ? cookies.rows : 24;
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
  }, [sortConfig, squad, cookies.rows]);

  return sortedSquad ? (
    <div>
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
              {/* <th colSpan={1} scope="colgroup">
                Feedback
              </th> */}
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
            {sortedSquad
              .slice((currentPage - 1) * rows, currentPage * rows)
              .map((row: IProfile, key) => (
                <tr key={key} onClick={() => navigate("/squad/" + row.id)}>
                  <td>
                    {row.firstName} {row.lastName}
                  </td>
                  <td>{row.role}</td>
                  <td>
                    {converToHours(row.communicationAggregations.minutes)}
                  </td>
                  <td>
                    {Math.round(
                      row.communicationAggregations.averageInteractionLength *
                        10
                    ) / 10}
                  </td>
                  <td>
                    {Math.round(
                      row.communicationAggregations.averageInteractions * 10
                    ) / 10}
                  </td>
                  {/* <td>
                    <div className={style["squad-table-progress"]}>
                      <div
                        style={{
                          width: `${getPercentage(
                            row.moodAggregations.value
                          )}%`,
                        }}
                      />
                    </div>
                  </td> */}
                  <td>
                    {/* <TrendComponent
                      trendLabel={getPercentage(
                        row.orientationAggregations.value
                      )}
                      trendDirection={
                        row.orientationAggregations.trendDirection
                      }
                    /> */}
                    {getPercentage(row.orientationAggregations.value)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div></div>
      </div>
      <PaginationComponent
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        list={sortedSquad}
      />
    </div>
  ) : (
    <div />
  );
};
