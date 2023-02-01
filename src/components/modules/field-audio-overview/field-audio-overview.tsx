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
import { IPlayer } from "../../../types/cores/player";
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
  const sortPlayers = (list: any[]) => {
    if (list.length) {
      return list.sort((a, b) => {
        if (a.profile.gridX === b.profile.gridX) {
          return a.profile.gridY - b.profile.gridY;
        } else {
          return a.profile.gridX - b.profile.gridX;
        }
      });
    } else return [];
  };
  const [playersList, setPlayersList] = React.useState<any[]>(
    profiles ? profiles : []
  );
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);
  const getReplacementPlayers = () => {
    const filtertedList = playersList.filter(
      (player) => player.profile.gridX === -1 && player.profile.gridY === -1
    );
    return filtertedList;
  };
  const [currentPlayer, setCurrentPlayer] = React.useState<any>(
    playersList[0] && playersList[0]
  );
  const [formation, setFormation] = React.useState<string>(
    fieldOverview.matchData.currentFormation
      ? fieldOverview.matchData.currentFormation
      : ""
  );
  const [sliceFrom, setSliceFrom] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);

  const getPlayerPosition = (position: number) => {
    const newFormation = formation.replaceAll("-", "");
    const width = newFormation.charAt(position - 1);
    return Math.round(100 / parseInt(width));
  };

  const updatePlayers = (playerTarget: any, isReclacement?: boolean) => {
    const players = playersList.map((player, index) => {
      const playerCopy: any = { ...player.profile };

      if (playerCopy.id === playerTarget.id) {
        playerCopy.gridX = currentPlayer.gridX;
        playerCopy.gridY = currentPlayer.gridY;
        if (isReclacement) {
          playerCopy.substituted = true;
        }
      }
      if (playerCopy.id === currentPlayer.id) {
        playerCopy.gridX = playerTarget.gridX;
        playerCopy.gridY = playerTarget.gridY;
      }
      return { ...player, profile: playerCopy };
    });
    if (players) {
      const sortedList = sortPlayers(players);
      setPlayersList(sortedList);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    const sortedResult = sortPlayers(playersList);
    setPlayersList(sortedResult);
    if (sortedResult) {
      setIsLoading(false);
    }
  }, []);

  return (
    fieldOverview && (
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
              <b>{formation}</b>
            </div>
            <div
              className={style["field-audio-overview-players"]}
              style={formation === "Training" ? { paddingTop: "44px" } : {}}
            >
              {playersList &&
                playersList
                  .filter(
                    (player) =>
                      player.profile.gridX > -1 &&
                      player.profile.gridX !== undefined
                  )
                  .map((player, key) => (
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
                        onPlayerDrag={setCurrentPlayer}
                        onPlayerDrop={updatePlayers}
                      >
                        <AudioPlayerComponent
                          audios={player.audioRecordingData}
                          currentTime={currentTime}
                          isPlaying={isPlaying}
                        />
                      </PlayerComponent>
                    </div>
                  ))}
            </div>
          </div>
        ) : (
          <div className={style["field-audio-overview-top"]}>
            <LoaderComponent />
          </div>
        )}

        <div className={style["field-audio-overview-bottom"]}>
          <div>
            {getReplacementPlayers().length > 4 && (
              <ReactSVG
                src="/icons/arrow-down.svg"
                style={{
                  transform: "rotate(90deg)",
                  opacity: sliceFrom === 1 ? 0.3 : 1,
                }}
                onClick={() => sliceFrom > 1 && setSliceFrom(sliceFrom - 4)}
              />
            )}
            <div className={style["field-audio-overview-swaps"]}>
              {playersList
                .slice(sliceFrom, sliceFrom + 4)
                .map(
                  (player, key) =>
                    player.profile.gridX < 0 && (
                      <PlayerComponent
                        player={player.profile}
                        label={0}
                        value={0}
                        color={""}
                        onPlayerDrag={(index) => setCurrentPlayer(index)}
                        onPlayerDrop={(player) => updatePlayers(player, true)}
                        key={key}
                      />
                    )
                )}
            </div>

            {getReplacementPlayers().length > 4 && (
              <ReactSVG
                src="/icons/arrow-down.svg"
                style={{
                  transform: "rotate(270deg)",
                  opacity:
                    sliceFrom === getReplacementPlayers().length - 4 ? 0.3 : 1,
                }}
                onClick={() =>
                  sliceFrom < getReplacementPlayers().length - 4 &&
                  setSliceFrom(sliceFrom + 4)
                }
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};
