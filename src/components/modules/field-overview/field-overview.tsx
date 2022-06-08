import React from "react";
import style from "./field-overview.module.scss";
import { PlayerComponent } from "../../cores/player/player";
import { IPlayer } from "../../../types/cores/player";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import { ButtonComponent } from "../../cores/button/button";
import { IFieldOverview } from "../../../types/modules/field-overview";
import { playersReplaceData } from "../../../api/players";
import { PlayerSwapComponent } from "../../cores/player-swap/player-swap";

interface IFieldOverviewComponent {
  fieldOverview: IFieldOverview;
}
export const FieldOverviewComponent = ({
  fieldOverview,
}: IFieldOverviewComponent) => {
  const sortPlayer = (list: IPlayer[]) => {
    return list.sort((a, b) => {
      if (a.positionX === b.positionX) {
        return a.positionY - b.positionY;
      } else {
        return a.positionX - b.positionX;
      }
    });
  };
  const [playersList, setPlayersList] = React.useState<IPlayer[]>(
    sortPlayer(fieldOverview.players)
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<IPlayer>(
    playersList[0]
  );
  const [selectedButton, setSelectedButton] =
    React.useState<string>("Interactions");
  const [formation, setFormation] = React.useState<string>("4-2-3-1");
  const [isOpen, setIsOpen] = React.useState(false);

  const data = ["4-2-3-1", "4-3-2-1", "3-3-3-1"];

  const getPlayerPosition = (position: number) => {
    const newFormation = formation.replaceAll("-", "");
    const width = newFormation.charAt(position - 1);
    return Math.round(100 / parseInt(width));
  };
  const updatePlayers = (playerTarget: IPlayer) => {
    const players = playersList.map((player) => {
      const playerCopy = { ...player };
      if (playerCopy.number === playerTarget.number) {
        playerCopy.positionX = currentPlayer.positionX;
        playerCopy.positionY = currentPlayer.positionY;
      }
      if (playerCopy.number === currentPlayer.number) {
        playerCopy.positionX = playerTarget.positionX;
        playerCopy.positionY = playerTarget.positionY;
      }
      return playerCopy;
    });
    if (players) {
      const sortedList = sortPlayer(players);
      setPlayersList(sortedList);
    }
  };
  const getPlayerValue = (playerId: number) => {
    const dataSet = fieldOverview.dataSets.find(
      (data) => data.button.title === selectedButton
    );
    const player = dataSet?.data.find((data) => data.playerId === playerId);
    return player ? Math.round(player.value * 100) : 0;
  };
  const getPlayerColor = (playerId: number) => {
    const playerValue = getPlayerValue(playerId);
    const result = Math.trunc(
      playerValue / (100 / fieldOverview.colors.length)
    );
    return result === fieldOverview.colors.length
      ? fieldOverview.colors[fieldOverview.colors.length - 1]
      : fieldOverview.colors[result];
  };
  const playerClicked = (player: IPlayer) => {
    setIsOpen(!isOpen);
    setCurrentPlayer(player);
  };
  const playerSelected = (playerTarget: IPlayer) => {
    const players = playersList.map((player) => {
      const playerCopy = { ...player };
      if (playerCopy.number === currentPlayer.number) {
        playerCopy.name = playerTarget.name;
        playerCopy.number = playerTarget.number;
        playerCopy.isReplaced = true;
      }
      return playerCopy;
    });
    if (players) {
      const sortedList = sortPlayer(players);
      setPlayersList(sortedList);
      setIsOpen(false);
    }
  };
  return (
    <div className={style["field-overview"]}>
      <div className={style["field-overview-top"]}>
        <div className={style["field-overview-players"]}>
          <div className={style["field-overview-formation"]}>
            <DropdownComponent title={formation} hasNoPadding>
              <ul>
                {data.map((item, key) => (
                  <li key={key} onClick={() => setFormation(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            </DropdownComponent>
          </div>
          <div style={{ width: "100%" }}>
            <PlayerComponent
              player={playersList[0]}
              value={getPlayerValue(playersList[0].number)}
              color={getPlayerColor(playersList[0].number)}
              onPlayerDrop={() => ""}
              onPlayerDrag={() => ""}
            />
          </div>
          {playersList.slice(1, 11).map((player, key) => (
            <div
              key={key}
              style={{
                width: `${getPlayerPosition(player.positionX)}% `,
              }}
              onClick={() => playerClicked(player)}
            >
              <PlayerComponent
                player={player}
                value={getPlayerValue(player.number)}
                color={getPlayerColor(player.number)}
                onPlayerDrag={(index) => setCurrentPlayer(index)}
                onPlayerDrop={updatePlayers}
              />
            </div>
          ))}
        </div>
        {isOpen && (
          <div className={style["field-overview-replacement"]}>
            <PlayerSwapComponent
              players={playersReplaceData()}
              playerName={currentPlayer.name}
              onClick={playerSelected}
            />
          </div>
        )}
      </div>
      <div className={style["field-overview-bottom"]}>
        <div className={style["field-overview-gradient"]}>
          <div>
            <span>Few</span>
            <span>Many</span>
          </div>
          <div>
            {fieldOverview.colors.map((color, key) => (
              <span
                key={key}
                style={{
                  width: `${100 / fieldOverview.colors.length}%`,
                  backgroundColor: color,
                }}
              ></span>
            ))}
          </div>
        </div>
        <div className={style["field-overview-buttons"]}>
          <div>
            <input placeholder="Start" />
            <input placeholder="End" />
            <ButtonComponent title="Entire session" hasBorder />
          </div>
          <div>
            {fieldOverview.dataSets.map((data, key) => (
              <ButtonComponent
                {...data.button}
                key={key}
                variant={
                  selectedButton === data.button.title
                    ? "transparent"
                    : "disabled"
                }
                hasBorder
                position="top"
                onClick={() => setSelectedButton(data.button.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
