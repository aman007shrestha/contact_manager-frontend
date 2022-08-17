import axios from 'axios';
import { IUserInfo } from './interface';
import { USER_URL } from 'contants/constants';

const API_URL = USER_URL;

/**
 * @desc Axios Get request to backend url to retrieve all users who have shared their info
 * @param token Access Token for as Authorization in request header
 * @returns response data
 */
export const getUsers = async (token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

/**
 * @desc axios get request to backend url to retrive self info
 * @param token Access token for Authorization in req.headers
 * @returns response data
 */
export const getSelf = async (token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'self', config);
  return response.data;
};

/**
 * @desc Axios post request to backend url to create info for logged user
 * @param profileData Data payload which is to be created
 * @param token Access token for authorization in req.headers
 * @returns  response data
 */
export const setInfo = async (profileData: IUserInfo, token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, profileData, config);
  return response.data;
};

/**
 * @desc axios request to backend url for updating existing user
 * @param profileData Data payload with which existing user is to be updated with
 * @param token AccessToken for authorization in req.headers
 * @returns response data
 */
export const updateContact = async (profileData: IUserInfo, token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${profileData.user_info_id}`, profileData, config);
  return response.data;
};

/**
 * @desc axios post request to backend url to add user from userlist to the logged in user's contact list
 * @param userInfoId User Id whose info is to be added to logged user's contact
 * @param token access token for authorization in req.headers
 * @returns response data
 */
export const addToContact = async (userInfoId: number, token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}add`, { userInfoId }, config);
  return response.data;
};
