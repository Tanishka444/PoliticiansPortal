import axios from 'axios'

// Use full backend URL in production (Render) and local proxy during development
const PROD_API_BASE = 'https://politiciansportal.onrender.com/api'
const baseURL = import.meta.env.PROD ? PROD_API_BASE : '/api'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('portalUser') || 'null')
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// Global response error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('portalUser')
      window.location.href = '/auth'
    }
    return Promise.reject(err)
  }
)

export default api