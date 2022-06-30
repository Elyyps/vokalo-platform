import { IButton } from "../cores/button";
import { IPlayer } from "../cores/player";
type IGameData = {
  startMinute: number;
  endMinute: number;
  halftime: number;
  from: number;
  to: number;
};
type IDataSets = {
  button: IButton;
  data: any[];
  name?: string;
};
export type IFieldOverview = {
  gameData?: IGameData;
  formations: string[];
  profiles: IPlayer[];
  dataSets: IDataSets[];
  colors: string[];
};
