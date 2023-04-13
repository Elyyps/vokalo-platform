import React from "react";
import style from "./dashboard.module.scss";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { AdminProfilesComponent } from "../../../components/modules/admin/profiles/profiles";
import { AdminTeamsComponent } from "../../../components/modules/admin/teams/teams";
import { ITeam } from "../../../types/cores/team";
const teams: ITeam[] = [
  { id: 0, name: "ASA", playersIds: [50, 51, 52], coachesIds: [59] },
  { id: 1, name: "ASA2", playersIds: [59], coachesIds: [58] },
  {
    id: 2,
    name: "ASA3",
    playersIds: [53, 54, 55, 56, 57, 58],
    coachesIds: [58],
  },
];
export const AdminDashboardPage = () => {
  return (
    <div className={style["dashboard"]}>
      <PageHeaderComponent
        title={"Admin Panel"}
        route="sessions"
        hasReturn
        list={[]}
        onSelect={() => ""}
      />
      <AdminTeamsComponent teams={teams} />
      <br />
      <AdminProfilesComponent />
    </div>
  );
};
