import React from "react";
import { ReactSVG } from "react-svg";
import { IPlayer } from "../../../types/cores/player";
import style from "./player.module.scss";
interface IPlayerComponent {
  player: IPlayer;
  value: number;
  color: string;
  onPlayerDrop: (playerTarget: IPlayer) => void;
  onPlayerDrag: (playerDrag: IPlayer) => void;
}
export const PlayerComponent = ({
  player,
  value,
  color,
  onPlayerDrop,
  onPlayerDrag,
}: IPlayerComponent) => {
  function handleDragStart(e: any) {
    const data = JSON.stringify({ type: "card" });
    e.dataTransfer.setData("text/plain", data);
    onPlayerDrag(player);
  }

  function handleDragEnd(e: any) {
    e.dataTransfer.clearData();
  }
  function handleDragOver(e: any) {
    if (e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault();
    }
  }
  function handleDrop(e: any, playerTarget: IPlayer) {
    const dataJSON = e.dataTransfer.getData("text/plain");
    let data;
    try {
      data = JSON.parse(dataJSON);
    } catch {}
    if (data && data.type === "card") {
      onPlayerDrop(playerTarget);
    }
  }
  return (
    <div
      className={`${style["player"]} ${style["player-" + player.positionX]}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      // onDragLeave={() => setIsOver(false)}
      onDrop={(e) => handleDrop(e, player)}
    >
      <div
        className={style["player-number"]}
        style={{ backgroundColor: color }}
        draggable
      >
        <span>{value}</span>
        {player.isReplaced && (
          <span className={style["player-replaced"]}>
            <ReactSVG src="/icons/change.svg" />
          </span>
        )}
      </div>
      <span className={style["player-name"]}>{player.name}</span>
    </div>
  );
};
