import React from "react";
import style from "./video-player.module.scss";
import Dropzone from "react-dropzone";
import { ReactSVG } from "react-svg";

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
  const maxSize = 5368709120;

  return (
    <div className={style["video-player"]}>
      {props.src ? (
        <video
          ref={playerRef}
          width="100%"
          height="100%"
          controls
          muted
          onPlay={() => props.onClick(true)}
          onPause={() => props.onClick(false)}
          onTimeUpdate={(e: any) => props.onChange(e.target.currentTime)}
          onWaiting={() => props.onClick(false)}
          onPlaying={() => props.onClick(true)}
          preload="auto"
        >
          <source src={props.src} />
        </video>
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
