import React from "react";
import style from "./audio-player.module.scss";

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
}
export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  const playerRef = React.useRef<any>();
  const [audio, setAudio] = React.useState<any>();
  const getAudio = () => {
    const result = props.audios.find(
      (item: any) =>
        props.currentTime >= item.startOffset &&
        props.currentTime <= item.endOffset
    );
    setAudio(result);
  };

  React.useEffect(() => {
    if (playerRef.current) {
      if (props.isPlaying) {
        playerRef.current
          .play()
          .then(props.isPlaying)
          .catch(() => "");
      } else {
        playerRef.current.pause();
      }
    }
  }, [props.isPlaying]);

  React.useEffect(() => {
    getAudio();
    if (props.currentTime && playerRef.current && audio) {
      playerRef.current.currentTime =
        (props.currentTime - audio?.startOffset) / 1000;
    }
  }, [props.currentTime]);
  return (
    <div
      className={`${style["audio-player"]}
       ${!props.isMuted && style["audio-player-active"]}`}
    >
      {audio && (
        <div>
          <img src="/img/audio.png" />
          <audio ref={playerRef} src={audio.path} muted={props.isMuted} />
        </div>
      )}
    </div>
  );
};
