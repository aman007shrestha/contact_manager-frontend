import axios from 'axios';
import { IContact } from './interface';
import { CONTACT_URL, FAV_URL } from 'contants/constants';

const API_URL = CONTACT_URL;
const FAV_API_URL = FAV_URL;

/**
 * @desc Axios request to backend url to get contacts
 * @param token : Access token
 * @returns response data
 */
export const getContacts = async (token: string) => {
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
 * @desc Axios request to backend to set contact
 * @param contactData Payload Data which is to be created
 * @param token access token
 * @returns response data
 */
export const setContact = async (contactData: IContact, token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, contactData, config);
  return response.data;
};

/**
 * @desc Axios request to backend url to update existing contact
 * @param contactData Payload Data which is to be updated
 * @param token access token
 * @returns response data
 */
export const updateContact = async (contactData: IContact, token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${contactData.contact_id}`, contactData, config);
  return response.data;
};

/**
 * @desc Axios request to backend url to delete contact
 * @param contactId Id of contact object which is to be deleted
 * @param token Access token
 * @returns response data
 */
export const deleteContact = async (contactId: number, token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${contactId}`, config);
  return response.data;
};

/**
 * @desc Axios request to backend url to get all favourites contact for logged in user
 * @param token Access token
 * @returns Response data
 */
export const getFavourites = async (token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(FAV_API_URL, config);
  return response.data;
};

/**
 * @desc Axios request to backend url to set favourite of a selected contact for existing user
 * @param contactId id of contact which is to be set favourite
 * @param token Access token
 * @returns contact id of unfavourited contact
 */
export const setFavourite = async (contactId: number, token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.post(`${FAV_API_URL}`, { contactId: contactId }, config);
  return contactId;
};

/**
 * @desc Axios request to backend url to unset fav of selected contact for existing user.
 * @param contactId ID of contact which is to be unset favourite
 * @param token Access token
 * @returns contact id of unfavourated contact
 */
export const unsetFavourite = async (contactId: number, token: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${FAV_API_URL}${contactId}`, config);
  return contactId;
};
