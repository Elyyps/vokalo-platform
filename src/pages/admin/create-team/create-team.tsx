import React from "react";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { PlayerSelectCompenent } from "../../../components/cores/player-select/player-select";
import style from "./create-team.module.scss";
import { IPlayer } from "../../../types/cores/player";
import { ButtonComponent } from "../../../components/cores/button/button";
import { useNavigate } from "react-router-dom";
interface IAdminCreateTeamPage {
  //onSubmit: (name: string, players: IPlayer[], coaches: IPlayer[]) => void;
}
export const AdminCreateTeamPage = (props: IAdminCreateTeamPage) => {
  const [players, setPlayers] = React.useState<any[]>([]);
  const [coaches, setCoaches] = React.useState<any[]>([]);
  const [name, setName] = React.useState<string>("");
  let navigate = useNavigate();
  const rows = [
    {
      id: 0,
      firstName: "Alexander",
      lastName: "Plagborg",
      role: "player",
      team: "ASA",
    },
    {
      id: 1,
      firstName: "Andreas",
      lastName: "Louridsen",
      role: "player",
      team: "ASA",
    },
    {
      id: 2,
      firstName: "Christan",
      lastName: "Jorgensen",
      role: "coach",
      team: "ASA",
    },
    {
      id: 3,
      firstName: "Gabriel",
      lastName: "Shawol",
      role: "player",
      team: "ASA",
    },
    {
      id: 4,
      firstName: "Jakob",
      lastName: "Agger",
      role: "player",
      team: "ASA",
    },
  ];
  const getProfiles = () => {
    const player = rows.map((player) => {
      return {
        ...player,
        isChecked: false,
      };
    });
    setPlayers(player);
    setCoaches(player);
  };
  React.useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className={style["create-team"]}>
      <PageHeaderComponent
        title={"Create team"}
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
      <div className={style["create-team-form"]}>
        <div>
          <label>Team name</label>
          <input
            type="text"
            placeholder="enter team name"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>
            Players <small>(Assign players to this team)</small>
          </label>
          <PlayerSelectCompenent
            players={players}
            onSelect={setPlayers}
            isEdit
          />
        </div>
        <div>
          <label>
            Coaches <small>(Assign coaches to this team)</small>
          </label>
          <PlayerSelectCompenent
            players={coaches}
            onSelect={setCoaches}
            isEdit
          />
        </div>
      </div>
      <div className={style["create-team-button"]}></div>
    </div>
  );
};
