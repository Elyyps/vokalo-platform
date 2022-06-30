export type IPlayer = {
  firstName: string;
  lastName: string;
  id: number;
  gridX: number;
  gridY: number;
  ghost: boolean;
  isReplaced?: boolean;
};
