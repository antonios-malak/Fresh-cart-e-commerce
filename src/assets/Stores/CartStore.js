import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'
import axios from 'axios'

export const useCartStore = defineStore('cartStore', {
  state: () => {
    return {
      cartData: {},
      cartProducts: [],
      numOfCartItems: 0,
      cartId: '',
    }
  },
  actions: {
    async getCart() {
      try {
        const auth = useAuthStore()
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
          headers: {
            token: auth.token,
          },
        })
        this.cartData = res.data.data
        this.cartProducts = res.data.data.products
        this.numOfCartItems = res.data.numOfCartItems
        this.cartId = res.data.cartId
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
  },
})
