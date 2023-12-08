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


export const sendFileAndLaunchDiagnostic = async (base64File, file, fileExtension, option) => {
  try {

    const requestData = {
      parametre_diagnostic: option,
      base_de_donnees: {
        nom_base_de_donnees: "bdd1",
        type_fichier: fileExtension,
        nom_fichier: "string",
        format_fichier: "Tabulaire",
        separateur: "Virgule",
        avec_entete: true,
        fichier_bd: file
      }
    }

    const token = window.localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token ' + token
      },
    };

    console.log(config);

    const response = await productApi.post('/diagnostic/', requestData, config);

    return response.data;

  
  
  } catch (error) {
    console.error("Error sending file and launching diagnostic:", error);
    throw error;
  }
};