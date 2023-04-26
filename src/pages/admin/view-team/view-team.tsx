import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import style from "./view-team.module.scss";
import { ITeam } from "../../../types/cores/team";
import { LoaderComponent } from "../../../components/cores/loader/loader";
import { ButtonComponent } from "../../../components/cores/button/button";
import { PlayerSelectCompenent } from "../../../components/cores/player-select/player-select";

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
export const AdminViewTeamPage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = React.useState<ITeam>();
  const [players, setPlayers] = React.useState<any[]>();
  const [coaches, setCoaches] = React.useState<any[]>();
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
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
  const getPlayers = (id: number[]) => {
    const player = rows.map((player) => {
      return {
        ...player,
        isChecked: id.includes(player.id),
      };
    });
    return player;
  };
  const getTeam = () => {
    if (id) {
      const data = teams.find((item) => item.id === parseInt(id));
      if (data) {
        setTeam(data);
        const playersList = getPlayers(data?.playersIds);
        const coachesList = getPlayers(data?.coachesIds);
        setPlayers(playersList);
        setCoaches(coachesList);
      }
    }
  };
  React.useEffect(() => {
    getTeam();
  }, []);
  return team ? (
    <div className={style["view-team"]}>
      <PageHeaderComponent
        title={team.name}
        route="admin"
        hasTwoButtons
        hasReturn
        list={[]}
        onSelect={() => ""}
      >
        {!isEdit ? (
          <div className={style["view-team-buttons"]}>
            <ButtonComponent
              title="Edit team"
              variant="admin"
              onClick={() => setIsEdit(true)}
            />
            <ButtonComponent
              title="Delete team"
              variant="transparent"
              icon="/icons/delete.svg"
              hasBorder
              onClick={() => navigate("/admin")}
            />
          </div>
        ) : (
          <div className={style["view-team-buttons"]}>
            <ButtonComponent
              title="Save"
              variant="admin"
              onClick={() => setIsEdit(false)}
            />
            <ButtonComponent
              title="Cancel"
              variant="transparent"
              hasBorder
              onClick={() => setIsEdit(false)}
            />
          </div>
        )}
      </PageHeaderComponent>
      <div className={style["view-team-form"]}>
        <div>
          <label>Players</label>
          <small>{team.playersIds.length} players assigned to this team</small>
          <PlayerSelectCompenent
            players={players}
            onSelect={setPlayers}
            isEdit={isEdit}
          />
        </div>
        <div>
          <label>Coaches</label>
          <small>{team.coachesIds.length} coaches assigned to this team</small>
          <PlayerSelectCompenent
            players={coaches}
            onSelect={setCoaches}
            isEdit={isEdit}
          />
        </div>
      </div>
    </div>
  ) : (
    <LoaderComponent />
  );
};
