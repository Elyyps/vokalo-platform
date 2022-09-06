import React from "react";
import style from "./player-swap.module.scss";
import { IPlayer } from "../../../types/cores/player";
import { ReactSVG } from "react-svg";
interface IPlayerSwapComponent {
  players: IPlayer[];
  playerName: string;
  onClick: (player: IPlayer) => void;
  onClose: () => void;
}
export const PlayerSwapComponent = ({
  players,
  playerName,
  onClick,
  onClose,
}: IPlayerSwapComponent) => {
  const [sliceFrom, setSliceFrom] = React.useState(0);
  const wrapperRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className={style["player-swap"]}>
      <div className={style["player-swap-content"]} ref={wrapperRef}>
        <div className={style["player-swap-cross"]}>
          <b onClick={onClose}>x</b>
        </div>
        <span>
          Replacement for player: <u>{playerName}</u>
        </span>
        <div>
          <ReactSVG
            src="/icons/arrow-down.svg"
            style={{
              transform: "rotate(90deg)",
              opacity: sliceFrom === 1 ? 0.3 : 1,
            }}
            onClick={() => sliceFrom > 1 && setSliceFrom(sliceFrom - 1)}
          />
          {players.slice(sliceFrom, sliceFrom + 3).map((player, key) => (
            <div
              key={key}
              className={style["player-swap-item"]}
              onClick={() => onClick(player)}
            >
              <div>0</div>
              <span>
                {player.lastName.length > 1 ? player.firstName.charAt(0) +"." + player.lastName : player.firstName}
              </span>
            </div>
          ))}
          <ReactSVG
            src="/icons/arrow-down.svg"
            style={{
              transform: "rotate(270deg)",
              opacity: sliceFrom === players.length - 3 ? 0.3 : 1,
            }}
            onClick={() =>
              sliceFrom < players.length - 3 && setSliceFrom(sliceFrom + 1)
            }
          />
        </div>
      </div>
    </div>
  );
};
