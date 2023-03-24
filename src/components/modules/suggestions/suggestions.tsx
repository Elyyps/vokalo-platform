import { ISuggestions } from "../../../types/modules/suggestions";
import style from "./suggestions.module.scss";

interface ISuggestionComponent {
  suggestions: ISuggestions;
}
export const SuggestionsComponent = ({ suggestions }: ISuggestionComponent) => {
  return (
    <div className={` ${style["suggestions"]} widget-container `}>
      <h6>{suggestions.header}</h6>
      <div className={style["suggestions-contents"]}>
        <div className={style["suggestions-part-1"]}>
          <h4>{suggestions.elements[0].header}</h4>
          <div>
            {suggestions.elements[0].subElements.map((item, key) => (
              <div key={key}>
                <span>{item.value}</span>
                {item.description}
              </div>
            ))}
          </div>
        </div>
        <div className={style["suggestions-part-2"]}>
          <h4>{suggestions.elements[1].header}</h4>
          <div>
            <span>Generic</span>
            <div>
              <div
                style={{
                  width: `${
                    suggestions.elements[1].subElements[0].progress &&
                    suggestions.elements[1].subElements[0].progress * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
        <div className={style["suggestions-part-3"]}>
          <h4>{suggestions.elements[2].header}</h4>
          <div>
            {suggestions.elements[2].subElements.map((item, key) => (
              <div key={key}>
                <span>{item.value}</span>
                {item.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
