import { ISuggestions } from "../types/modules/suggestions";

export const suggestionsData = (): ISuggestions => ({
  header: "Coaching suggestions",
  elements: [
    {
      header: "Increase speech time with defense",
      subElements: [
        { value: "10", description: "Defense" },
        { value: "45", description: "Midfield" },
        { value: "50", description: "Attack" },
      ],
    },
    { header: "Decrease generic interactions", subElements: [] },
    {
      header: "Increase avg. interaction time",
      subElements: [
        { value: "04 sec", description: "your avg." },
        { value: "10 sec", description: "recommended" },
      ],
    },
  ],
});
