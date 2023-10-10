import { resolveUrl, resolveSessionId } from '../utils/resolveUrl';
const restPath = import.meta.env.VITE_API_PATH //'/frontend/rest/aldi/newsletter';
const url = resolveUrl() + restPath + resolveSessionId();
export const useFetch = async (method, data = undefined) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'x-api-key': import.meta.env.VITE_API_TOKEN_QA,
        'Content-Type': 'application/json',
      },
    });
    console.log('success', response);
    return response.status >= 400 ? { error: true } : response.json();
  } catch (error) {
    console.error('Error: ', error);
    return { error: true };
  }
};
// "Access-Control-Allow-Origin": "*",
// "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
// "Access-Control-Allow-Credentials": "true",
// "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
// "Access-Control-Max-Age": "3600"
