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
  isMuted?: boolean;
  audios: IAudioComponent[];
}

export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  const playerRef = React.useRef<any>(null);
  const [audio, setAudio] = React.useState<any>();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const getAudio = () => {
    return props.audios.find(
      (item: any) =>
        props.currentTime >= item.startOffset &&
        props.currentTime <= item.endOffset
    );
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
  }, [props]);

  React.useEffect(() => {
    const newAudio = getAudio();
    setAudio(newAudio);
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
          <audio
            ref={playerRef}
            src={audio.path}
            muted={props.isMuted}
            onLoadStart={() => setIsLoaded(false)}
            onCanPlay={() => setIsLoaded(true)}
          />
          {isLoaded ? <img src="/img/audio.png" /> : <b>. . .</b>}
        </div>
      )}
    </div>
  );
};
