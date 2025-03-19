import axios from 'axios'

// Create a base URL that adapts to the environment
const baseURL = import.meta.env.PROD
  ? 'https://manga-scrapers.onrender.com' // Production API URL
  : '/api' // Development (will use the Vite proxy)

// Create an axios instance with the correct base URL
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
