export const useFetch = async (url, method, data = undefined) => {
  try {
    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(url), {
      method,
      body: JSON.stringify(data),
      // mode: "no-cors",
      headers: {
        "x-api-key": import.meta.env.VITE_API_TOKEN_QA,
        "Content-Type": "application/json",
      },
    });
    console.log('success', response);
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
    return { error: true };
  }
};
/*"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Max-Age": "3600"*/