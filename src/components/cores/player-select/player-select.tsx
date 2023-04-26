import React from "react";
import { IPlayer } from "../../../types/cores/player";
import style from "./player-select.module.scss";
import { ButtonComponent } from "../button/button";
import { PlayerComponent } from "../player/player";
import { useNavigate } from "react-router-dom";

interface IPlayerSelectCompenent {
  players: any;
  onSelect: (players: any[]) => void;
  isEdit?: boolean;
}
export const PlayerSelectCompenent = (props: IPlayerSelectCompenent) => {
  const [search, setSearch] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const wrapperRef = React.createRef<HTMLDivElement>();
  let navigate = useNavigate();

  const searchPlayers = () => {
    const filteredPlayers = props.players.filter(
      (player: IPlayer) =>
        player.firstName.toLowerCase().includes(search.toLowerCase()) ||
        player.lastName.toLowerCase().includes(search.toLowerCase())
    );
    return filteredPlayers;
  };
  const hasCheckedPlayers = () => {
    const result = props.players.filter((profile: any) => profile.isChecked);
    return result && result.length > 0;
  };

  const checkPlayer = (selectedPlayer: any) => {
    const players = props.players.map((player: IPlayer) => {
      const playerCopy: any = { ...player };
      if (playerCopy.id === selectedPlayer.id) {
        return { ...playerCopy, isChecked: !playerCopy.isChecked };
      } else {
        return playerCopy;
      }
    });
    if (players) {
      props.onSelect(players);
    }
  };
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, props, wrapperRef]);

  return (
    <div className={style["player-select"]}>
      {props.isEdit && (
        <div className={style["player-select-dropdown"]} ref={wrapperRef}>
          <ButtonComponent
            title="select"
            variant="admin"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
          <div
            className={`${style["player-select-content"]} ${
              isOpen && style["player-select-content-open"]
            }`}
          >
            <input
              type="text"
              placeholder="search player..."
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <ul>
              {searchPlayers().map((player: any, key: number) => (
                <li key={key}>
                  <input
                    type="checkbox"
                    onChange={() => checkPlayer(player)}
                    checked={player.isChecked}
                  />
                  {player.firstName} {player.lastName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {hasCheckedPlayers() && (
        <div className={` ${style["player-select-list"]} widget-container`}>
          {props.players.map(
            (player: any, key: number) =>
              player.isChecked && (
                <div key={key}>
                  <PlayerComponent
                    player={player}
                    onPlayerDrag={() => ""}
                    onPlayerDrop={() => ""}
                    value={0}
                    color="#153a9f"
                    label={0}
                    onClick={() => navigate("/admin/profile/" + player.id)}
                  />
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
{
}
