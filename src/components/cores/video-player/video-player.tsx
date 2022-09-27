import React from "react";
import ReactPlayer from "react-player/lazy";
import style from "./video-player.module.scss";
interface IVideoPlayerComponent {
  src: string;
  startAt?: number;
  hasControl?: boolean;
  onClick: (playing: boolean) => void;
}
export const VideoPlayerComponent = (props: IVideoPlayerComponent) => {
  const playerRef = React.useRef<any>();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onReady = React.useCallback(() => {
    if (!isLoaded) {
      if (props.startAt) {
        playerRef.current.seekTo(props.startAt, "seconds");
      }
      setIsLoaded(true);
    }
  }, [isLoaded]);
  //   React.useEffect(() => {
  //     const timer = setTimeout(() => {
  //       onLoadedData();
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }, []);
  //   const onLoadedData = () => {
  //     console.log("here");
  //     setIsLoaded(true);
  //   };

  return (
    <div className={style["video-player"]}>
      <ReactPlayer
        ref={playerRef}
        url={props.src}
        width="100%"
        height="100%"
        controls={props.hasControl}
        onReady={onReady}
        onPlay={() => props.onClick(true)}
        onPause={() => props.onClick(false)}
        onError={(e) => console.error("onError", e)}
      />
    </div>
  );
};
