import axios from 'axios'

// Create a base URL that adapts to the environment
// We need to check if we're in production more reliably
const isProduction =
  window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'

// For production, use a CORS proxy to avoid CORS errors
const baseURL = isProduction
  ? 'https://corsproxy.io/?https://manga-scrapers.onrender.com' // Production API URL with CORS proxy
  : '/api' // Development (will use the Vite proxy)

console.log('API Client initialized with baseURL:', baseURL)

// Create an axios instance with the correct base URL
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
