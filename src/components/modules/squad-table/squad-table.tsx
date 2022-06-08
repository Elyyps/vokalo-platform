import React from "react";
import { ReactSVG } from "react-svg";
import { ISquad } from "../../../types/modules/squad";
import { converToMinutes } from "../../../utils/convertTime";
import { TrendComponent } from "../../cores/trend/trend";
import style from "./squad-table.module.scss";
interface ISquadTableComponent {
  squad: ISquad[];
}
export const SquadTableComponent = ({ squad }: ISquadTableComponent) => {
  return (
    <div className={style["squad-table"]}>
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
                  // onClick={() =>
                  //   setSortConfig({
                  //     column,
                  //     ascending: !sortConfig.ascending,
                  //   })
                  // }
                  >
                    {column} <ReactSVG src="/icons/arrow-down.svg" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {squad.map((row, key) => (
              <tr key={key}>
                <td>{row.name}</td>
                <td>{row.role}</td>
                <td>{converToMinutes(row.speechTime)}</td>
                <td>{row.interation}</td>
                <td>{row.interation}</td>
                <td>{row.type}</td>
                <td>
                  <TrendComponent {...row.mood} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
