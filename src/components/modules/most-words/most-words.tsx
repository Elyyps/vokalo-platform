import React from "react";
import { IMostWords } from "../../../types/modules/most-words";
import { TrendComponent } from "../../cores/trend/trend";
import style from "./most-words.module.scss";

interface IMostWordsComponent {
  mostWords: IMostWords;
}
export const MostWordsComponent = ({ mostWords }: IMostWordsComponent) => {
  return (
    <div className={`${style["most-words"]} widget-container`}>
      <h6>{mostWords.header}</h6>
      <div className={style["most-words-list"]}>
        {mostWords.elements.map((word, key) => (
          <div key={key}>
            <h3>{word.label}</h3>
            <div>
              <small>{word.subHeader} </small>
              <TrendComponent
                trendLabel={word.trendLabel}
                trendDirection={word.trendDirection}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
