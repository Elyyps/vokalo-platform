type IContent = {
  value: string;
  progress?: number;
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
