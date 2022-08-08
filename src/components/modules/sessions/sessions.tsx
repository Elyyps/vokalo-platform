import React from "react";
import { useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ISession } from "../../../types/modules/session";
import { converToDate } from "../../../utils/convertDate";
import { converToMinutes } from "../../../utils/convertTime";
import { sortColumn } from "../../../utils/sortColumn";
import { TypeComponent } from "../../cores/type/type";
import style from "./sessions.module.scss";
interface ISessionsComponent {
  sessions: ISession[];
  isSquadSessions?: boolean;
}
export const SessionsComponent = ({
  sessions,
  isSquadSessions,
}: ISessionsComponent) => {
  const [sortConfig, setSortConfig] = React.useState<any>({
    column: { name: "date", param: ["creationTimestamp"] },
    ascending: false,
  });
  const [columns, setColumns] = React.useState<any[]>([]);
  const { pathname } = useLocation();

  const getColor = (score: number) => {
    if (score <= 0.4) {
      return "NEGATIVE";
    } else if (score > 0.4 && score <= 0.6) {
      return "NEUTRAL";
    } else {
      return "POSITIVE";
    }
  };
  React.useEffect(() => {
    let list: any[] = [
      { name: "date", param: ["creationTimestamp"] },
      { name: "type", param: ["type"] },
    ];
    if (isSquadSessions) {
      list.push({ name: "length", param: ["length"] });
    } else {
      list.push(
        { name: "vokalo", param: ["vokaloLive"] },
        { name: "recordings", param: ["recordings"] },
        { name: "score", param: ["score"] }
      );
    }
    setColumns(list);
  }, [isSquadSessions]);

  const sortedSession = React.useMemo(() => {
    let sortableSession = [...sessions];
    return sortColumn(
      sortableSession,
      sortConfig.column.name,
      sortConfig.column.param,
      sortConfig.ascending
    );
  }, [sortConfig]);

  return sortedSession && columns?.length ? (
    <div className={style["sessions"]}>
      <h6>Session</h6>
      <div className={style["sessions-header"]}>
        {columns.map((column, key) => (
          <span
            key={key}
            onClick={() =>
              setSortConfig({
                column: { name: column.name, param: column.param },
                ascending: !sortConfig.ascending,
              })
            }
          >
            {column.name} <ReactSVG src="/icons/arrow-down.svg" />
          </span>
        ))}
      </div>
      <div className={style["sessions-content"]}>
        {sortedSession
          .slice(0, isSquadSessions ? sessions.length : 5)
          .map((session: ISession, key) => (
            <div
              key={key}
              style={
                isSquadSessions
                  ? { marginBottom: "16px" }
                  : { fontSize: "14px" }
              }
            >
              <span>{converToDate(session.creationTimestamp)}</span>
              <span>
                <TypeComponent type={session.type} />
              </span>
              {session.length && pathname !== "/coach" && (
                <span>{converToMinutes(session.length)}</span>
              )}
              {!isSquadSessions && (
                <span
                  className={`checkmark ${
                    !session.vokaloLive && "checkmark-rotate"
                  }`}
                >
                  <ReactSVG
                    src={
                      session.vokaloLive
                        ? "/icons/check.svg"
                        : "/icons/cross.svg"
                    }
                  />
                </span>
              )}
              {!isSquadSessions && (
                <span
                  className={`checkmark ${
                    !session.hasRecordings && "checkmark-rotate"
                  }`}
                >
                  <ReactSVG
                    src={
                      session.hasRecordings
                        ? "/icons/check.svg"
                        : "/icons/cross.svg"
                    }
                  />
                </span>
              )}
              {pathname === "/coach" && session.coachScore && (
                <span>
                  <div
                    className={`score score-${getColor(session.coachScore)}`}
                  />
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div />
  );
};
