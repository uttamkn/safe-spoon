export const getToken = (): string => {
  const tokenString = localStorage.getItem("token");
  return tokenString || "";
};
