type IContent = {
  value: string;
  description: string;
};
type IPart = {
  header: string;
  subElements: IContent[];
};
export type ISuggestions = {
  header: string;
  elements: IPart[];
};
