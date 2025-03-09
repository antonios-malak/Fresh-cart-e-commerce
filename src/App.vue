<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './assets/Stores/AuthStore'
import { useCartStore } from './assets/Stores/CartStore'
import { useAddressStore } from './assets/Stores/AddressStore'

const auth = useAuthStore()
const CartStore = useCartStore()
const useAddress = useAddressStore()

onMounted(() => {
  if (localStorage.getItem('token')) {
    auth.login(localStorage.getItem('token'))
  }
  CartStore.getCart()
  useAddress.getAddresses()
})
</script>

<style lang="scss" scoped></style>
