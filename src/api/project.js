import axios from "axios";
import { environment } from "src/environements/environement";

export const productApi = axios.create({
  baseURL: environment.apiUrl,
});



export const getAllProjectsOfUser = async () => {
  try {
  const token = window.localStorage.getItem('token');
   const config = {
    headers : {
      'Authorization': 'Token '+token
    }
   }
 
   console.log(config);
    const response = await productApi.get("/projet/", config);
    return response.data;
  } catch (error) {
    console.error("Error getting all projects of user:", error);
    throw error;
  }
}

export const createProject = async (nom_projet, descriptif, userId) => {
  try {
    const response = await productApi.post("/projet/", {
      nom_projet,
      descriptif,
      utilisateur: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur de création du projet:", error);
    throw error;
  }
};



export const deleteProject = async (projectId) => {
  try {
    const response = await productApi.delete(`/projet/${projectId}/`);
    return response.data;
  } catch (error) {
    console.error("Erreur de suppression du project avec ID ${projectId}:", error);
    throw error;
  }
};


export const editProject = async (projectId, updatedProjectData) => {
  try {
    const response = await productApi.put(`/projet/${projectId}/`, updatedProjectData);
    return response.data;
  } catch (error) {
    console.error(`Error editing project with ID ${projectId}:`, error);
    throw error;
  }
};


export const getBdsByProjectId = async (projectId) => {
  try {
    const response = await productApi.get(`/base-de-donnees/?project_id=${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting project with ID ${projectId}:`, error);
    throw error;
  }
};

export const getDiagnosticByBdID = async (bdId) => {
  try {
    const response = await productApi.get(`/diagnostic/?bd_id=${bdId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting diagnostic with ID ${bdId}:`, error);
    throw error;
  }
}