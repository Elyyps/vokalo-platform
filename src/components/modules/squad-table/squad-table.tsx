import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ISquad } from "../../../types/modules/squad";
import { converToMinutes } from "../../../utils/convertTime";
import { sortColumn } from "../../../utils/sortColumn";
import { TrendComponent } from "../../cores/trend/trend";
import style from "./squad-table.module.scss";
interface ISquadTableComponent {
  squad: ISquad[];
}
export const SquadTableComponent = ({ squad }: ISquadTableComponent) => {
  const [sortConfig, setSortConfig] = React.useState<any>({
    column: "name",
    ascending: true,
  });
  let navigate = useNavigate();

  const sortedSquad = React.useMemo(() => {
    let sortableSquad = [...squad];
    return sortColumn(sortableSquad, sortConfig.column, sortConfig.ascending);
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
                Motivation
              </th>
            </tr>
            <tr>
              {Object.keys(squad[0]).map((column, key) => (
                <th key={key}>
                  <span
                    onClick={() =>
                      setSortConfig({
                        column,
                        ascending: !sortConfig.ascending,
                      })
                    }
                  >
                    {column} <ReactSVG src="/icons/arrow-down.svg" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedSquad.map((row: ISquad, key) => (
              <tr key={key} onClick={() => navigate("/squad/" + row.name)}>
                <td>{row.name}</td>
                <td>{row.role}</td>
                <td>{converToMinutes(row.speechTime)}</td>
                <td>{row.interation}</td>
                <td>{row.averageInteraction}</td>
                <td>
                  <div className={style["squad-table-progress"]}>
                    <div style={{ width: `${row.type}%` }} />
                  </div>
                </td>
                <td>
                  <TrendComponent {...row.mood} />
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
