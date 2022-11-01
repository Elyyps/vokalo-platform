import React from "react";
import style from "./lightbox.module.scss";
import ReactDOM from "react-dom";
import { ReactSVG } from "react-svg";
export interface ILightBoxComponentProps {
  children: any;
  isLightBoxOpen?: boolean;
  setLightBoxOpen: (value: boolean) => void;
}
export const LightBoxComponent = (props: ILightBoxComponentProps) => {
  const onKeyDown = ({ key }: KeyboardEvent) => {
    if (key === "Escape") props.setLightBoxOpen(false);
  };
  const modalRef = React.createRef<HTMLDivElement>();
  const onClickAway = (e: any) => {
    if (
      modalRef.current &&
      modalRef.current &&
      modalRef.current.contains(e.target)
    )
      return;
    props.setLightBoxOpen(false);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (!!window) {
        window.removeEventListener("keydown", onKeyDown);
      }
    };
  }, []);

  React.useEffect(() => {
    if (props.isLightBoxOpen) {
      if (typeof document !== "undefined") {
        document.documentElement.style.overflow = "hidden";
      }
    }

    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.style.overflow = "auto";
      }
    };
  }, [props.isLightBoxOpen]);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <React.Fragment>
          <div
            role="button"
            onClick={(e): any => {
              onClickAway(e);
            }}
            className={`${style["modal"]} ${
              style[props.isLightBoxOpen ? "modal-open" : ""]
            } `}
          >
            <span
              role={"button"}
              className={style["close"]}
              onClick={() => props.setLightBoxOpen(false)}
            >
              X
            </span>
          </div>
          <div
            className={`${style["modal__center-content"]} ${
              style[props.isLightBoxOpen ? "modal-open" : ""]
            } `}
            ref={modalRef}
          >
            {props.children}
          </div>
        </React.Fragment>,
        document.body
      )}
    </React.Fragment>
  );
};
