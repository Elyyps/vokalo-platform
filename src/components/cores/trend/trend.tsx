import React from "react";
import { ReactSVG } from "react-svg";
import style from "./trend.module.scss";

interface ITrendComponent {
  trendDirection?: "NEUTRAL" | "POSITIVE" | "NEGATIVE";
  trendLabel?: number;
}
export const TrendComponent = (props: ITrendComponent) => {
  return (
    <div className={style["trend"]}>
      <span className={style[`trend-${props.trendDirection}`]}>
        <ReactSVG
          src={
            props.trendDirection !== "NEUTRAL" ? "/icons/arrow-down.svg" : "-"
          }
        />
        {props.trendLabel ? Math.abs(props.trendLabel) + "%" : ""}
      </span>
    </div>
  );
};
