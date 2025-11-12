export const getApiUrl = (): string => {
  return window.location.hostname === 'localhost' 
    ? 'http://localhost:5141'
    : 'https://factory-watch-api.up.railway.app';
};

export const API_BASE_URL = getApiUrl();