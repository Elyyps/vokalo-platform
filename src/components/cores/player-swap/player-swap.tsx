import React from "react";
import style from "./player-swap.module.scss";
import { IPlayer } from "../../../types/cores/player";
import { ReactSVG } from "react-svg";
import { PlayerComponent } from "../player/player";
import { Tooltip } from "../tooltip/tooltip";
interface IPlayerSwapComponent {
  players: IPlayer[];
  playerName?: string;
  onDrag: (index: IPlayer) => void;
  onDrop: (player: IPlayer) => void;
  // onClick: (player: IPlayer) => void;
  // onClose: () => void;
}
export const PlayerSwapComponent = ({
  players,
  playerName,
  onDrag,
  onDrop,
}: //onClick,
//onClose,
IPlayerSwapComponent) => {
  const [sliceFrom, setSliceFrom] = React.useState(0);
  const wrapperRef = React.createRef<HTMLDivElement>();

  // React.useEffect(() => {
  //   function handleClickOutside(event: any) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [wrapperRef]);

  return (
    <div className={style["player-swap"]}>
      <h3>
        Subs <Tooltip content="Drag and drop to swap players" />
      </h3>
      <div className={style["player-swap-content"]} ref={wrapperRef}>
        {/* <div className={style["player-swap-cross"]}>
          <b onClick={onClose}>x</b>
        </div> */}
        {/* <span>
          Replacement for player: <u>{playerName}</u>
        </span> */}
        <div>
          {players.length > 10 && (
            <ReactSVG
              src="/icons/arrow-down.svg"
              style={{
                transform: "rotate(90deg)",
                opacity: sliceFrom === 1 ? 0.3 : 1,
              }}
              onClick={() => sliceFrom > 1 && setSliceFrom(sliceFrom - 10)}
            />
          )}
          <div className={style["player-swap-list"]}>
            {players.slice(sliceFrom, sliceFrom + 10).map((player, key) => (
              // <div
              //   key={key}
              //   className={style["player-swap-item"]}
              //   // onClick={() => onClick(player)}
              // >
              //   <div>0</div>
              //   <span>
              //     {player.lastName.length > 1
              //       ? player.firstName.charAt(0) + "." + player.lastName
              //       : player.firstName}
              //   </span>
              // </div>
              <PlayerComponent
                player={player}
                label={0}
                value={0}
                color={"#000000"}
                //  onClick={() => !player.ghost && playerClicked(player)}
                onPlayerDrag={(index) => onDrag(index)}
                onPlayerDrop={onDrop}
                key={key}
              />
            ))}
          </div>
          {players.length > 10 && (
            <ReactSVG
              src="/icons/arrow-down.svg"
              style={{
                transform: "rotate(270deg)",
                opacity: sliceFrom === players.length - 10 ? 0.3 : 1,
              }}
              onClick={() =>
                sliceFrom < players.length - 10 && setSliceFrom(sliceFrom + 10)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
