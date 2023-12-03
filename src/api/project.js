import axios from "axios";
import { environment } from "src/environements/environement";

export const productApi = axios.create({
  baseURL: environment.apiUrl,
});



export const getAllProjectsOfUser = async () => {
  try {
    const response = await productApi.get("/projet/");
    return response.data;
  } catch (error) {
    console.error("Error getting all projects of user:", error);
    throw error;
  }
}

export const createProject = async (nom_projet, descriptif) => {
  try {
    const response = await productApi.post("/projet/", {
      nom_projet,
      descriptif
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

