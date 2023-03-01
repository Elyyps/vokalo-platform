import React from "react";
import { ReactSVG } from "react-svg";
import { Range } from "react-range";
import style from "./video-controls.module.scss";
import { converToMinutes } from "../../../utils/convertTime";
import { VolumeComponent } from "./volume";

interface IVideoControlsComponent {
  audio: any;
  onChange: (time: number) => void;
}
export const VideoControlsComponent = (props: IVideoControlsComponent) => {
  const openFullscreen = () => {
    if (props.audio.requestFullscreen) {
      props.audio.requestFullscreen();
    } else if (props.audio.webkitRequestFullscreen) {
      props.audio.webkitRequestFullscreen();
    }
  };

  React.useEffect(() => {
    props.audio && props.audio.load();
    props.audio && (props.audio.volume = 0);
  }, [props.audio]);

  return props.audio ? (
    <div className={style["video-controls"]}>
      <div className={style["video-controls-top"]}>
        <small>
          {props.audio ? converToMinutes(props.audio.currentTime * 1000) : "-"}
        </small>
        <Range
          min={0}
          max={props.audio.duration}
          values={
            props.audio && props.audio.currentTime
              ? [props.audio.currentTime]
              : [0]
          }
          onChange={(values) => values && props.onChange(values[0])}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                borderRadius: "5px",
                backgroundColor: "#c4c4c4",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
              }}
            />
          )}
        />
        <small>
          {props.audio ? converToMinutes(props.audio.duration * 1000) : "-"}
        </small>
      </div>
      <div className={style["video-controls-bottom"]}>
        <div>
          <span
            onClick={() =>
              (props.audio.currentTime = props.audio.currentTime - 10)
            }
          >
            <ReactSVG src="/icons/back.svg" />
          </span>
          <span
            className={style["big-icon"]}
            onClick={() =>
              props.audio.paused ? props.audio.play() : props.audio.pause()
            }
          >
            <ReactSVG
              src={`/icons/${
                props.audio && !props.audio.paused ? "pause.svg" : "play.svg"
              }`}
            />
          </span>
          <span
            onClick={() =>
              (props.audio.currentTime = props.audio.currentTime + 10)
            }
          >
            <ReactSVG src="/icons/forward.svg" />
          </span>
          <span
            style={{ marginLeft: "12px" }}
            onClick={() =>
              props.audio.playbackRate === 1
                ? (props.audio.playbackRate = 2)
                : (props.audio.playbackRate = 1)
            }
          >
            <b>{props.audio && props.audio.playbackRate + "X"}</b>
          </span>
        </div>
        <div>
          <VolumeComponent onChange={(e) => (props.audio.volume = e)} />
          <span onClick={openFullscreen}>
            <ReactSVG src="/icons/fullscreen.svg" />
          </span>
        </div>
      </div>
    </div>
  ) : (
    <span></span>
  );
};
