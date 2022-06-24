export type IUser = {
  admin: boolean;
  club: any;
  firstName: string;
  lastName: string;
  role: "ATHLETE" | "COACH";
  id: string;
};
