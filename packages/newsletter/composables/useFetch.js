export const useFetch = async (url, method, data = undefined) => {
  try {
    const response = await fetch(url, {
      method,
      body: data,
      withCredentials: true,
      headers: {
        "X-Auth-Token": import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
      }
    });
    console.log('success', response);
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
    return { error: true };
  }
};
