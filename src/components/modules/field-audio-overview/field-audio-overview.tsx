import React from "react";
import style from "./field-audio-overview.module.scss";
import { PlayerComponent } from "../../cores/player/player";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import { IFieldOverview } from "../../../types/modules/field-overview";
import { useParams } from "react-router-dom";
import { AccountContext } from "../../../context/account";
import { LoaderComponent } from "../../cores/loader/loader";
import { ReactSVG } from "react-svg";
import { AudioPlayerComponent } from "../../cores/audio-player/audio-player";
interface IFieldOverviewComponent {
  fieldOverview: IFieldOverview;
  profiles: any[];
  currentTime: number;
  isPlaying: boolean;
}
export const FieldAudioOverviewComponent = ({
  fieldOverview,
  profiles,
  currentTime,
  isPlaying,
}: IFieldOverviewComponent) => {
  const sortPlayer = (list: any[]) => {
    console.log(list);
    if (list.length) {
      const filtertedData = list.filter(
        (player: any) => player.profile.gridX >= 0 && player.profile.gridY >= 0
      );
      return filtertedData.sort((a, b) => {
        if (a.profile.gridX === b.profile.gridX) {
          return a.profile.gridY - b.profile.gridY;
        } else {
          return a.profile.gridX - b.profile.gridX;
        }
      });
    } else return [];
  };
  const { id } = useParams();
  const { getAccount } = React.useContext(AccountContext);

  const [playersList, setPlayersList] = React.useState<any[]>(
    profiles ? profiles : []
  );
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);
  const getReplacementPlayers = (list: any[]) => {
    const filtertedList = list.filter(
      (player) => player.profile.gridX === -1 && player.profile.gridY === -1
    );
    return filtertedList;
  };
  const [swapPlayersList, setSwapPlayersList] = React.useState<any[]>(
    getReplacementPlayers(profiles)
  );
  const [fieldData, setFieldData] =
    React.useState<IFieldOverview>(fieldOverview);
  const [currentPlayer, setCurrentPlayer] = React.useState<any>(
    playersList[0] && playersList[0]
  );
  const [formation, setFormation] = React.useState<string>("4-4-2");
  const [sliceFrom, setSliceFrom] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);

  const getPlayerPosition = (position: number) => {
    const newFormation = formation.replaceAll("-", "");
    const width = newFormation.charAt(position - 1);
    return Math.round(100 / parseInt(width));
  };
  const formations: string[] = React.useMemo(() => {
    return fieldData.formations;
  }, [fieldData.formations]);

  const updatePlayers = (playerTarget: any, isReclacement?: boolean) => {
    const players = [playerTarget, currentPlayer].map((player, index) => {
      const playerCopy = { ...player };
      if (index === 0) {
        playerCopy.profile.gridX = currentPlayer.profile.gridX;
        playerCopy.profile.gridY = currentPlayer.profile.gridY;
        if (isReclacement) {
          playerCopy.profile.substituted = true;
        }
      }
      if (index === 1) {
        playerCopy.profile.gridX = playerTarget.profile.gridX;
        playerCopy.profile.gridY = playerTarget.profile.gridY;
      }
      return playerCopy;
    });
    if (players) {
      const swapPlayers = getReplacementPlayers(players);
      setSwapPlayersList(swapPlayers);
      const sortedList = sortPlayer(players);
      setPlayersList(sortedList);
    }
  };
  // const changeFormation = () => {
  //   setIsLoading(true);
  //   const sortedResult = sortPlayer(playersList);
  //   setPlayersList(sortedResult);
  //   if (sortedResult) {
  //     setIsLoading(false);
  //   }
  // };
  React.useEffect(() => {
    setIsLoading(true);
    const sortedResult = sortPlayer(playersList);
    setPlayersList(sortedResult);
    if (sortedResult) {
      setIsLoading(false);
    }
  }, []);

  return (
    fieldData && (
      <div className={style["field-audio-overview"]}>
        {!isLoading ? (
          <div
            className={` ${style["field-audio-overview-top"]} ${
              style[isFlipped ? "field-audio-overview-top-rotate" : ""]
            }  `}
          >
            <div className={style["field-audio-overview-formation"]}>
              <span style={{ opacity: isFlipped ? "1" : "0.6" }}>
                <ReactSVG
                  src="/icons/up-down-arrow.svg"
                  onClick={() => setIsFlipped(!isFlipped)}
                />
              </span>
              <DropdownComponent title={formation}>
                <ul>
                  {formations &&
                    formations.map((item: string, key: number) => (
                      <li key={key} onClick={() => setFormation(item)}>
                        {item}
                      </li>
                    ))}
                </ul>
              </DropdownComponent>
            </div>
            <div
              className={style["field-audio-overview-players"]}
              style={formation === "Training" ? { paddingTop: "44px" } : {}}
            >
              {playersList &&
                playersList.map(
                  (player, key) =>
                    player.profile.gridX !== undefined && (
                      <div
                        key={key}
                        style={
                          formation !== "Training"
                            ? {
                                width:
                                  key === 0
                                    ? "100%"
                                    : `${getPlayerPosition(
                                        player.profile.gridX
                                      )}% `,
                              }
                            : { width: "20%" }
                        }
                      >
                        <PlayerComponent
                          player={player.profile}
                          label={0}
                          value={0}
                          color={""}
                          onPlayerDrag={(index) => setCurrentPlayer(index)}
                          onPlayerDrop={updatePlayers}
                        >
                          <AudioPlayerComponent
                            audios={player.audioRecordingData}
                            currentTime={currentTime}
                            isPlaying={isPlaying}
                          />
                        </PlayerComponent>
                      </div>
                    )
                )}
            </div>
          </div>
        ) : (
          <div className={style["field-audio-overview-top"]}>
            <LoaderComponent />
          </div>
        )}

        <div className={style["field-audio-overview-bottom"]}>
          <div>
            {swapPlayersList.length > 8 && (
              <ReactSVG
                src="/icons/arrow-down.svg"
                style={{
                  transform: "rotate(90deg)",
                  opacity: sliceFrom === 1 ? 0.3 : 1,
                }}
                onClick={() => sliceFrom > 1 && setSliceFrom(sliceFrom - 8)}
              />
            )}
            <div className={style["field-audio-overview-swaps"]}>
              {swapPlayersList
                .slice(sliceFrom, sliceFrom + 8)
                .map((player, key) => (
                  <PlayerComponent
                    player={player.profile}
                    label={0}
                    value={0}
                    color={""}
                    onPlayerDrag={(index) => setCurrentPlayer(index)}
                    onPlayerDrop={updatePlayers}
                    key={key}
                  />
                ))}
            </div>

            {/* {swapPlayersList.length > 8 && (
                <ReactSVG
                  src="/icons/arrow-down.svg"
                  style={{
                    transform: "rotate(270deg)",
                    opacity: sliceFrom === swapPlayersList.length - 8 ? 0.3 : 1,
                  }}
                  onClick={() =>
                    sliceFrom < swapPlayersList.length - 8 &&
                    setSliceFrom(sliceFrom + 8)
                  }
                />
              )} */}
          </div>
          {/* <div className={style["field-overview-gradient"]}>
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
                value={range.from && range.from}
                onChange={(e: any) =>
                  setRange({ from: e.target.value, to: range.to })
                }
              />
              <input
                placeholder="End"
                type={"number"}
                min={1}
                value={range.to && range.to}
                max={fieldData.matchData.endMinute}
                onChange={(e: any) =>
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
                    onClick={() =>
                      setSelectedButton(data.name ? data.name : "")
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )} */}
        </div>
      </div>
    )
  );
};
