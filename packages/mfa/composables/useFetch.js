import { store } from '../store/store';
export const useFetch = async (url, method, data = undefined, options) => {
  const CONTENT_TYPE = method === 'GET' ? 'application/json' : undefined;
  let queryParams = '';
  if (options?.isLogin && !store.isCips) {
    queryParams = url.includes('?')
      ? `&action=${data.get('action')}`
      : `?action=${data.get('action')}`;
  }
  try {
    console.log('data', data, options);
    const response = await fetch(url + queryParams, {
      method,
      body: data,
      // headers: {
      //   'Content-type': CONTENT_TYPE,
      // },
    });
    console.log('success', response);
    const text = await response.text(); // Parse it as text
    return JSON.parse(text);
  } catch (error) {
    console.log('Error: ', error);
    store.responseMessage.isError = true;
    store.responseMessage.msg = error;
    return { error: true };
  }
};
