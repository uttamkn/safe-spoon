export type UserT = {
  username: string;
  password: string;
  email: string;
  allergies: string[];
  gender: "male" | "female" | "";
  age: number;
  weight: number;
  diseases: string[];
};
