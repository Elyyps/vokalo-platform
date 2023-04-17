export type IProfile = {
  firstName: string;
  lastName: string;
  birthdate: Date;
  id: number;
  teamsId: string[];
  positions: string[];
  role: "coach" | "player";
};
