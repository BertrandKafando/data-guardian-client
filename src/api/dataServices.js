import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users'; // a Remplacez par l'URL de notre API

export const fetchTableData = async () => {
  try {
    const response = await axios.get(`${API_URL}/tables`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la table:', error);
    throw error;
  }
};
