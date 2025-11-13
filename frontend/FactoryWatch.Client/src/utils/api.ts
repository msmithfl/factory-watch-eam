export const getApiUrl = (): string => {
  // 1. Try to use environment variable first (set by Vercel)
  const envApiUrl = import.meta.env.VITE_API_BASE_URL
  
  if (envApiUrl) {
    return envApiUrl
  }
  
  // 2. Fallback for local development without .env file
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5141'
  }
  
  // 3. Fallback for production (shouldn't reach here if env vars are set)
  return 'https://factory-watch-api.up.railway.app'
}

export const API_BASE_URL = getApiUrl()

// Optional: Export environment info for debugging
export const environment = import.meta.env.VITE_ENVIRONMENT || 'development'
export const isDevelopment = environment === 'development'
export const isStaging = environment === 'staging'
export const isProduction = environment === 'production'