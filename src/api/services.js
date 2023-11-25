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


export const sendFileAndLaunchDiagnostic = async (base64File, fileExtension, option) => {
  try {
    const formData = new FormData();
    formData.append("base64File", base64File);
    formData.append("fileExtension", fileExtension);
    formData.append("option", option);

    console.log(base64File);
    console.log(fileExtension);
    console.log(option);

    const response = await productApi.post("/data/upload-and-diagnostic", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error sending file and launching diagnostic:", error);
    throw error;
  }
};