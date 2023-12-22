import axios from "axios";
import { environment } from "src/environements/environement";

export const Api = axios.create({
  baseURL: environment.apiUrl,
});


export const signUpRequest = async (user) => {

  const requestData = {
    prenom: user.prenom,
    nom: user.nom,
    compte: {
      identifiant: user.identifiant,
      mot_de_passe: user.password
    },
    role: {
      nom_role: "Client"
    },
    email: user.email,
    telephone: user.telephone,
    organisation: user.organisation,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json', // Specify JSON content type
    },
  };

  try {
    const response = await Api.post('/utilisateur/', requestData, config);

    return response.data;
  } catch (error) { 
      throw error;    
  }

  };



  export const signInRequest = async (email, password) => {
    const requestData = {
      identifiant: email,
      mot_de_passe: password,
    };
  
    const config = {
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
    };
  
    try {
      const response = await Api.post('/authenticate/', requestData, config);
  
      return response.data;
    } catch (error) {

      if (error?.response?.data){
        throw error?.response?.data?.detail;
      }else{
        throw error;
      }
      
    }
  };

  export const signOutRequest = async () =>{


    const token = window.localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
        'Authorization': 'Token ' + token
      },
    };
  
    try {
      const response = await Api.post('/logout/',{}, config);
  
      return response.data;
    } catch (error) {

      throw error;
    }
  }
  

  export const getUserInfo = async (userID) => {
  
    try {
      const response = await Api.get('/utilisateur/'+userID);
      return response.data;
    } catch (error) {
        throw error;      
    }
  };

  export const updateUserInfo = async (userInfo) => {
  
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await Api.put('/utilisateur/'+userInfo.id + '/', userInfo, config);
      return response.data;
    } catch (error) {
        throw error;      
    }
  };