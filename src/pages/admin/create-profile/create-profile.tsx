import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { ButtonComponent } from "../../../components/cores/button/button";
import style from "./create-profile.module.scss";
import { DropdownComponent } from "../../../components/cores/dropdown/dropdown";
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
const positions = ["GK", "LB", "CB", "RB", "LM", "CM", "RM", "S"];
export const AdminCreateProfilePage = () => {
  let navigate = useNavigate();
  const [team, setTeam] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [position, setPosition] = React.useState<string>("");

  return (
    <div>
      <PageHeaderComponent
        title={"Create profile"}
        route="admin"
        hasTwoButtons
        hasReturn
        list={[]}
        onSelect={() => ""}
      >
        <ButtonComponent
          title="Create"
          variant="admin"
          onClick={() => navigate("/admin")}
        />
      </PageHeaderComponent>
      <div className={style["create-profile-form"]}>
        <div>
          <label>Profile</label>
          <input
            type="text"
            placeholder="Enter profile's firstname"
            style={{ marginBottom: "8px" }}
          />
          <input type="text" placeholder="Enter profile's lastname" />
        </div>
        <div>
          <label>Birthdate</label>
          <input type="date" />
        </div>
        <div>
          <label>Team</label>
          <DropdownComponent
            title={team ? team : "-"}
            variant="admin"
            contentPosition="right"
          >
            <ul>
              {teams.map((team, key) => (
                <li key={key} onClick={() => setTeam(team.name)}>
                  {team.name}
                </li>
              ))}
            </ul>
          </DropdownComponent>
        </div>
        <div>
          <label>Role</label>
          <DropdownComponent
            title={role ? role : "-"}
            variant="admin"
            contentPosition="right"
          >
            <ul>
              <li onClick={() => setRole("player")}>Player</li>
              <li onClick={() => setRole("coach")}>Coach</li>
            </ul>
          </DropdownComponent>
        </div>
        <div>
          <label>Position</label>
          <DropdownComponent
            title={position ? position : "-"}
            variant="admin"
            contentPosition="right"
          >
            <ul>
              {positions.map((position, key) => (
                <li key={key} onClick={() => setPosition(position)}>
                  {position}
                </li>
              ))}
            </ul>
          </DropdownComponent>
        </div>
      </div>
    </div>
  );
};
