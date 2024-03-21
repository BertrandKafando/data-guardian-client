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

export const getDiagnosticScore = async (bd_id) =>{
  try {
    const response = await Api.get("score-diagnostic/?bd_id=" + bd_id);
    return response.data;
  } catch (error) {
    console.error("Error getting diagnostic score", error);
    throw error;
  }
}

export const getAnalyseDatabase = async(bd_id) => {
  try {
    const response = await Api.get("user-data/?db_id=" + bd_id);
    return response.data;
  } catch (error) {
    console.error("Error getting database score", error);
    throw error;
  }
}

export const getDiagnosticDetails = async (bd_id) => {
  try {
    const response = await Api.get("diagnostic-detail/?bd_id=" + bd_id);
    return response.data;
  } catch (error) {
    console.error("Error getting diagnostic details", error);
    throw error;
  }
}

export const applyCorrection = async (bd_id) => {
  try {
    const response = await Api.get("correction-anomalies/?bd_id=" + bd_id);
    console.log("CORRECTION", response.data);
    return response.data;
  } catch (error) {
    console.error("Error correction", error);
    throw error;
  }
}




//http://127.0.0.1:8000/api/meta-table/?bd_id=1