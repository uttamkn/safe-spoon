import { LocalStorage } from "../types.ts";

//parsing the object stored in the local storage
export const getUser = (tokenString: string): LocalStorage | null => {
  let token: LocalStorage | null = null;
  if (tokenString) {
    try {
      token = JSON.parse(tokenString) as LocalStorage;
      // Validate the structure of the token
      if (!token["access_token"] || !token.token_type) {
        throw new Error("Invalid token structure");
      }
    } catch (error) {
      console.error("Failed to parse token:", error);
      token = null;
    }
  }

  return token; //returns the object stored in the local storage
};

export const getToken = (): string => {
  const tokenString = localStorage.getItem("user");
  return getUser(tokenString || "")?.access_token || "";
};
