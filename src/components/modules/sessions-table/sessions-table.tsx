import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ISession } from "../../../types/modules/session";
import { converToDate } from "../../../utils/convertDate";
import { converToMinutes } from "../../../utils/convertTime";
import { sortColumn } from "../../../utils/sortColumn";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import { TypeComponent } from "../../cores/type/type";
import style from "./sessions-table.module.scss";

interface ISessionsTableComponent {
  sessions: ISession[];
}

export const SessionsTableComponent = ({
  sessions,
}: ISessionsTableComponent) => {
  let navigate = useNavigate();
  const columns = [
    "Date",
    "type",
    "length",
    "coach",
    "participants",
    "Recordings",
    "analyzed",
  ];
  const [sortConfig, setSortConfig] = React.useState<any>({
    column: "date",
    ascending: true,
  });

  const sortedSession = React.useMemo(() => {
    let sortableSession = [...sessions];
    return sortColumn(sortableSession, sortConfig.column, sortConfig.ascending);
  }, [sortConfig, sessions]);

  return (
    <div className={` ${style["sessions-table"]} section-item`}>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
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
                  {column} <ReactSVG src="/icons/arrow-down.svg" />
                </span>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedSession ? (
            sortedSession.map((row: ISession, key) => (
              <tr
                key={key}
                onClick={() => navigate("/sessions/" + row.creator)}
              >
                <td>
                  <input type="checkbox" />
                </td>
                <td>{converToDate(row.creationTimestamp)}</td>
                <td>
                  <TypeComponent type={row.type} />
                </td>
                <td>{row.length && converToMinutes(row.length)}</td>
                <td>{row.creator?.firstName}</td>
                <td>{row.participants?.length}</td>
                <td>
                  <span
                    className={`checkmark ${
                      !row.recordings && "checkmark-rotate"
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
                    className={`checkmark ${
                      !row.vokaloLive && "checkmark-rotate"
                    }`}
                  >
                    <ReactSVG
                      src={
                        row.vokaloLive ? "/icons/check.svg" : "/icons/cross.svg"
                      }
                    />
                  </span>
                </td>
                <td>
                  <DropdownComponent
                    icon="/icons/more.svg"
                    variant="transparent"
                  >
                    <span
                      onClick={() =>
                        alert("this session:" + row.creationTimestamp)
                      }
                    >
                      hello
                    </span>
                  </DropdownComponent>
                </td>
              </tr>
            ))
          ) : (
            <tr>X</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
