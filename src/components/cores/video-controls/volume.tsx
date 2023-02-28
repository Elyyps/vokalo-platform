import React from "react";
import { Range } from "react-range";

import style from "./video-controls.module.scss";
import { DropdownComponent } from "../dropdown/dropdown";
interface IVideoVolumeComponent {
  onChange: (time: number) => void;
}
export const VolumeComponent = (props: IVideoVolumeComponent) => {
  const [value, setValue] = React.useState<number>(0);
  return (
    <div className={style["video-controls-volume"]}>
      <DropdownComponent
        variant="transparent"
        icon={`/icons/${value === 0 ? "volume-muted.svg" : "volume-up.svg"}`}
      >
        <div className={style["video-controls-volume-content"]}>
          <Range
            step={0.1}
            min={0}
            max={1}
            values={[value]}
            onChange={(values) => {
              values && setValue(values[0]);
              values && props.onChange(values[0]);
            }}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "80px",
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
                  backgroundColor: "#333333",
                }}
              />
            )}
          />
        </div>
      </DropdownComponent>
    </div>
  );
};
