import { store } from '../store/store';
export const useFetch = async (url, method, data = undefined, options) => {
  const CONTENT_TYPE = method === 'GET' ? 'application/json' : undefined;
  let queryParams = '';
  if (options?.isMfaMandatory) {
    queryParams =
      url.includes('?')
        ? `&action=${data.get('action')}`
        : `?action=${data.get('action')}`;
  }
  try {
    console.log('data', data);
    const response = await fetch(url + queryParams, {
      method,
      body: data,
      // headers: {
      //   'Content-type': 'application/json',
      // },
    });
    console.log('success', response);
    const text = await response.text(); // Parse it as text
    return JSON.parse(text);
    //return hasJson && response.json();
  } catch (error) {
    console.log('Error: ', error, options?.hasJson);
    // if (options?.hasJson) {
      store.responseMessage.isError = true;
      store.responseMessage.msg = error;
      return { error: true };
    // } else {
    //   return { error: false };
    // }
    //return { error: true };
  }
};
