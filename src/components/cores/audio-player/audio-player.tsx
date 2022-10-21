import React from "react";
import { LoaderComponent } from "../loader/loader";
import style from "./audio-player.module.scss";

interface IAudioComponent {
  path: string;
  startOffset: number;
  endOffset: number;
}
interface IAudioPlayerComponent {
  isPlaying: boolean;
  currentTime: number;
  name: string;
  audios: IAudioComponent[];
}
export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  const playerRef = React.useRef<any>();
  //const [audio, setAudio] = React.useState<IAudioComponent>();
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const getAudio = () => {
    const result = props.audios.find(
      (item: any) =>
        props.currentTime >= item.startOffset &&
        props.currentTime <= item.endOffset
    );
    return result ? result : props.audios[0];
  };
  // React.useEffect(() => {
  //   setAudio(getAudio());
  // }, []);
  // React.useEffect(() => {
  //   if (getAudio()?.path !== audio?.path) {
  //     setAudio(getAudio());
  //   }
  // }, [props.currentTime]);
  const newAudio = React.useMemo(() => {
    return getAudio();
  }, [props.currentTime]);
  React.useEffect(() => {
    if (playerRef.current) {
      props.isPlaying ? playerRef.current.play() : playerRef.current.pause();
    }
  }, [props.isPlaying, newAudio]);
  React.useEffect(() => {
    if (props.currentTime && playerRef.current) {
      playerRef.current.currentTime = props.currentTime / 1000;
    }
  }, [props.currentTime]);
  return (
    <div
      className={`${style["audio-player"]}
      ${!isMuted && newAudio && newAudio.path && style["audio-player-active"]}
      `}
      onClick={() => props.isPlaying && setIsMuted(!isMuted)}
    >
      {newAudio && (
        <span>
          {props.name}
          {/* {newAudio.startOffset ? (
            <small>({newAudio.startOffset / 1000})</small>
          ) : (
            ""
          )} */}
        </span>
      )}
      {newAudio && newAudio.path && (
        <div>
          <img src="/img/audio.png" />
          <audio ref={playerRef} muted={isMuted} src={newAudio.path} />
        </div>
      )}
    </div>
  );
};
