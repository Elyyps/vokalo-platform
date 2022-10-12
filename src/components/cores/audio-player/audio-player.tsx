import React from "react";
import style from "./audio-player.module.scss";

interface IAudioPlayerComponent {
  isMuted: boolean;
  name: string;
  audio: any;
  startsAt: number;
  endsAt: number;
  onClick: () => void;
  isPlaying: boolean;
}
export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  const playerRef = React.useRef<any>();
  React.useEffect(() => {
    if (props.startsAt && playerRef.current) {
      playerRef.current.currentTime = props.startsAt;
    }
  }, [props.startsAt]);
  React.useEffect(() => {
    if (playerRef.current) {
      props.isPlaying ? playerRef.current.play() : playerRef.current.pause();
    }
  }, [props.isPlaying]);
  return (
    <div
      className={`${style["audio-player"]} ${
        !props.isMuted && style["audio-player-active"]
      } `}
      onClick={props.onClick}
    >
      <span>
        {props.name} <small>({props.startsAt})</small>
      </span>
      {props.audio.length > 0 && (
        <div>
          <img src="/img/audio.png" />
          <audio ref={playerRef} muted={props.isMuted} src={props.audio} />
        </div>
      )}
    </div>
  );
};
