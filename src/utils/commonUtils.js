export const JWT_TOKEN = 'naamche-token';
export const USER_NAME = 'naamche-username';

/**
 * Store string record in the storage
 *
 * @param {string} key
 * @param {string | array | object} value
 */
export let setLocalStorage = (key, value) => {
  if (value && typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value)); // convert arrays or objects into strings
  }
};

/**
 * Retrieve record from the storage using the key
 *
 * @param {string} key
 */
export let getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data); // converts a JSON string into a Javascript Object
  } catch (e) {
    return data;
  }
};

/**
 * Clear records from the storage using the key
 *
 * @param {string} key
 */
export let clearLocalStorage = (key) => localStorage.removeItem(key);

export let getToken = () => {
  return getLocalStorage(JWT_TOKEN);
};

export let isAuthenticated = () => {
  // check token validity with JWT package

  // here, only the presence of token being checked
  return !!getToken();
};
