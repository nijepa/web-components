import { resolveUrl } from '../utils/resolveUrl';
export const useFetch = async (method, context) => {
  try {
    const URL = resolveUrl(context, 'rest/catalog/getitems');
    const JSON_HEADER = 'application/json';
    const headers = [['Accept', JSON_HEADER]];
    const requestInit = {
      method,
      headers: new Headers(headers),
    };
    const response = await fetch(URL, requestInit);
    if (response.status !== 200) {
      return { error: true, errorMessage: response.statusText };
    }
    return response.json();
  } catch (error) {
    console.log('Error: ', error);
    return error;
  }
};
