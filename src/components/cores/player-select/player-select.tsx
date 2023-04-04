import React from "react";
import { IPlayer } from "../../../types/cores/player";
import style from "./player-select.module.scss";
import { ButtonComponent } from "../button/button";
import { PlayerComponent } from "../player/player";

interface IPlayerSelectCompenent {
  players: IPlayer[];
  onSelect: (players: IPlayer[]) => void;
}
export const PlayerSelectCompenent = (props: IPlayerSelectCompenent) => {
  const [selectedPlayers, setSelectedPlayers] = React.useState<IPlayer[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const wrapperRef = React.createRef<HTMLDivElement>();

  const searchPlayers = () => {
    const filteredPlayers = props.players.filter(
      (player) =>
        player.firstName.toLowerCase().includes(search.toLowerCase()) ||
        player.lastName.toLowerCase().includes(search.toLowerCase())
    );
    return filteredPlayers;
  };
  const isSelected = (player: IPlayer) => {
    const result = selectedPlayers.find((profile) => profile.id === player.id);
    return result ? true : false;
  };
  const addPlayer = (player: IPlayer, index: number) => {
    let list = selectedPlayers;
    if (!isSelected(player)) {
      list?.push(player);
      setSelectedPlayers(list);
    } else {
      list?.splice(index, 1);
      setSelectedPlayers(list);
    }
    props.onSelect(list);
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
            {searchPlayers().map((player, key) => (
              <li key={key}>
                <input
                  type="checkbox"
                  onChange={() => addPlayer(player, key)}
                  checked={isSelected(player)}
                />
                {player.firstName} {player.lastName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedPlayers?.length > 0 && (
        <div className={` ${style["player-select-list"]} widget-container`}>
          {selectedPlayers.map((player, key) => (
            <div key={key}>
              <PlayerComponent
                player={player}
                onPlayerDrag={() => ""}
                onPlayerDrop={() => ""}
                value={0}
                color="#153a9f"
                label={0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
{
}
