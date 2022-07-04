import React from "react";
import style from "./field-overview.module.scss";
import { PlayerComponent } from "../../cores/player/player";
import { IPlayer } from "../../../types/cores/player";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import { ButtonComponent } from "../../cores/button/button";
import { IFieldOverview } from "../../../types/modules/field-overview";
import { playersReplaceData } from "../../../api/players";
import { PlayerSwapComponent } from "../../cores/player-swap/player-swap";
import { IWidget } from "../../../types/cores/widget";
import { IProfile } from "../../../types/modules/squad";

interface IFieldOverviewComponent {
  fieldOverview: IFieldOverview;
  profiles: any[];
}
export const FieldOverviewComponent = ({
  fieldOverview,
  profiles,
}: IFieldOverviewComponent) => {
  const sortPlayer = (list: IPlayer[]) => {
    return list.sort((a, b) => {
      if (a.gridX === b.gridX) {
        return a.gridY - b.gridY;
      } else {
        return a.gridX - b.gridX;
      }
    });
  };
  const [playersList, setPlayersList] = React.useState<IPlayer[]>(
    sortPlayer(profiles)
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<IPlayer>(
    playersList[0]
  );
  const [selectedButton, setSelectedButton] = React.useState<string>("Total");
  const [formation, setFormation] = React.useState<string>("4-2-3-1");
  const [isOpen, setIsOpen] = React.useState(false);
  const colors = ["#D3D3D3", "#A7BAEA", "#6488E5", "#375FCA", "#2C2F51"];
  const getPlayerPosition = (position: number) => {
    const newFormation = formation.replaceAll("-", "");
    const width = newFormation.charAt(position - 1);
    return Math.round(100 / parseInt(width));
  };
  const updatePlayers = (playerTarget: IPlayer) => {
    const players = playersList.map((player) => {
      const playerCopy = { ...player };
      if (
        playerCopy.gridX === playerTarget.gridX &&
        playerCopy.gridY === playerTarget.gridY
      ) {
        playerCopy.gridX = currentPlayer.gridX;
        playerCopy.gridY = currentPlayer.gridY;
      }
      if (
        playerCopy.gridX === currentPlayer.gridX &&
        playerCopy.gridY === currentPlayer.gridY
      ) {
        playerCopy.gridX = playerTarget.gridX;
        playerCopy.gridY = playerTarget.gridY;
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
      (data) => data.name === selectedButton
    );
    const player = dataSet?.data.find((data) => data.profileId === playerId);
    return player ? Math.round(player.value * 100) : 0;
  };
  const getPlayerColor = (playerId: number) => {
    const playerValue = getPlayerValue(playerId);
    const result = Math.trunc(playerValue / (100 / colors.length));
    return result === colors.length
      ? colors[colors.length - 1]
      : colors[result];
  };
  const playerClicked = (player: IPlayer) => {
    setIsOpen(!isOpen);
    setCurrentPlayer(player);
  };
  const playerSelected = (playerTarget: IPlayer) => {
    const players = playersList.map((player) => {
      const playerCopy = { ...player };
      if (playerCopy.id === currentPlayer.id) {
        playerCopy.firstName = playerTarget.firstName;
        playerCopy.id = playerTarget.id;
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
            <DropdownComponent title={formation}>
              <ul>
                {fieldOverview.formations.map((item, key) => (
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
              value={getPlayerValue(playersList[0].id)}
              color={getPlayerColor(playersList[0].id)}
              onPlayerDrop={() => ""}
              onPlayerDrag={() => ""}
            />
          </div>
          {playersList.slice(1, 11).map((player, key) => (
            <div
              key={key}
              style={{
                width: `${getPlayerPosition(player.gridX)}% `,
              }}
              onClick={() => !player.ghost && playerClicked(player)}
            >
              <PlayerComponent
                player={player}
                value={player.ghost ? 0 : getPlayerValue(player.id)}
                color={player.ghost ? "" : getPlayerColor(player.id)}
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
              playerName={currentPlayer.firstName}
              onClick={playerSelected}
              onClose={() => setIsOpen(false)}
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
            {colors.map((color, key) => (
              <span
                key={key}
                style={{
                  width: `${100 / colors.length}%`,
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
                title={data.name}
                key={key}
                variant={
                  selectedButton === data.name ? "transparent" : "disabled"
                }
                hasBorder
                position="top"
                onClick={() => setSelectedButton(data.name ? data.name : "")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
