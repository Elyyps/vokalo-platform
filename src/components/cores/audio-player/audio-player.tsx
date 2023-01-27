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
  audios: IAudioComponent[];
}
export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  const playerRef = React.useRef<any>();
  //const [audio, setAudio] = React.useState<IAudioComponent>();
  const [isMuted, setIsMuted] = React.useState<boolean>(true);
  const getAudio = () => {
    const result = props.audios.find(
      (item: any) =>
        props.currentTime >= item.startOffset &&
        props.currentTime <= item.endOffset
    );
    return result && result;
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
      if (props.isPlaying) {
        playerRef.current
          .play()
          .then(props.isPlaying)
          .catch(() => console.log(""));
      } else {
        playerRef.current.pause();
      }
    }
  }, [props.isPlaying, newAudio]);
  React.useEffect(() => {
    if (props.currentTime && playerRef.current && newAudio) {
      playerRef.current.currentTime =
        (props.currentTime - newAudio?.startOffset) / 1000;
    }
  }, [props.currentTime]);
  return (
    <div
      className={`${style["audio-player"]}
      ${!isMuted && style["audio-player-active"]}
      `}
      onClick={() => setIsMuted(!isMuted)}
    >
      {newAudio && newAudio.path && (
        <div>
          <img src="/img/audio.png" />
          <audio ref={playerRef} muted={isMuted} src={newAudio.path} />
        </div>
      )}
    </div>
  );
};
