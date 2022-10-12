import React from "react";
import style from "./modal.module.scss";
import { TypeComponent } from "../type/type";
import { ButtonComponent } from "../button/button";
interface IModalComponent {
  onClick: (title: string, type: "match" | "training") => void;
  onClose: () => void;
  title: string;
  type: "match" | "training";
}
export const ModalComponent = (props: IModalComponent) => {
  const wrapperRef = React.createRef<HTMLDivElement>();
  const [title, setTitle] = React.useState<string>(props.title);
  const [type, setType] = React.useState<"match" | "training">(props.type);
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        props.onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className={style["modal"]}>
      <div className={style["modal-content"]} ref={wrapperRef}>
        <div className={style["modal-top"]}>
          <h3>Edit session title:</h3>
          <b onClick={props.onClose}>x</b>
        </div>
        <div>
          <div>
            <label htmlFor="">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Type:</label>
            <div>
              <TypeComponent
                type={"match"}
                isActive={type.toLowerCase() === "match"}
                onClick={() => setType("match")}
              />
              <TypeComponent
                type={"training"}
                isActive={type.toLowerCase() === "training"}
                onClick={() => setType("training")}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "24px" }}>
          <ButtonComponent
            title="Confirm"
            variant="secondary"
            onClick={() => props.onClick(title, type)}
          />
        </div>
      </div>
    </div>
  );
};
