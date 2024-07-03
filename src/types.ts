export type User = {
  id: number;
  username: string;
};

export type UserSignIn = {
  username: string;
  password: string;
};

export type UserSignUp = {
  username: string;
  password: string;
  confirm_password: string;
  allergies: string;
};

// Object structure in local storage
export type LocalStorage = {
  access_token: string;
  token_type: string;
  user: User;
};
