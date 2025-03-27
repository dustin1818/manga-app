import axios from 'axios'

// Determine if we're in production
const isProduction =
  window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'

// Use CORS proxy in production, local proxy in development
const baseURL = isProduction ? 'https://corsproxy.io/?https://manga-scrapers.onrender.com' : '/api'

// Create an axios instance with the correct base URL
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Only add cache-control headers when not using CORS proxy
    ...(isProduction
      ? {}
      : {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        }),
  },
})

export default apiClient
