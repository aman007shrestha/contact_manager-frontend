const BASE_URL = process.env.REACT_APP_API_BASE_URI as string;

// export const AUTH_URL = 'http://localhost:5000/api/auth/';
// export const CONTACT_URL = 'http://localhost:5000/api/contact/';
// export const FAV_URL = 'http://localhost:5000/api/fav/';
// export const USER_URL = 'http://localhost:5000/api/user/';

export const AUTH_URL = BASE_URL + '/api/auth/';
export const CONTACT_URL = BASE_URL + '/api/contact/';
export const FAV_URL = BASE_URL + '/api/fav/';
export const USER_URL = BASE_URL + '/api/user/';
