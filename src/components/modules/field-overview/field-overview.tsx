import React from "react";
import style from "./field-overview.module.scss";
import { PlayerComponent } from "../../cores/player/player";
import { IPlayer } from "../../../types/cores/player";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import { ButtonComponent } from "../../cores/button/button";
import { IFieldOverview } from "../../../types/modules/field-overview";
import { playersReplaceData } from "../../../api/players";
import { PlayerSwapComponent } from "../../cores/player-swap/player-swap";
import { getNewFormationAPI, getRangeAPI } from "../../../api/field-overview";
import { useParams } from "react-router-dom";
import { AccountContext } from "../../../context/account";
import { LoaderComponent } from "../../cores/loader/loader";
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
  const [fieldData, setFieldData] =
    React.useState<IFieldOverview>(fieldOverview);

  const [currentPlayer, setCurrentPlayer] = React.useState<IPlayer>(
    playersList[0]
  );
  const { getAccount } = React.useContext(AccountContext);
  const [selectedButton, setSelectedButton] = React.useState<string>("Total");
  const [range, setRange] = React.useState({
    from: fieldOverview.matchData.startMinute,
    to: fieldOverview.matchData.endMinute,
  });
  const [formation, setFormation] = React.useState<string>("4-2-3-1");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const colors = ["#D3D3D3", "#A7BAEA", "#6488E5", "#375FCA", "#2C2F51"];
  const { id } = useParams();

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
    const dataSet = fieldData.dataSets.find(
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
  const changeRange = async (session: any) => {
    if (
      range.to <= fieldData.matchData.endMinute &&
      range.from < fieldData.matchData.endMinute
    ) {
      setIsLoading(true);
      const result = await getRangeAPI(
        session,
        "sessionId=" + id + "&from=" + range.from + "&to=" + range.to
      );
      if (result.data) {
        setFieldData(result.data.data);
        setIsLoading(false);
      }
    }
  };
  const changeFormation = async (session: any) => {
    setIsLoading(true);
    const result = await getNewFormationAPI(
      session,
      "sessionId=" + id + "&formation=" + formation
    );
    const sortedResult = sortPlayer(result.data.profiles);
    setPlayersList(sortedResult);
    if (sortedResult) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getAccount().then((session: any) => {
      changeFormation(session);
    });
  }, [formation]);
  React.useEffect(() => {
    getAccount().then((session: any) => {
      changeRange(session);
    });
  }, [range]);
  return (
    <div className={style["field-overview"]}>
      {!isLoading ? (
        <div className={style["field-overview-top"]}>
          <div className={style["field-overview-formation"]}>
            <DropdownComponent title={formation}>
              <ul>
                {fieldData.formations.map((item, key) => (
                  <li key={key} onClick={() => setFormation(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            </DropdownComponent>
          </div>
          <div className={style["field-overview-players"]}>
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
      ) : (
        <div className={style["field-overview-top"]}>
          <LoaderComponent />
        </div>
      )}
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
            <input
              placeholder="Start"
              type={"number"}
              max={fieldData.matchData.endMinute - 1}
              min={0}
              onChangeCapture={(e: any) =>
                e.target.value >= 0 &&
                setRange({ from: e.target.value, to: range.to })
              }
            />
            <input
              placeholder="End"
              type={"number"}
              min={1}
              max={fieldData.matchData.endMinute}
              onChangeCapture={(e: any) =>
                e.target.value > 0 &&
                setRange({ from: range.from, to: e.target.value })
              }
            />
            <ButtonComponent
              title="Entire session"
              hasBorder
              onClick={() =>
                setRange({
                  from: fieldData.matchData.startMinute,
                  to: fieldData.matchData.endMinute,
                })
              }
            />
          </div>
          <div>
            {fieldData.dataSets.map((data, key) => (
              <ButtonComponent
                title={data.name}
                icon={`/icons/` + data.icon}
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
