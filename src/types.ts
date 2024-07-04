export type User = {
  id: number;
  username: string;
  allergies: string[];
  gender: string;
  age: string;
  weight: string;
  anyDiseases: string;
};

export type UserSignIn = {
  username: string;
  password: string;
};

export type UserSignUp = {
  username: string;
  password: string;
  confirm_password: string;
  allergies: string[];
  gender: string;
  age: string;
  weight: string;
  anyDiseases: string;
};
