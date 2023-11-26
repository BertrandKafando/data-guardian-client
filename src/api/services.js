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
    const formData = new FormData();
    // formData.append("base64File", base64File);
    // formData.append("fileExtension", fileExtension);
    formData.append("parametre_diagnostic", option);


    formData.append("nom_base_de_donnees", "bdd")
    formData.append("type_fichier", fileExtension)
    formData.append("nom_fichier", "nom_fichier.csv")
    formData.append("separateur", "Virgule")
    formData.append("format_fichier", "Tabulaire")
    formData.append("nom_base_de_donnees", "bdd_test")
    
    formData.append("taille_fichier", "1250")
    formData.append("fichier_bd", file)
    
    formData.append("avec_entete", true)

    const response = await productApi.post("/base-de-donnees/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending file and launching diagnostic:", error);
    throw error;
  }
};