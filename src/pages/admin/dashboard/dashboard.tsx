import React from "react";
import style from "./dashboard.module.scss";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { AdminProfilesComponent } from "../../../components/modules/admin/profiles/profiles";
import { AdminTeamsComponent } from "../../../components/modules/admin/teams/teams";
import { ITeam } from "../../../types/cores/team";
import { ButtonComponent } from "../../../components/cores/button/button";
import { useNavigate } from "react-router-dom";
const teams: ITeam[] = [
  { id: 0, name: "ASA", playersIds: [0, 1, 2], coachesIds: [4] },
  { id: 1, name: "ASA2", playersIds: [0], coachesIds: [4] },
  {
    id: 2,
    name: "ASA3",
    playersIds: [0, 1, 2, 3],
    coachesIds: [4],
  },
];
export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div className={style["dashboard"]}>
      <PageHeaderComponent
        title={"Admin Panel"}
        hasTwoButtons
        list={[]}
        onSelect={() => ""}
      >
        <ButtonComponent
          title="Exit panel"
          onClick={() => navigate("/sessions")}
        />
      </PageHeaderComponent>
      <AdminTeamsComponent teams={teams} />
      <br />
      <AdminProfilesComponent />
    </div>
  );
};
