import { ITeam } from "../../../types/cores/team";
import style from "./team-item.module.scss";

export const TeamIteamComponent = (team: ITeam) => {
  return (
    <div className={style["team-item"]}>
      <div className={style["team-item-left"]}>
        <small>team</small>
        <span>{team.name}</span>
      </div>
      <div className={style["team-item-right"]}>
        <span>{team.profileIds.length} players</span>
      </div>
    </div>
  );
};
