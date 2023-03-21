import React from "react";
import { ReactSVG } from "react-svg";
import style from "./audio-player.module.scss";
import AudioVisualizer from "./audio-visualizer";

interface IAudioComponent {
  path: string;
  startOffset: number;
  endOffset: number;
}
interface IAudioPlayerComponent {
  isPlaying: boolean;
  currentTime: number;
  isMuted?: boolean;
  audios: IAudioComponent[];
  isCoach?: boolean;
}
export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  const getAudio = () => {
    return props.audios.find(
      (item: any) =>
        props.currentTime >= item.startOffset &&
        props.currentTime <= item.endOffset
    );
  };
  const playerRef = React.useRef<any>();
  const [audio, setAudio] = React.useState<any>(getAudio());
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onVideoPlay = () => {
    if (props.isPlaying) {
      playerRef.current
        .play()
        .then(props.isPlaying)
        .catch(() => "");
    } else {
      playerRef.current.pause();
    }
  };
  const getUpdateTime = () => {
    const newAudio = getAudio();
    if (newAudio) {
      let startAt = newAudio?.startOffset >= 0 ? newAudio?.startOffset : 0;
      if (playerRef.current) {
        playerRef.current.currentTime = (props.currentTime - startAt) / 1000;
      }
      setAudio(newAudio);
    }
  };
  React.useEffect(() => {
    if (playerRef.current && isLoaded) {
      onVideoPlay();
    }
  }, [props.isPlaying, props.isMuted]);
  React.useEffect(() => {
    getUpdateTime();
  }, [props.currentTime, props.isMuted]);

  return (
    <div
      className={`${style["audio-player"]}
       ${!props.isMuted && style["audio-player-active"]}`}
      style={{ borderRadius: props.isCoach ? "5px" : "50%" }}
    >
      {audio && (
        <div>
          <audio
            ref={playerRef}
            src={audio.path}
            muted={props.isMuted}
            onLoadStart={() => setIsLoaded(false)}
            onCanPlay={() => setIsLoaded(true)}
            preload="auto"
            crossOrigin="anonymous"
          />
          {isLoaded ? (
            props.isCoach ? (
              <span
                className={style["audio-player-coach"]}
                style={{ opacity: props.isMuted ? "0.5" : "1" }}
              >
                Coach
                <ReactSVG src="/icons/volume-up.svg" />
              </span>
            ) : (
              <div className={style["audio-player-image"]}>
                {[...Array(8)].map((item, i) => (
                  <span key={i} className={style["audio-player-image-" + i]} />
                ))}
              </div>
            )
          ) : (
            <b>. . .</b>
          )}
          {!props.isCoach && (
            <AudioVisualizer audio={playerRef} isMuted={props.isMuted} />
          )}
        </div>
      )}
    </div>
  );
};
