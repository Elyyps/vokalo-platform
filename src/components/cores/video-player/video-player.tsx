import React from "react";
import ReactPlayer from "react-player/lazy";
import style from "./video-player.module.scss";
import Dropzone from "react-dropzone";
import { ReactSVG } from "react-svg";
import { LoaderComponent } from "../loader/loader";

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
  const [isLoaded, setIsLoaded] = React.useState(false);
  // const configuration = {
  //   file: {
  //     // attributes: {
  //     //   crossOrigin: "true",
  //     // },
  //     forceVideo: true,
  //     forceAudio: true,
  //   },
  // };

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
      {props.src ? (
        <ReactPlayer
          ref={playerRef}
          url={props.src}
          //config={configuration}
          width="100%"
          height="100%"
          autoPlay
          controls={props.hasControl}
          onReady={onReady}
          onPlay={() => props.onClick(true)}
          onPause={() => props.onClick(false)}
          onProgress={() => props.onChange(playerRef.current.player.prevPlayed)}
          // onError={(e) => console.error("onError", e)}
        />
      ) : (
        <div className={`${style["video-player-file"]} widget-container`}>
          <Dropzone onDrop={props.onUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <ReactSVG src="/icons/upload.svg" />
                <b>Select a file or drag and drop here</b>
                <input {...getInputProps()} />
                <p>MOV, MP4 or AVI file size no more than 3GB</p>
                <button>select file</button>
              </div>
            )}
          </Dropzone>
        </div>
      )}
    </div>
  );
};
