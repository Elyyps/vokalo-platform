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
export const PlayerComponent = (props: IPlayerComponent) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleDragStart = (e: any) => {
    const data = JSON.stringify({ type: "card" });
    e.dataTransfer.setData("text/plain", data);
    props.onPlayerDrag(props.player);
  };
  const handleDragEnd = (e: any) => {
    e.dataTransfer.clearData();
  };
  const handleDragOver = (e: any) => {
    if (e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault();
    }
  };
  const handleDrop = (e: any, playerTarget: IPlayer) => {
    const dataJSON = e.dataTransfer.getData("text/plain");
    let data;
    try {
      data = JSON.parse(dataJSON);
    } catch {}
    if (data && data.type === "card") {
      props.onPlayerDrop(playerTarget);
    }
  };
  return (
    <div
      className={`${style["player"]} ${style["player-" + props.player.gridX]}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, props.player)}
      onClick={() => setIsOpen(!isOpen)}
      style={{ opacity: props.player.ghost ? 0.5 : 1 }}
    >
      <div
        className={style["player-number"]}
        style={{ backgroundColor: props.color }}
        draggable
      >
        {/* <span>{props.value}</span> */}
        {props.player.isReplaced && (
          <span className={style["player-replaced"]}>
            <ReactSVG src="/icons/change.svg" />
          </span>
        )}
      </div>
      <span
        className={style["player-name"]}
        style={{ visibility: props.player.ghost ? "hidden" : "visible" }}
      >
        {props.player.firstName.charAt(0)}.{props.player.lastName}
      </span>
    </div>
  );
};
