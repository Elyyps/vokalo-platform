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
      <h6>{mostWords.title}</h6>
      <div className={style["most-words-list"]}>
        {mostWords.words.map((word, key) => (
          <div key={key}>
            <h3>{word.label}</h3>
            <div>
              <small>{word.repetition} times</small>
              <TrendComponent {...word.trend} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
