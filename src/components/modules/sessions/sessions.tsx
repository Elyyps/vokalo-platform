import React from "react";
import { ReactSVG } from "react-svg";
import { ISession } from "../../../types/modules/session";
import { converToDate } from "../../../utils/convertDate";
import { converToHours } from "../../../utils/convertTime";
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

  const sortedSession = React.useMemo(() => {
    let sortableSession = [...sessions];
    return sortColumn(sortableSession, sortConfig.column, sortConfig.ascending);
  }, [sortConfig, sessions]);
  return sortedSession ? (
    <div className={style["sessions"]}>
      <h6>Session</h6>
      <div className={style["sessions-header"]}>
        {Object.keys(sessions[0]).map((column, key) => (
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
          .map((session, key) => (
            <div
              key={key}
              style={
                isSquadSessions
                  ? { marginBottom: "16px" }
                  : { fontSize: "14px" }
              }
            >
              <span>{converToDate(session.date)}</span>
              <span>
                <TypeComponent type={session.type} />
              </span>
              {session.length && <span>{converToHours(session.length)}</span>}
              {session.vokalo && (
                <span>
                  <div
                    className={
                      style[`sessions-${session.vokalo.trendDirection}`]
                    }
                  />
                </span>
              )}
              {session.recordings && (
                <span>
                  <div
                    className={
                      style[`sessions-${session.recordings.trendDirection}`]
                    }
                  />
                </span>
              )}
              {session.score && (
                <span>
                  <div
                    className={
                      style[`sessions-${session.score.trendDirection}`]
                    }
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
