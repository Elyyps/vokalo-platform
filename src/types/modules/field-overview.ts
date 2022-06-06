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
};
export type IFieldOverview = {
  gameData?: IGameData;
  players: IPlayer[];
  dataSets: IDataSets[];
  colors: string[];
};
