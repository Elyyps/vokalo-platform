import { IMostWords } from "../types/modules/most-words";

export const mostWordsData = (): IMostWords => ({
  title: "3 most said words",
  words: [
    {
      label: "Good",
      repetition: 578,
      trend: { trendLabel: 12, trendDirection: "POSITIVE" },
    },
    {
      label: "Bad",
      repetition: 30,
      trend: { trendLabel: 5, trendDirection: "NEGATIVE" },
    },
    {
      label: "Super",
      repetition: 150,
      trend: { trendLabel: 25, trendDirection: "POSITIVE" },
    },
  ],
});
