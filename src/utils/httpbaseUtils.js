import axios from 'axios';
import { getLocalStorage, JWT_TOKEN, isAuthenticated } from './commonUtils';

export function postData(url = '', data = {}) {
  return axios.post(`${process.env.REACT_APP_REST_API_HOST}${url}`, data, {
    headers: {
      Authorization: isAuthenticated()
        ? `Bearer ${getLocalStorage(JWT_TOKEN)}`
        : '',
    },
  });
}

export function putData(url = '', data = {}) {
  return axios.put(`${process.env.REACT_APP_REST_API_HOST}${url}`, data, {
    headers: {
      Authorization: isAuthenticated()
        ? `Bearer ${getLocalStorage(JWT_TOKEN)}`
        : '',
    },
  });
}

export function deleteData(url = '', id = '') {
  return axios.delete(`${process.env.REACT_APP_REST_API_HOST}${url}/${id}`, {
    headers: {
      Authorization: isAuthenticated()
        ? `Bearer ${getLocalStorage(JWT_TOKEN)}`
        : '',
    },
  });
}

export function getData(url, data) {
  return axios.get(`${process.env.REACT_APP_REST_API_HOST}${url}`, {
    params: data,
    headers: {
      Authorization: isAuthenticated()
        ? `Bearer ${getLocalStorage(JWT_TOKEN)}`
        : '',
    },
  });
}
