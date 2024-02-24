import axios from 'axios';

import { actionCreators } from '@/shared/base';

let instance = null;

const createInstance = (url, token) => {
  return axios.create({
    baseURL: `${url}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleRequest = (config, store) => {
  store.dispatch({ type: actionCreators.API_REQUEST });
  return config;
};

const handleRequestError = (error, store) => {
  store.dispatch({ type: actionCreators.API_REQUEST_ERROR, error });
  return Promise.reject(error);
};

const handleResponse = (response, store) => {
  store.dispatch({ type: actionCreators.API_REQUEST_DONE });
  return response?.data || response;
};

const handleResponseError = (error, store) => {
  const { message, name } = error;
  store.dispatch({ type: actionCreators.API_REQUEST_DONE });
  store.dispatch({
    type: actionCreators.API_REQUEST_ERROR,
    error: { message, name },
  });
  return Promise.reject(error);
};

const getToken = async (url) => {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('username', 'example-user');
  formData.append('password', 'example-user');

  const response = await axios.post(`${url}/token`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
  });
  return response?.data?.access_token || '';
};

export const createBaseApi = async (url, store) => {
  try {
    const tokenValue = await getToken(url);
    instance = createInstance(url, tokenValue);

    instance.interceptors.request.use(
      (config) => handleRequest(config, store),
      (error) => handleRequestError(error, store),
    );
    instance.interceptors.response.use(
      (response) => handleResponse(response, store),
      (error) => handleResponseError(error, store),
    );

    return instance;
  } catch (error) {
    //console.error('Error fetching token:', error);
    return error;
  }
};

export const getBaseApi = () => {
  if (instance == null) throw new Error('Base API not initialized.');
  return instance;
};
