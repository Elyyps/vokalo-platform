import React from "react";
import { ReactSVG } from "react-svg";
import { ISession } from "../../../types/modules/session";
import { converToDate } from "../../../utils/convertDate";
import { converToHours, converToMinutes } from "../../../utils/convertTime";
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
    column: "date",
    ascending: true,
  });
  const [columns, setColumns] = React.useState<string[]>([]);

  React.useEffect(() => {
    let list: string[] = ["date", "type"];
    if (isSquadSessions) {
      list.push("length");
    } else {
      list.push("vokalo live", "recordings", "score");
    }
    setColumns(list);
  }, [isSquadSessions]);

  const sortedSession = React.useMemo(() => {
    let sortableSession = [...sessions];
    return sortColumn(sortableSession, sortConfig.column, sortConfig.ascending);
  }, [sortConfig, sessions]);

  return sortedSession && columns.length ? (
    <div className={style["sessions"]}>
      <h6>Session</h6>
      <div className={style["sessions-header"]}>
        {columns.map((column, key) => (
          <span
            key={key}
            onClick={() =>
              setSortConfig({
                column,
                ascending: !sortConfig.ascending,
              })
            }
          >
            {column} <ReactSVG src="/icons/arrow-down.svg" />
          </span>
        ))}
      </div>
      <div className={style["sessions-content"]}>
        {sortedSession
          .slice(0, isSquadSessions ? sessions.length : 4)
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
              {session.length && <span>{converToMinutes(session.length)}</span>}
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
                    !session.recordings && "checkmark-rotate"
                  }`}
                >
                  <ReactSVG
                    src={
                      session.recordings
                        ? "/icons/check.svg"
                        : "/icons/cross.svg"
                    }
                  />
                </span>
              )}
              {session.score && (
                <span>
                  <div
                    className={`score score-${session.score.trendDirection}`}
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
