import React from "react";
import style from "./field-audio-overview.module.scss";
import { PlayerComponent } from "../../cores/player/player";
import { IFieldOverview } from "../../../types/modules/field-overview";
import { ReactSVG } from "react-svg";
import { AudioPlayerComponent } from "../../cores/audio-player/audio-player";

interface IFieldAudioOverviewComponent {
  fieldOverview: IFieldOverview;
  profiles: any[];
  currentTime: number;
  isPlaying: boolean;
  onChange: (players: any) => void;
  isCoach: boolean;
}
export const FieldAudioOverviewComponent = ({
  fieldOverview,
  profiles,
  currentTime,
  isPlaying,
  isCoach,
  onChange,
}: IFieldAudioOverviewComponent) => {
  const sortPlayers = (list: any[]) => {
    if (list.length) {
      const filtertedData = list.filter(
        (player: any) =>
          player.profile.role !== "coach" &&
          player.profile.gridX >= 0 &&
          player.profile.gridY >= 0
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
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);
  const getReplacementPlayers = () => {
    return (
      profiles &&
      profiles.filter(
        (player: any) =>
          player.profile.gridX === -1 && player.profile.gridY === -1
      )
    );
  };
  const [sliceFrom, setSliceFrom] = React.useState(0);
  const [currentPlayer, setCurrentPlayer] = React.useState<any>(
    profiles[0] && profiles[0]
  );
  const [formation, setFormation] = React.useState<string>(
    fieldOverview.matchData.currentFormation
      ? fieldOverview.matchData.currentFormation
      : ""
  );

  const getPlayerPosition = (position: number) => {
    const newFormation = formation.replaceAll("-", "");
    const width = newFormation.charAt(position - 1);
    return Math.round(100 / parseInt(width));
  };

  const updatePlayers = (playerTarget: any, isReclacement?: boolean) => {
    const players = profiles.map((player, index) => {
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
      onChange(players);
    }
  };
  const mutePlayer = (selectedPlayer: any) => {
    const players = profiles.map((player, index) => {
      const playerCopy: any = { ...player };
      if (playerCopy.profile.id === selectedPlayer.id) {
        return { ...playerCopy, isMuted: !playerCopy.isMuted };
      } else {
        return playerCopy;
      }
    });
    if (players) {
      onChange(players);
    }
  };
  const getCoachAudios = () => {
    return profiles.filter((player) => player.profile.role === "Coach");
  };

  return (
    fieldOverview && (
      <div className={style["field-audio-overview"]}>
        <div
          className={` ${style["field-audio-overview-top"]} ${
            style[isFlipped ? "field-audio-overview-top-rotate" : ""]
          }  `}
        >
          {isCoach && profiles && (
            <div className={style["field-audio-overview-coach"]}>
              {getCoachAudios().map((coach, key) => (
                <span onClick={() => mutePlayer(coach.profile)} key={key}>
                  <AudioPlayerComponent
                    audios={coach.audioRecordingData}
                    currentTime={currentTime}
                    isPlaying={isPlaying}
                    isMuted={coach.isMuted}
                    coachNumber={key + 1}
                  />
                </span>
              ))}
            </div>
          )}

          <div className={style["field-audio-overview-formation"]}>
            <span style={{ opacity: isFlipped ? "1" : "0.5" }}>
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
            {profiles &&
              sortPlayers(profiles).map(
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
                        onPlayerDrag={setCurrentPlayer}
                        onPlayerDrop={updatePlayers}
                        onClick={() => mutePlayer(player.profile)}
                      >
                        <AudioPlayerComponent
                          audios={player.audioRecordingData}
                          currentTime={currentTime}
                          isPlaying={isPlaying}
                          isMuted={player.isMuted}
                        />
                      </PlayerComponent>
                    </div>
                  )
              )}
          </div>
        </div>

        {getReplacementPlayers().length > 0 && (
          <div className={style["field-audio-overview-bottom"]}>
            <div>
              {getReplacementPlayers().length > 8 && (
                <ReactSVG
                  src="/icons/arrow-down.svg"
                  style={{
                    transform: "rotate(90deg)",
                    opacity: sliceFrom === 0 ? 0.3 : 1,
                  }}
                  onClick={() => sliceFrom > 0 && setSliceFrom(sliceFrom - 8)}
                />
              )}
              <div className={style["field-audio-overview-swaps"]}>
                {getReplacementPlayers()
                  .slice(sliceFrom, sliceFrom + 8)
                  .map(
                    (player: any, key: number) =>
                      player.profile.gridX < 0 && (
                        <PlayerComponent
                          player={player.profile}
                          label={0}
                          value={0}
                          color={""}
                          onPlayerDrag={(index) => setCurrentPlayer(index)}
                          onPlayerDrop={(player) => updatePlayers(player, true)}
                          onClick={() => mutePlayer(player.profile)}
                          key={key}
                        >
                          <AudioPlayerComponent
                            audios={player.audioRecordingData}
                            currentTime={currentTime}
                            isPlaying={isPlaying}
                            isMuted={player.isMuted}
                          />
                        </PlayerComponent>
                      )
                  )}
              </div>
              {getReplacementPlayers().length > 8 && (
                <ReactSVG
                  src="/icons/arrow-down.svg"
                  style={{
                    transform: "rotate(270deg)",
                    opacity:
                      sliceFrom === getReplacementPlayers().length - 4
                        ? 0.3
                        : 1,
                  }}
                  onClick={() =>
                    sliceFrom < getReplacementPlayers().length - 8 &&
                    setSliceFrom(sliceFrom + 8)
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
};
