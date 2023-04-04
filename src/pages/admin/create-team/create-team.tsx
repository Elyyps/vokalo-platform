import React from "react";
import { playersData } from "../../../api/players";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { PlayerSelectCompenent } from "../../../components/cores/player-select/player-select";
import style from "./create-team.module.scss";
import { IPlayer } from "../../../types/cores/player";
import { ButtonComponent } from "../../../components/cores/button/button";
interface IAdminCreateTeamPage {
  //onSubmit: (name: string, players: IPlayer[], coaches: IPlayer[]) => void;
}
export const AdminCreateTeamPage = (props: IAdminCreateTeamPage) => {
  const [players, setPlayers] = React.useState<IPlayer[]>([]);
  const [coaches, setCoaches] = React.useState<IPlayer[]>([]);
  const [name, setName] = React.useState<string>("");
  const onClick = () => {
    // props.onSubmit(name, players, coaches);
  };
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
        <ButtonComponent title="Create" variant="admin" />
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
            players={playersData()}
            onSelect={setPlayers}
          />
        </div>
        <div>
          <label>
            Coaches <small>(Assign coaches to this team)</small>
          </label>
          <PlayerSelectCompenent
            players={playersData()}
            onSelect={setCoaches}
          />
        </div>
      </div>
      <div className={style["create-team-button"]}></div>
    </div>
  );
};
