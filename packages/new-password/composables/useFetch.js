import { PREFIX, GLOBALS } from '../config/constants';
export const useFetch = async (endPoint) => {
  try {
    const JSON_HEADER = 'application/json';
    const headers = [['Accept', JSON_HEADER]];
    const requestInit = {
      method: endPoint.method,
      headers: new Headers(headers),
      body: JSON.stringify(endPoint.payload),
    };
    const url = import.meta.env[PREFIX + GLOBALS.BASE] + endPoint.url;
    const response = await fetch(url, requestInit);
    // TODO handle errors
    if (response.status !== 200) {
      return response;
    }
    return response.json();
  } catch (error) {
    console.log('Error: ', error);
    return error;
  }
};
