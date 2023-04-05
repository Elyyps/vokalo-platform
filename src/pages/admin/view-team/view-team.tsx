import React from "react";
import { useParams } from "react-router-dom";
import { playersData } from "../../../api/players";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import style from "./view-team.module.scss";
import { ITeam } from "../../../types/cores/team";
import { LoaderComponent } from "../../../components/cores/loader/loader";
import { PlayerComponent } from "../../../components/cores/player/player";

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
export const AdminViewTeamPage = () => {
  const [team, setTeam] = React.useState<ITeam>();
  const { id } = useParams();

  const getPlayer = (id: number) => {
    const player = playersData().find((player) => player.id === id);
    return player;
  };
  const getTeam = () => {
    if (id) {
      const data = teams.find((item) => item.id === parseInt(id));
      setTeam(data);
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
      />
      <div className={style["view-team-form"]}>
        <div>
          <label>Players</label>
          <small>{team.playersIds.length} players assigned to this team</small>
          <div className="widget-container">
            {team.playersIds.map(
              (profileId, key) =>
                getPlayer(profileId) && (
                  <div key={key}>
                    <PlayerComponent
                      player={getPlayer(profileId)}
                      onPlayerDrag={() => ""}
                      onPlayerDrop={() => ""}
                      value={0}
                      color="#153a9f"
                      label={0}
                    />
                  </div>
                )
            )}
          </div>
        </div>
        <div>
          <label>Coaches</label>
          <small>{team.coachesIds.length} coaches assigned to this team</small>
          <div className="widget-container">
            {team.coachesIds.map(
              (profileId, key) =>
                getPlayer(profileId) && (
                  <div key={key}>
                    <PlayerComponent
                      player={getPlayer(profileId)}
                      onPlayerDrag={() => ""}
                      onPlayerDrop={() => ""}
                      value={0}
                      color="#153a9f"
                      label={0}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoaderComponent />
  );
};
