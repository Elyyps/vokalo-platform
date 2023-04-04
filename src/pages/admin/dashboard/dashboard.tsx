import React from "react";
import style from "./dashboard.module.scss";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { AdminProfilesComponent } from "../../../components/modules/admin/profiles/profiles";
import { AdminTeamsComponent } from "../../../components/modules/admin/teams/teams";
import { ITeam } from "../../../types/cores/team";
const teams: ITeam[] = [
  { id: "0", name: "ASA", profileIds: ["", "", ""] },
  { id: "0", name: "ASA2", profileIds: [""] },
  { id: "0", name: "ASA3", profileIds: ["", "", "", "", "", ""] },
  // { id: "0", name: "ASA4", profileIds: [""] },
  // { id: "0", name: "ASA5", profileIds: [""] },
  // { id: "0", name: "ASA6", profileIds: [""] },
];
export const AdminDashboardPage = () => {
  return (
    <div className={style["dashboard"]}>
      <PageHeaderComponent
        title={"Admin Panel"}
        list={[]}
        onSelect={() => ""}
      />
      <AdminTeamsComponent teams={teams} />
      <br />
      <AdminProfilesComponent />
    </div>
  );
};
