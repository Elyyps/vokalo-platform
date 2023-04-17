import React from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { ButtonComponent } from "../../../components/cores/button/button";
import style from "./view-profile.module.scss";
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
const positions = [
  { value: "gk", label: "GK" },
  { value: "lb", label: "LB" },
  { value: "cb", label: "CB" },
  { value: "rb", label: "RB" },
  { value: "lm", label: "LM" },
  { value: "cm", label: "CM" },
  { value: "rm", label: "RM" },
  { value: "s", label: "S" },
];
const languages = [
  { value: "english", label: "English" },
  { value: "german", label: "German" },
  { value: "danish", label: "Danish" },
  { value: "french", label: "French" },
  { value: "spanish", label: "Spanish" },
  { value: "italian", label: "Italian" },
  { value: "swedish", label: "Swedish" },
];

export const AdminViewProfilePage = () => {
  let navigate = useNavigate();
  const [team, setTeam] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [position, setPosition] = React.useState<string>("");
  const [language, setLanguage] =
    React.useState<[{ value: string; label: string }]>();
  const getTeams = () => {
    return teams.map((team) => {
      return { value: team.name.toLocaleLowerCase(), label: team.name };
    });
  };
  const customStyles = {
    placeholder: (base: any) => ({
      ...base,
      color: "white",
    }),
    valueContainer: (base: any) => ({
      ...base,
      height: "43px",
    }),
    input: (base: any) => ({
      ...base,
      height: "45px",
      color: "white",
    }),
    control: (base: any) => ({
      ...base,
      height: "45px",
      minHeight: "45px",
      backgroundColor: "#0e2e86",
      borderRadius: "5px",
      margin: 0,
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "white", // Custom colour
    }),
  };
  return (
    <div>
      <PageHeaderComponent
        title={"View profile"}
        route="admin"
        hasTwoButtons
        hasReturn
        list={[]}
        onSelect={() => ""}
      >
        <ButtonComponent
          title="Edit"
          variant="admin"
          onClick={() => navigate("/admin")}
        />
      </PageHeaderComponent>
      <div className={style["create-profile-form"]}>
        <div className={style["create-profile-form-line"]}>
          <div>
            <label>First name</label>
            <input type="text" placeholder="Enter profile's firstname" />
          </div>
          <div>
            <label>Last name</label>
            <input type="text" placeholder="Enter profile's lastname" />
          </div>
        </div>
        <div className={style["create-profile-form-line"]}>
          <div>
            <label>Initials</label>
            <input type="text" placeholder="Enter profile's initials" />
          </div>
          <div>
            <label>Number</label>
            <input type="text" placeholder="Enter profile's number" />
          </div>
        </div>
        <div className={style["create-profile-form-line"]}>
          <div>
            <label>Phone</label>
            <input type="text" placeholder="Enter profile's phone" />
          </div>
          <div>
            <label>Birthday</label>
            <input type="date" />
          </div>
        </div>
        <div className={style["create-profile-form-line"]}>
          <div>
            <label>Team</label>
            <Select
              options={getTeams()}
              isMulti
              styles={customStyles}
              className={style["Select-control"]}
              placeholder={"-"}
            />
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
        </div>
        <div className={style["create-profile-form-line"]}>
          <div>
            <label>Position</label>
            <Select
              options={positions}
              isMulti
              styles={customStyles}
              placeholder={"-"}
            />
          </div>
          <div>
            <label>Language</label>
            <Select
              options={languages}
              isMulti
              styles={customStyles}
              placeholder={"-"}
              //  onChange={(e) => setLanguages(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
