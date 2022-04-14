import { httpBase } from './httpbaseUtils';

export function getData(endpoint, params) {
  return httpBase().get(`/${endpoint}`, { params });
}

export function postData(endpoint, data) {
  return httpBase().post(`/${endpoint}`, data);
}

export function putData(endpoint, data) {
  return httpBase().put(`/${endpoint}`, data);
}

export function deleteData(endpoint, id) {
  return httpBase().delete(`/${endpoint}/${id}`);
}

//  for downloading files
export function download(endpoint, params) {
  return httpBase(true).get(`/${endpoint}`, { params });
}

export function downloadReport(endpoint, data) {
  return httpBase(true).post(`/${endpoint}`, data);
}
