<template>
  <div class="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <div
      class="cursor-pointer"
      v-for="address in myAddresses"
      :key="address._id"
      @click="getPaymentAddress(address._id)"
    >
      <AddressComponent :address="address" />
    </div>
  </div>
</template>

<script setup>
import { useAddressStore } from '@/assets/Stores/AddressStore'
import { useAuthStore } from '@/assets/Stores/AuthStore'
import { useCartStore } from '@/assets/Stores/CartStore'
import AddressComponent from '@/components/AddressComponent.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const AddressStore = useAddressStore()
const myAddresses = AddressStore.addresses
const auth = useAuthStore()
const choosenAddress = ref({})
const cartStore = useCartStore()

async function getPaymentAddress(id) {
  try {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
      headers: {
        token: auth.token,
      },
    })
    console.log(res)
    choosenAddress.value = res.data.data
    Checkout()
  } catch (err) {
    console.log(err)
  }
}
async function Checkout() {
  try {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartStore.cartId}?url=${window.location.href}`,
      choosenAddress.value,
      {
        headers: {
          token: auth.token,
        },
      },
    )
    window.location.href = res.data.session.url
  } catch (error) {
    console.error('Checkout failed:', error)
  }
}
onMounted(async () => {
  useAddressStore().setAddressMode(false)
  await AddressStore.getAddresses()
})
</script>

<style lang="scss" scoped></style>
