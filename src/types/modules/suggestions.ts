type IContent = {
  value: string;
  label: string;
};
type IPart = {
  title: string;
  content: IContent[];
};
export type ISuggestions = {
  title: string;
  parts: IPart[];
};
