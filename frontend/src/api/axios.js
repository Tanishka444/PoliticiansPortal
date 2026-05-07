import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
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