import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')

  const isAuth = computed(() => !!token.value)

  function setToken(newToken) {
    token.value = newToken
  }

  return { token, isAuth, setToken }
})
