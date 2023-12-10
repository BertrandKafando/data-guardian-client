import axios from "axios";
import { environment } from "src/environements/environement";

export const Api = axios.create({
  baseURL: environment.apiUrl,
});


export const sendCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await Api.post("/data/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const sendFileAndLaunchDiagnostic = async (file, fileExtension, option, id_projet) => {
  try {

    const requestData = {
      parametre_diagnostic: option,
      base_de_donnees: {
        nom_base_de_donnees: "bdd2",
        type_fichier: fileExtension,
        nom_fichier: "string",
        format_fichier: "Tabulaire",
        separateur: "Virgule",
        avec_entete: true,
        fichier_bd: file,
        projet: id_projet
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

    const response = await Api.post('/diagnostic/', requestData, config);

    return response.data;

  
  
  } catch (error) {
    console.error("Error sending file and launching diagnostic:", error);
    throw error;
  }
};

// get meta all contraintes
export const get_meta_all_constraintes = async () => {
  try {   
    const response = await Api.get("/meta-tous-contraintes/");
    return response.data;
  } catch (error) {
    console.error('erreur produite lors de la récupération des méta contraintes: ' + error);
    throw error;
  }
  
};

export const add_new_constrainte = async (newContrainte) => {
  try {

    const config = {
      headers : {
        'Content-Type': 'application/json',
      }
    }
    const response = await Api.post("/meta-tous-contraintes/", newContrainte, config);
    return response.data;
  } catch (error) {
    console.error('erreur produite lors de l ajout de la constainte: ' + error);
  }
  
};

export const edit_constrainte = async (containte) => {
  try {

    const config = {
      headers : {
        'Content-Type': 'application/json',
      }
    }
    const response = await Api.put("/meta-tous-contraintes/"+containte.id + "/", containte, config);
    return response.data;
  } catch (error) {
    console.error('erreur produite lors de la modification de la containte: ' + error);
  }
  
};


export const remove_constrainte = async (containte) => {
  try {

    const response = await Api.delete("/meta-tous-contraintes/"+containte.id + "/");
    return response.data;
  } catch (error) {
    console.error('erreur produite lors de la suppression de la containte: ' + error);
  }
  
};
