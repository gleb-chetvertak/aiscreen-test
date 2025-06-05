export const setTokenToLocalStorage = (token) => {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token')
}
