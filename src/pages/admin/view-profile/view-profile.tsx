import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { ButtonComponent } from "../../../components/cores/button/button";
import style from "./view-profile.module.scss";
import { DropdownComponent } from "../../../components/cores/dropdown/dropdown";
import { ITeam } from "../../../types/cores/team";
import { IProfile } from "../../../types/cores/profile";

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
const profiles: IProfile[] = [
  {
    id: "0",
    firstName: "Alexander",
    lastName: "Plagborg",
    role: "coach",
    teamsId: ["ASA"],
    languages: ["EN", "FR"],
    positions: ["GK", "RB"],
    initials: "AM",
    number: 9,
    phone: "28 000 000",
    birthdate: new Date("27/05/1995"),
  },
  {
    id: "1",
    firstName: "Andreas",
    lastName: "Louridsen",
    role: "player",
    teamsId: ["ASA"],
    languages: ["EN", "FR"],
    positions: ["GK"],
    initials: "AM",
    number: 9,
    phone: "28 000 000",
    birthdate: new Date("27/05/1995"),
  },
  {
    id: "2",
    firstName: "Christan",
    lastName: "Jorgensen",
    role: "coach",
    teamsId: ["ASA"],
    languages: ["EN", "FR"],
    positions: ["GK"],
    initials: "AM",
    number: 9,
    phone: "28 000 000",
    birthdate: new Date("27/05/1995"),
  },
  {
    id: "3",
    firstName: "Gabriel",
    lastName: "Shawol",
    role: "player",
    teamsId: ["ASA"],
    languages: ["EN", "FR"],
    positions: ["GK"],
    initials: "AM",
    number: 9,
    phone: "28 000 000",
    birthdate: new Date("27/05/1995"),
  },
  {
    id: "4",
    firstName: "Jakob",
    lastName: "Agger",
    role: "player",
    teamsId: ["ASA"],
    languages: ["EN", "FR"],
    positions: ["GK"],
    initials: "AM",
    number: 9,
    phone: "28 000 000",
    birthdate: new Date("27/05/1995"),
  },
];
export const AdminViewProfilePage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = React.useState<IProfile>();

  const getTeams = () => {
    return teams.map((team) => {
      return { value: team.name.toLocaleLowerCase(), label: team.name };
    });
  };
  const getValues = (list: any) => {
    return list.map((item: any) => {
      return { value: item.toLocaleLowerCase(), label: item };
    });
  };
  const getProfile = () => {
    let currentProfile = profiles.find((profile) => profile.id === id);
    if (currentProfile) {
      setProfile(currentProfile);
    }
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
  React.useEffect(() => {
    getProfile();
  }, []);
  return profile ? (
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
            <input
              type="text"
              placeholder="Enter profile's firstname"
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              value={profile.firstName}
            />
          </div>
          <div>
            <label>Last name</label>
            <input
              type="text"
              placeholder="Enter profile's lastname"
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              value={profile.lastName}
            />
          </div>
        </div>
        <div className={style["create-profile-form-line"]}>
          <div>
            <label>Initials</label>
            <input
              type="text"
              placeholder="Enter profile's initials"
              onChange={(e) =>
                setProfile({ ...profile, initials: e.target.value })
              }
              value={profile.initials}
            />
          </div>
          <div>
            <label>Number</label>
            <input
              type="number"
              placeholder="Enter profile's number"
              onChange={(e) =>
                setProfile({ ...profile, number: parseInt(e.target.value) })
              }
              value={profile.number}
            />
          </div>
        </div>
        <div className={style["create-profile-form-line"]}>
          <div>
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter profile's phone"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label>Birthday</label>
            <input
              type="date"
              value={profile.birthdate.toLocaleDateString()}
              onChange={(e) =>
                setProfile({ ...profile, birthdate: new Date(e.target.value) })
              }
            />
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
              value={getValues(profile.teamsId)}
            />
          </div>
          <div>
            <label>Role</label>
            <DropdownComponent
              title={profile.role ? profile.role : "-"}
              variant="admin"
              contentPosition="right"
            >
              <ul>
                <li onClick={() => setProfile({ ...profile, role: "player" })}>
                  Player
                </li>
                <li onClick={() => setProfile({ ...profile, role: "coach" })}>
                  Coach
                </li>
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
              value={getValues(profile.positions)}
            />
          </div>
          <div>
            <label>Language</label>
            <Select
              options={languages}
              isMulti
              styles={customStyles}
              placeholder={"-"}
              value={getValues(profile.languages)}
              //  onChange={(e) => setLanguages(e)}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};
