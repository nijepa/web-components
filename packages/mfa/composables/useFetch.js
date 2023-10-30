import { store } from '../store/store';
export const useFetch = async (
  url,
  method,
  data = undefined,
  hasJson = true
) => {
  const CONTENT_TYPE = method === 'GET' ? 'application/json' : undefined;
  try {
    console.log('data', data);
    const response = await fetch(url, {
      method,
      body: data,
      // headers: {
      //   'Content-type': CONTENT_TYPE,
      // },
    });
    console.log('success', response);
    const text = await response.text(); // Parse it as text
    return JSON.parse(text);
    //return hasJson && response.json();
  } catch (error) {
    console.log('Error: ', error, hasJson);
    if (hasJson) {
      store.responseMessage.isError = true;
      store.responseMessage.msg = error;
      return { error: true };
    } else {
      return { error: false };
    }
    //return { error: true };
  }
};
