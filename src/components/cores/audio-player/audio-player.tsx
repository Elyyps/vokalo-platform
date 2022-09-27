import React from "react";
import ReactAudioPlayer from "react-audio-player";
import style from "./audio-player.module.scss";

interface IAudioPlayerComponent {
  isMuted: boolean;
  hasAudio: boolean;
  name: string;
  audio: any;
  onClick: () => void;
}
export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  return (
    <div
      className={`${style["audio-player"]} ${
        !props.isMuted && style["audio-player-active"]
      } `}
      onClick={props.onClick}
    >
      {props.name}
      {props.hasAudio && (
        <div>
          <img src="/img/audio.png" />
          <ReactAudioPlayer muted={props.isMuted} autoPlay src={props.audio} />
        </div>
      )}
    </div>
  );
};
