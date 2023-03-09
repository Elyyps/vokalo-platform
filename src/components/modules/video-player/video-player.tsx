import React from "react";
import style from "./video-player.module.scss";
import Dropzone from "react-dropzone";
import { ReactSVG } from "react-svg";
import { VideoControlsComponent } from "../../cores/video-controls/video-controls";
import { LoaderComponent } from "../../cores/loader/loader";
import { ITag } from "../../../types/cores/tag";

interface IVideoPlayerComponent {
  src: string;
  startAt?: number;
  hasControl?: boolean;
  isPlaying?: boolean;
  tags: ITag[];
  playerRef: any;
  onClick: (playing: boolean) => void;
  onChange: (time: number) => void;
  onUpload: (files: any) => void;
}

export const VideoPlayerComponent = React.memo(
  (props: IVideoPlayerComponent) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const maxSize = 5368709120;
    React.useEffect(() => {
      //-   if (!props.isPlaying) playerRef.current.pause();
    }, [props.isPlaying]);
    return (
      <div className={style["video-player"]}>
        {props.src ? (
          <div className={style["video-player-container"]}>
            <div style={{ position: "relative" }}>
              <video
                src={props.src}
                ref={props.playerRef}
                width="100%"
                height="100%"
                onCanPlay={() => setIsLoading(false)}
                onPlay={() => props.onClick(true)}
                onPause={() => props.onClick(false)}
                onTimeUpdate={(e: any) => props.onChange(e.target.currentTime)}
                onWaiting={() => props.onClick(false)}
                onPlaying={() => props.onClick(true)}
                preload="auto"
                poster="/img/black.png"
              />
              <div className={style["video-player-button"]}>
                {isLoading ? (
                  <LoaderComponent />
                ) : (
                  props.playerRef.current.paused && (
                    <ReactSVG
                      src="/icons/play.svg"
                      onClick={() => props.playerRef.current.play()}
                    />
                  )
                )}
              </div>
            </div>
            <VideoControlsComponent
              tags={props.tags}
              audio={props.playerRef.current}
              onChange={(time) => (props.playerRef.current.currentTime = time)}
            />
          </div>
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
  }
);
