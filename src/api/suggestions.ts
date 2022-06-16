import { ISuggestions } from "../types/modules/suggestions";

export const suggestionsData = (): ISuggestions => ({
  title: "Coaching suggestions",
  parts: [
    {
      title: "Increase speech time with defense",
      content: [
        { value: "10", label: "Defense" },
        { value: "45", label: "Midfield" },
        { value: "50", label: "Attack" },
      ],
    },
    { title: "Decrease generic interactions", content: [] },
    {
      title: "Increase avg. interaction time",
      content: [
        { value: "04 sec", label: "your avg." },
        { value: "10 sec", label: "recommended" },
      ],
    },
  ],
});
