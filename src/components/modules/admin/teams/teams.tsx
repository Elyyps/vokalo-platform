import { Navigate, useNavigate } from "react-router-dom";
import { ITeam } from "../../../../types/cores/team";
import { ButtonComponent } from "../../../cores/button/button";
import { TeamIteamComponent } from "../../../cores/team-item/team-item";
import style from "./teams.module.scss";

interface IAdminTeamsComponent {
  teams: ITeam[];
}
export const AdminTeamsComponent = (props: IAdminTeamsComponent) => {
  let navigate = useNavigate();

  return (
    <div className={style["admin-teams"]}>
      <div className={"admin-header"}>
        <span>All teams</span>
        <ButtonComponent
          variant="admin"
          title="create team"
          onClick={() => navigate("/admin/create-team")}
        />
      </div>
      <div className={style["admin-teams-list"]}>
        {props.teams.map((team, key) => (
          <TeamIteamComponent {...team} key={key} />
        ))}
      </div>
    </div>
  );
};
