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
  coachNumber?: number;
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
      if (playerRef.current) {
        playerRef.current.currentTime =
          (props.currentTime - newAudio?.startOffset) / 1000;
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
      style={{ borderRadius: props.coachNumber ? "5px" : "50%" }}
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
            props.coachNumber ? (
              <span
                className={style["audio-player-coach"]}
                style={{ opacity: props.isMuted ? "0.5" : "1" }}
              >
                {props.coachNumber}
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
          {!props.coachNumber && (
            <AudioVisualizer audio={playerRef} isMuted={props.isMuted} />
          )}
        </div>
      )}
    </div>
  );
};
