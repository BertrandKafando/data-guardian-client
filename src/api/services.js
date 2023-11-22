import axios from "axios";
import { environment } from "src/environements/environement";

export const productApi = axios.create({
  baseURL: environment.apiUrl,
});


export const sendCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await productApi.post("/data/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


