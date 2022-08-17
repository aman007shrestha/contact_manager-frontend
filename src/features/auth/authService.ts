import axios from 'axios';
import { IUserData } from './interface';
import { AUTH_URL } from 'contants/constants';

const API_URL = AUTH_URL;

/**
 *
 * @param userData The payload to be send over to login backend
 * @returns response data
 */
export const login = async (userData: IUserData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data;
};

/**
 *
 * @param userData They payload to be send to register backend
 * @returns response data
 */
export const register = async (userData: IUserData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

/**
 * @desc Logout action : Removes user token
 */
export const logout = () => {
  localStorage.removeItem('user');
};
