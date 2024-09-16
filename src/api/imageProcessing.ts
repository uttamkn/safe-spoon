import axios from "axios";

export const sendImageForOCR = async (image: string) => {
  const res = await axios.post("api/inputProcessing/ocr", { image });
  return res.data.text;
};
