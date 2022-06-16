import { ReactSVG } from "react-svg";
import style from "./type.module.scss";
interface ITypeComponent {
  type: "match" | "practice";
}
export const TypeComponent = ({ type }: ITypeComponent) => {
  return (
    <span className={style["type"]}>
      <ReactSVG
        src={type === "practice" ? "/icons/practice.svg" : "/icons/match.svg"}
      />
      {type}
    </span>
  );
};
