import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'
import axios from 'axios'

export const useAddressStore = defineStore('addressStore', {
  state: () => {
    return {
      addresses: [],
      isLoadingGetAddresses: false,
      getAddressesError: null,
      AddressMode: null,
    }
  },
  actions: {
    async getAddresses() {
      try {
        this.isLoadingGetAddresses = true
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/addresses', {
          headers: {
            token: useAuthStore().token,
          },
        })
        console.log(res)
        this.isLoadingGetAddresses = false
        this.addresses = res.data.data
        this.AddressMode = true
      } catch (err) {
        console.log(err)
        this.isLoadingGetAddresses = false
        this.getAddressesError = err.response.data.message
      }
    },
    setAddressMode(mode) {
      this.AddressMode = mode
    },
  },
})
