import React from "react";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player/lazy";

import style from "./audio-player.module.scss";

interface IAudioPlayerComponent {
  isMuted: boolean;
  name: string;
  audio: any;
  startsAt: number;
  endsAt: number;
  onClick: () => void;
}
export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  const playerRef = React.useRef<any>();
  React.useEffect(() => {
    if (props.startsAt && playerRef.current) {
      playerRef.current.currentTime = props.startsAt;
    }
  }, [props.startsAt]);
  return (
    <div
      className={`${style["audio-player"]} ${
        !props.isMuted && style["audio-player-active"]
      } `}
      onClick={props.onClick}
    >
      {props.name}({props.startsAt})
      {props.audio.length > 0 && (
        <div>
          <img src="/img/audio.png" />
          <audio ref={playerRef} muted={props.isMuted} src={props.audio} />
        </div>
      )}
    </div>
  );
};
