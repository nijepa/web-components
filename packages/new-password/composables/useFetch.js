import { resolveBaseUrl } from '../utils/resolveUrl';
export const useFetch = async (endPoint) => {
  try {
    // const baseUrl = 'backoffice.srv-test05.cadooz.systems'
    const JSON_HEADER = 'application/json';
    const headers = [['Accept', JSON_HEADER]];
    const requestInit = {
      method: endPoint.method,
      headers: new Headers(headers),
      body: JSON.stringify(endPoint.payload),
    };
    let url = resolveBaseUrl() + endPoint.url;
    if (endPoint.params) {
      url = url + '?' + new URLSearchParams(endPoint.params);
    }
    const response = await fetch(url, requestInit);
    // TODO handle errors
    if (response.status !== 200) {
      return response;
    }
    return response.json();
  } catch (error) {
    console.log('Error: ', error);
    const err = {
      error: true,
      errorMsg: error,
    };
    return err;
  }
};
