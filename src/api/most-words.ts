import { IMostWords } from "../types/modules/most-words";

export const mostWordsData = (): IMostWords => ({
  header: "3 most said words",
  elements: [
    {
      label: "Good",
      subHeader: "578 times",
      trendLabel: 12,
      trendDirection: "POSITIVE",
    },
    {
      label: "Bad",
      subHeader: "30 times",
      trendLabel: 5,
      trendDirection: "NEGATIVE",
    },
    {
      label: "Super",
      subHeader: "150 times",
      trendLabel: 25,
      trendDirection: "POSITIVE",
    },
  ],
});
