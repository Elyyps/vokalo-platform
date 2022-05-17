import React from "react";
import { ReactSVG } from "react-svg";
import { ISession } from "../../../types/modules/session";
import { converTime } from "../../../utils/convertTime";
import { sortColumn } from "../../../utils/sortColumn";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./sessions-table.module.scss";

interface ISessionsTableComponent {
  sessions: ISession[];
}

export const SessionsTableComponent = ({
  sessions,
}: ISessionsTableComponent) => {
  const [sortConfig, setSortConfig] = React.useState<any>({
    column: "date",
    ascending: true,
  });

  const sortedSession = React.useMemo(() => {
    let sortableSession = [...sessions];
    return sortColumn(sortableSession, sortConfig.column, sortConfig.ascending);
  }, [sortConfig, sessions]);

  return sortedSession ? (
    <div className={` ${style["sessions-table"]} section-item`}>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            {Object.keys(sortedSession[0]).map((column, key) => (
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedSession.map((row, key) => (
            <tr key={key}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{row.date}</td>
              <td>
                <span className={style["session-type"]}>
                  <ReactSVG
                    src={
                      row.type === "practice"
                        ? "/icons/practice.svg"
                        : "/icons/match.svg"
                    }
                  />
                  {row.type}
                  {}
                </span>
              </td>
              <td>{converTime(row.length)}</td>
              <td>{row.coach}</td>
              <td>{row.athletes?.length}</td>
              <td>
                <span
                  className={` ${style["session-check"]} ${
                    !row.recordings && style["session-check-rotate"]
                  }`}
                >
                  <ReactSVG
                    src={
                      row.recordings ? "/icons/check.svg" : "/icons/cross.svg"
                    }
                  />
                </span>
              </td>
              <td>
                <span
                  className={` ${style["session-check"]} ${
                    !row.analyzed && style["session-check-rotate"]
                  }`}
                >
                  <ReactSVG
                    src={row.analyzed ? "/icons/check.svg" : "/icons/cross.svg"}
                  />
                </span>
              </td>
              <td>
                <DropdownComponent
                  icon="/icons/more.svg"
                  variant="transparent"
                  hasNoPadding
                >
                  <span onClick={() => alert("this session:" + row.date)}>
                    hello
                  </span>
                </DropdownComponent>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div></div>
  );
};
