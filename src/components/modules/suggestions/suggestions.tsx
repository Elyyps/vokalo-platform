import { ISuggestions } from "../../../types/modules/suggestions";
import style from "./suggestions.module.scss";
interface ISuggestionComponent {
  suggestions: ISuggestions;
}
export const SuggestionsComponent = ({ suggestions }: ISuggestionComponent) => {
  return (
    <div className={` ${style["suggestions"]} widget-container `}>
      <h6>{suggestions.title}</h6>
      <div className={style["suggestions-contents"]}>
        <div className={style["suggestions-part-1"]}>
          <h4>{suggestions.parts[0].title}</h4>
          <div>
            {suggestions.parts[0].content.map((item, key) => (
              <div key={key}>
                <span>{item.value}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className={style["suggestions-part-2"]}>
          <h4>{suggestions.parts[1].title}</h4>
          <div>
            <span>Generic</span>
            <div></div>
          </div>
        </div>
        <div className={style["suggestions-part-3"]}>
          <h4>{suggestions.parts[2].title}</h4>
          <div>
            {suggestions.parts[2].content.map((item, key) => (
              <div key={key}>
                <span>{item.value}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
