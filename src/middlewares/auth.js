import { useAuthStore } from '@/stores/auth'
import { getTokenFromLocalStorage } from '@/utils/localStorage'

export default async function auth({ to, next }) {
  const authStore = useAuthStore()

  if (!authStore.isAuth) {
    const token = getTokenFromLocalStorage()

    if (token) {
      authStore.setToken(token)

      if (to.name === 'auth') {
        return next({ name: 'home' })
      }

      return next()
    }

    return next({ name: 'auth' })
  }

  return next()
}
