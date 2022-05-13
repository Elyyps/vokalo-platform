import React from "react";
import style from "./sessions-table.module.scss";

interface ISessionsTableComponent {}

export const SessionsTableComponent = (props: ISessionsTableComponent) => {
  const columns = [
    "Date",
    "Type",
    "Length",
    "Coach",
    "Athletes",
    "Recordings",
    "Analyzed",
  ];
  return (
    <div className={style["sessions-table"]}>
      <table>
        <thead>
          <tr>
            {columns.map((column, key) => (
              <th key={key}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};
