export const getToken = (): string => {
  const tokenString = localStorage.getItem("token");
  return tokenString || "";
};

export const parseString = (descriptionString: string): string[] => {
  const sentences = descriptionString
    .split(".")
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence !== "");

  return sentences;
};
