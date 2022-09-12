import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ISession } from "../../../types/modules/session";
import { converToDate } from "../../../utils/convertDate";
import { converToMinutes } from "../../../utils/convertTime";
import { sortColumn } from "../../../utils/sortColumn";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import { PaginationComponent } from "../../cores/pagination/pagination";
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
    { name: "date", param: ["creationTimestamp"] },
    { name: "type", param: ["type"] },
    { name: "length", param: ["length"] },
    { name: "coach", param: ["creator", "firstName"] },
    { name: "participants", param: ["participants"] },
    { name: "recordings", param: ["recordings"] },
    { name: "analyzed", param: ["analyzed"] },
  ];
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [sortConfig, setSortConfig] = React.useState({
    column: { name: "date", param: [""] },
    ascending: true,
  });

  const sortedSession = React.useMemo(() => {
    let sortableSession = [...sessions];
    return sortColumn(
      sortableSession,
      sortConfig.column.name,
      sortConfig.column.param,
      sortConfig.ascending
    );
  }, [sortConfig, sessions]);

  return sortedSession ? (
    <div>
      <div className={` ${style["sessions-table"]} section-item`}>
        <table>
          <thead>
            <tr>
              <th>
                {/* <input type="checkbox" /> */}
              </th>
              {columns.map((column, key) => (
                <th key={key}>
                  <span
                    onClick={() =>
                      setSortConfig({
                        column: { name: column.name, param: column.param },
                        ascending: !sortConfig.ascending,
                      })
                    }
                  >
                    {column.name} <ReactSVG src="/icons/arrow-down.svg" />
                  </span>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedSession ? (
              sortedSession.map((row: ISession, key) => (
                <tr key={key} onClick={() => navigate("/sessions/" + row.id)}>
                  <td>
                    {/* <input type="checkbox" /> */}
                  </td>
                  <td>{converToDate(row.creationTimestamp)}</td>
                  <td>
                    <TypeComponent type={row.type} />
                  </td>
                  <td>{row.length && converToMinutes(row.length)}</td>
                  <td>
                    {row.creator?.firstName + " " + row.creator?.lastName}
                  </td>
                  <td>{row.participants?.length}</td>
                  <td>
                    <span
                      className={`checkmark ${
                        !row.hasRecordings && "checkmark-rotate"
                      }`}
                    >
                      <ReactSVG
                        src={
                          row.hasRecordings
                            ? "/icons/check.svg"
                            : "/icons/cross.svg"
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
                          row.vokaloLive
                            ? "/icons/check.svg"
                            : "/icons/cross.svg"
                        }
                      />
                    </span>
                  </td>
                  <td>
                    {/* <DropdownComponent
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
                    </DropdownComponent> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>X</tr>
            )}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        list={sortedSession}
      />
    </div>
  ) : (
    <div />
  );
};
