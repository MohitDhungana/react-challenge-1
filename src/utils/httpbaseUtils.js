import axios from 'axios';
import {
  getLocalStorage,
  JWT_TOKEN,
  isAuthenticated,
  clearLocalStorage,
} from './commonUtils';

export const httpBase = (
  isDownloadable = false, // for downloadable contents
  cancelToken // use for sending a cancel token to cancel api calls with axios
) => {
  const headers = {
    'X-XSRF-TOKEN': getLocalStorage(JWT_TOKEN),
    Lang: 'en',
  };
  const normalHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: isAuthenticated()
      ? `Bearer ${getLocalStorage(JWT_TOKEN)}`
      : '',
  };
  const downloadableHeaders = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_REST_API_HOST}`,
    headers: isDownloadable
      ? { ...headers, ...downloadableHeaders }
      : { ...headers, ...normalHeaders },
    responseType: isDownloadable ? 'blob' : 'json',
    cancelToken: cancelToken || undefined,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (401 === error.response.status) {
        clearLocalStorage(JWT_TOKEN);
        window.location.reload();
      }
      // handle other HTTP response code errors here

      return Promise.reject(error);
    }
  );

  return api;
};
