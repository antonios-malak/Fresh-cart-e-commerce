import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      token: null,
      isloggedIn: false,
      user: null,
    }
  },
  actions: {
    login(tokken) {
      this.token = tokken
      this.isloggedIn = true
    },
    logOut() {
      this.token = null
      this.isloggedIn = false
      localStorage.removeItem('token')
    },
    async getUser() {
      try {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', {
          headers: {
            token: this.token,
          },
        })
        this.user = res.data.decoded

        console.log(res.data.decoded)
      } catch (err) {
        console.log(err)
      }
    },
  },
})
