import axios from 'axios';
import { actionTypes } from './actionTypes';

let instance = null;

const createInstance = (token) => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleRequest = (config, store) => {
  store.dispatch({ type: actionTypes.API_REQUEST });
  return config;
};

const handleRequestError = (error, store) => {
  store.dispatch({ type: actionTypes.API_REQUEST_ERROR, error, });
  return Promise.reject(error);
};

const handleResponse = (response, store) => {
  store.dispatch({ type: actionTypes.API_REQUEST_DONE });
  return response;
};

const handleResponseError = (error, store) => {
  const { message, name } = error;
  store.dispatch({ type: actionTypes.API_REQUEST_DONE });
  store.dispatch({
    type: actionTypes.API_REQUEST_ERROR,
    error: { message, name }
  });
  return Promise.reject(error);
};

export const createBaseApi = (store) => {
  try {
    // for this example, we are going to hard code the web user
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', 'example-user');
    formData.append('password', 'example-user');

    const tokenResponse = async () => await axios.post(`${process.env.REACT_APP_API_URL}/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json',
      },
    });

    const token = tokenResponse?.data?.access_token;
    instance = createInstance(token);

    instance.interceptors.request.use((config) => handleRequest(config, store), (error) => handleRequestError(error, store));
    instance.interceptors.response.use((response) => handleResponse(response, store), (error) => handleResponseError(error, store));

    return instance;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export const getBaseApi = () => {
  if (instance == null) throw new Error('Base API not initialized.');
  return instance;
};
