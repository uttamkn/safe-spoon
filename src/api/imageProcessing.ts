import axios from "axios";

export const getReport = async (image: string) => {
  const res = await axios.post("api/inputProcessing/get-report", { image });
  return res.data;
};
