import React from "react";
import style from "./video-player.module.scss";
import Dropzone from "react-dropzone";
import { ReactSVG } from "react-svg";
import ReactPlayer from "react-player";
import ReactHlsPlayer from "react-hls-player";

interface IVideoPlayerComponent {
  src: string;
  startAt?: number;
  hasControl?: boolean;
  onClick: (playing: boolean) => void;
  onChange: (time: number) => void;
  onUpload: (files: any) => void;
}
export const VideoPlayerComponent = (props: IVideoPlayerComponent) => {
  const playerRef = React.useRef<any>();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const maxSize = 5368709120;
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
      hello
      {props.src ? (
        <ReactHlsPlayer
          playerRef={playerRef}
          src={props.src}
          muted
          width="100%"
          height="100%"
          controls={props.hasControl}
          // onReady={onReady}
          onPlay={() => props.onClick(true)}
          onPause={() => props.onClick(false)}
          onProgress={() => props.onChange(playerRef.current.player.prevPlayed)}
          onWaiting={() => props.onClick(false)}
          onPlaying={() => props.onClick(true)}
        />
      ) : (
        <div className={`${style["video-player-file"]} widget-container`}>
          <Dropzone onDrop={props.onUpload} maxSize={maxSize}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <ReactSVG src="/icons/upload.svg" />
                <b>Select a file or drag and drop here</b>
                <input {...getInputProps()} />
                <p>MOV, MP4 or AVI file size no more than 5GB</p>
                <button>select file</button>
              </div>
            )}
          </Dropzone>
        </div>
      )}
    </div>
  );
};
