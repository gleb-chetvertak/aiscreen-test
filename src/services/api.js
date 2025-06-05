import axios from 'axios'
import { getTokenFromLocalStorage } from '@/utils/localStorage'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: token ? `Bearer ${token}` : '',
  },
})

instance.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage()

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export default instance
