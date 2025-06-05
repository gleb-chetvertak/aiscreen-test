import http from '../api'

export async function login(payload) {
  return await http.post('login', payload)
}
