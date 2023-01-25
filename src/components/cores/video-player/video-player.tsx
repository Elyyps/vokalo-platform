import React from "react";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import style from "./video-player.module.scss";
import Dropzone from "react-dropzone";
import { ReactSVG } from "react-svg";
import { ButtonComponent } from "../button/button";
import ReactPlayer from "react-player";

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
  const [path, setPath] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  const maxSize = 5368709120;
  const params = [{ width: 500, height: 300, q: 20 }];
  const onReady = React.useCallback(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      if (props.startAt) {
        playerRef.current.seekTo(props.startAt, "seconds");
      }
    }
  }, []);
  const vid =
    "/FC5N07/sessions/23648327-cf2c-4e69-9e98-217100c553ca/video/session.mp4";

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setPath(vid);
  //     setIsLoaded(true);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className={style["video-player"]}>
      {props.src ? (
        // <IKContext
        //   urlEndpoint="https://ik.imagekit.io/nnpd6k7xo"
        //   publicKey="public_zlbXp1HFaAmANYlw+NUhsRknzPU="
        //   transformationPosition="path"
        //   authenticationEndpoint="s3://vokalo-prod/clubs"
        // >
        //   <IKVideo
        //     ref={playerRef}
        //     path={vid}
        //     transformation={params}
        //     controls
        //     muted
        //     onPlay={() => props.onClick(true)}
        //     onPause={() => props.onClick(false)}
        //     onProgress={(e: any) => props.onChange(e.target.currentTime)}
        //     onWaiting={() => props.onClick(false)}
        //     onPlaying={() => props.onClick(true)}
        //   />
        // </IKContext>
        <ReactPlayer
          ref={playerRef}
          url={props.src}
          muted
          width="100%"
          height="100%"
          controls={props.hasControl}
          onReady={onReady}
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
