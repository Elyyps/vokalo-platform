import React from "react";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import ReactPlayer from "react-player/lazy";
import style from "./video-player.module.scss";
import Dropzone from "react-dropzone";
import { ReactSVG } from "react-svg";
import { useParams } from "react-router-dom";
import { ButtonComponent } from "../button/button";

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
  const [path, setPath] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  const maxSize = 5368709120;
  const params = [{ width: 500, height: 350 }];
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

  return (
    <div className={style["video-player"]}>
      {props.src ? (
        <IKContext
          urlEndpoint="https://ik.imagekit.io/nnpd6k7xo"
          publicKey="public_zlbXp1HFaAmANYlw+NUhsRknzPU="
          transformationPosition="path"
          authenticationEndpoint="s3://vokalo-prod/clubs"
        >
          <IKVideo
            ref={playerRef}
            path={vid}
            transformation={params}
            controls
            muted
            onPlay={() => props.onClick(true)}
            onPause={() => props.onClick(false)}
            onProgress={(e: any) => props.onChange(e.target.currentTime)}
          />
        </IKContext>
      ) : (
        <div className={`${style["video-player-file"]} widget-container`}>
          {/* <ReactPlayer
            ref={playerRef}
            url={
              "https://vokalo-prod.s3.eu-north-1.amazonaws.com/clubs" +
              vid +
              "?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCmV1LW5vcnRoLTEiRzBFAiBQnDq5GWzX%2B2w6gFVB5gNDTLszLywp4m2o2QnAxv%2F3gQIhANsTfmA%2BOP4Fv8%2FFlQ5HXFcoNUnXXEUdUTLT6nP6vT2yKvcDCNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMMDY1MTEwMDQwNzA3IgydE5ATSJWTUhiujugqywMybVV3UwU1gbz8WRzTKgs2FRYekGw1%2FrCw%2FdBX5%2BfibNAatDTSc5ABzs3CwcOlIfWQhrJ9SiFCYWcuI2E%2FciRoMVdclqazGx944W4RILdM6bH8%2FSvKlLVwMxf0qm3pm3VBucIEq6%2FIZ2vOP0QUCBL3IXwhjqcGT0xKVGPj1opUAUd56v97F9qMSanuuiIbQsvGdHkDOLVEHpGrAHHJX36POBgbu4h0c0GhK75XAo9vv%2B9Ta%2BJrShtlKBJa2gVPQavJzs5kgoxaKorIxjyYNweorwzfnM3N%2F5zEiwohaOaNqm4hmj1mSLhqctihk6YJHFr%2FoKnQet9%2FrvSiYd0XF%2F7RiRerAchodMTEdM3zLHWKxho3HKBNP72glZu9RRaRrHxFvnyXYC8mWANitgN5avpbzOuMS6wiqyDWuTCORdpLSfjqZE%2BIv4G11rCeZUDL0h5DY7V3ZFjAxhAI%2FoBimt3ENNOmWXr82KCoNgkJ2y5v%2FeWs8v1fJiv6WhxXsZ4M%2FnG5MF4lJr%2FcjmMzZtTlg4foQ1e3%2B%2FnhTg5B7lbZpNzzmCqdHmlRpynBktFN68A6t1%2BMimzqEg%2Bz6ALi9pEmZjYyYAd5%2B8XHwqyO9JQwj6G6ngY6pQF2oLsqeHNkdnmN9AEsRU10Qpg9rn6oET%2Fea1HvmTv%2FMqL%2BnOAfId7HbsaAy1fJhhUSan97IYF8CwCAEbMQfZRmSfW%2B5Isf975FtxsJmf1ETDth3MbSGW3ZtHSE5RfUx4i6jzZDoQeQNMf5cc0OzL9Dz5e3ncwCOTrQZ5WE3ywHCxKx5%2FvboD06zRn3%2B85timoGF8gxZGpZCZmkPCrhy9swhlL%2Bs3A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230123T153019Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=ASIAQ6KG4MCBZP345MNS%2F20230123%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=5f41e93b16f2d186e33c45cb374d75d1d52059b95c70ec5582303b9492351815"
            }
            muted
            width="100%"
            height="100%"
            controls={props.hasControl}
            onReady={onReady}
            onPlay={() => props.onClick(true)}
            onPause={() => props.onClick(false)}
            onProgress={() =>
              props.onChange(playerRef.current.player.prevPlayed)
            }
          /> */}
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
