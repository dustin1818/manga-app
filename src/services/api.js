import axios from 'axios'

const baseURL = 'https://corsproxy.io/?url=https://manga-scrapers.onrender.com'

const apiClient = axios.create({
  baseURL,
})

export default apiClient
