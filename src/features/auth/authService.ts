import axios from 'axios';
import { IUserData } from './interface';

const API_URL = 'http://localhost:5000/api/auth/';

export const login = async (userData: IUserData) => {
  const response = await axios.post(API_URL + 'login', userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data.accessToken));
  }
  return response.data;
};
