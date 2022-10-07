import { ReactSVG } from "react-svg";
import style from "./type.module.scss";
interface ITypeComponent {
  type: "match" | "training";
  isActive?: boolean;
  onClick?: () => void;
}
export const TypeComponent = ({ type, isActive, onClick }: ITypeComponent) => {
  return (
    <span
      className={` ${style["type"]} ${style[isActive ? "type-active" : ""]}  `}
      onClick={onClick}
    >
      <ReactSVG
        src={
          type.toLocaleLowerCase() !== "match"
            ? "/icons/practice.svg"
            : "/icons/match.svg"
        }
      />
      {type}
    </span>
  );
};
