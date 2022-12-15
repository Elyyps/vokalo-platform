import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ISession } from "../../../types/modules/session";
import { converToDate } from "../../../utils/convertDate";
import { converToMinutes } from "../../../utils/convertTime";
import { sortColumn } from "../../../utils/sortColumn";
import { PaginationComponent } from "../../cores/pagination/pagination";
import { TrendComponent } from "../../cores/trend/trend";
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
    { name: "name", param: ["name"] },
    { name: "type", param: ["type"] },
    { name: "length", param: ["length"] },
    { name: "coach", param: ["creator", "firstName"] },
    // { name: "participants", param: ["participants"] },
    // { name: "recordings", param: ["recordings"] },
    // { name: "analyzed", param: ["analyzed"] },
    {
      name: "Average Interaction Length",
      param: ["communicationAggregations", "averageInteractionLength"],
    },
    {
      name: "Average Interactions",
      param: ["communicationAggregations", "averageInteraction"],
    },
    {
      name: "Orientation percentage",
      param: ["orientationAggregations", "value"],
    },
    { name: "language", param: ["analysis_language"] },
    // { name: "video", param: ["hasVideoConnected"] },
  ];
  const [cookies] = useCookies(["rows"]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [sortConfig, setSortConfig] = React.useState({
    column: { name: "date", param: [""] },
    ascending: true,
  });
  const rows = cookies.rows ? cookies.rows : 24;
  const getPercentage = (value: number) => {
    return Math.round(value * 100);
  };
  const sortedSession = React.useMemo(() => {
    let sortableSession = [...sessions];
    return sortColumn(
      sortableSession,
      sortConfig.column.name,
      sortConfig.column.param,
      sortConfig.ascending
    );
  }, [sortConfig, sessions, cookies.rows]);

  return sortedSession ? (
    <div>
      <div className={` ${style["sessions-table"]} section-item`}>
        <table>
          <thead>
            <tr>
              <th>{/* <input type="checkbox" /> */}</th>
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
              sortedSession
                .slice((currentPage - 1) * rows, currentPage * rows)
                .map((row: ISession, key) => (
                  <tr
                    key={key}
                    onClick={(e: any) =>
                      e.target.localName === "td" &&
                      navigate("/sessions/" + row.id)
                    }
                  >
                    <td>{/* <input type="checkbox" /> */}</td>
                    <td>{converToDate(row.creationTimestamp)}</td>
                    <td style={{ minWidth: "200px" }}>{row.label}</td>
                    <td>
                      <TypeComponent type={row.type} />
                    </td>
                    <td>{row.length && converToMinutes(row.length)}</td>
                    <td>
                      {row.creator?.firstName + " " + row.creator?.lastName}
                    </td>
                    {/* <td>{row.participants?.length}</td> */}
                    {/* <td>
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
                    </td> */}
                    {/* <td>
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
                    </td> */}
                    <td>
                      {row.communicationAggregations &&
                        Math.round(
                          row.communicationAggregations
                            .averageInteractionLength * 10
                        ) / 10}
                    </td>
                    <td>
                      {row.communicationAggregations &&
                        Math.round(
                          row.communicationAggregations.averageInteractions * 10
                        ) / 10}
                    </td>
                    <td>
                      {row.orientationAggregations &&
                        // <TrendComponent
                        //   trendLabel={getPercentage(
                        //     row.orientationAggregations.value
                        //   )}
                        //   trendDirection={
                        //     row.orientationAggregations.trendDirection
                        //   }
                        // />
                        getPercentage(row.orientationAggregations.value)}
                      %
                    </td>
                    {/*
                    <td>
                      <span className={style["sessions-table-language"]}>
                        {row.analysis_language && (
                          <ReactSVG
                            src={
                              row.analysis_language === "da-dk"
                                ? "/icons/dk-flag.svg"
                                : "/icons/uk-flag.svg"
                            }
                          />
                        )}
                      </span>
                    </td>
                    {/* <td>
                      <span
                        className={` ${style["sessions-table-video"]} 
                           ${
                             !row.hasVideoConnected &&
                             style["sessions-table-video-upload"]
                           }
                        `}
                        onClick={(e: any) => navigate("/video-sync/" + row.id)}
                      >
                        <ReactSVG
                          src={
                            row.hasVideoConnected
                              ? "/icons/check.svg"
                              : "/icons/cross.svg"
                          }
                        />
                        {row.hasVideoConnected ? "Complete" : "Upload"}
                      </span>
                    </td> */}
                    <td></td>
                    {/* <td>
                      <DropdownComponent
                        icon="/icons/more.svg"
                        variant="transparent"
                      >
                        <ul>
                          <li onClick={() => setIsEdit(true)}>edit</li>
                        </ul>
                      </DropdownComponent>
                    </td> */}
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
