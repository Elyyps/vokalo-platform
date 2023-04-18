export type IProfile = {
  firstName: string;
  lastName: string;
  birthdate: Date;
  phone: string;
  number: number;
  initials: string;
  id: string;
  teamsId: string[];
  positions: string[];
  role: "coach" | "player";
  languages: string[];
};
