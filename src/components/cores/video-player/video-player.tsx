import React from "react";
import ReactPlayer from "react-player/lazy";
import style from "./video-player.module.scss";

interface IVideoPlayerComponent {
  src: string;
  startAt?: number;
  hasControl?: boolean;
  onClick: (playing: boolean) => void;
  onChange: (time: number) => void;
}
export const VideoPlayerComponent = (props: IVideoPlayerComponent) => {
  const playerRef = React.useRef<any>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const configuration = {
    file: {
      // attributes: {
      //   crossOrigin: "true",
      // },
      forceVideo: true,
      forceAudio: true,
    },
  };
  const onReady = React.useCallback(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      if (props.startAt) {
        playerRef.current.seekTo(props.startAt, "seconds");
      }
    }
  }, []);

  return (
    <div className={style["video-player"]}>
      <ReactPlayer
        ref={playerRef}
        url={props.src}
        config={configuration}
        width="100%"
        height="100%"
        autoPlay
        controls={props.hasControl}
        onReady={onReady}
        onPlay={() => props.onClick(true)}
        onPause={() => props.onClick(false)}
        onBufferEnd={() =>
          props.onChange(playerRef.current.player.prevPlayed.toFixed(2))
        }
        // onError={(e) => console.error("onError", e)}
      />
    </div>
  );
};
