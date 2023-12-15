import axios from 'axios';
import { environment } from "src/environements/environement";

export const Api = axios.create({
  baseURL: environment.apiUrl,
});


export const getMetaTable = async (bd_id) => {
  try {
    const response = await Api.get("meta-table/?bd_id=" + bd_id);
    return response.data;
  } catch (error) {
    console.error("Error getting all metatable of database:", error);
    throw error;
  }
}


export const getMetaColonne = async (meta_table_id) => {
  try {
    const response = await Api.get("meta-colonne/?meta_table_id=" + meta_table_id);
    return response.data;
  } catch (error) {
    console.error("Error getting all metacolonne of metatable:", error);
    throw error;
  }
}



//http://127.0.0.1:8000/api/meta-table/?bd_id=1