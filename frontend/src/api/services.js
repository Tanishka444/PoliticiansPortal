import api from './axios'

// Auth
export const signup = (data) => api.post('/auth/signup', data)
export const login = (data) => api.post('/auth/login', data)

// Politician
export const createOrUpdateProfile = (data) => api.post('/politician/create', data)
export const getMyProfile = () => api.get('/politician/me')
export const searchPoliticians = (params) => api.get('/politician/search', { params })
export const getPoliticianById = (id) => api.get(`/politician/${id}`)