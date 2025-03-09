<template>
  <div v-if="isLoading" class="fixed inset-0 bg-gray-50/70 flex justify-center items-center z-50">
    <div
      class="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"
    ></div>
  </div>
  <div v-if="myAddresses.length == 0">
    <div class="text-center min-h-[400px]">
      <p class="text-gray-500 text-lg">You have no addresses yet .</p>
      <RouterLink :to="{ name: 'addresses' }" class="text-green-500 underline">
        Add Address and go back to checkout page
      </RouterLink>
    </div>
  </div>
  <div v-else>
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
    <button
      type="button"
      class="mx-auto mt-4 md:mt-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm md:text-base px-4 md:px-6 py-2 md:py-3 block cursor-pointer w-full sm:w-auto"
    >
      <RouterLink :to="{ name: 'addresses' }"> Add another address </RouterLink>
    </button>
  </div>
</template>

<script setup>
import { useAddressStore } from '@/assets/Stores/AddressStore'
import { useAuthStore } from '@/assets/Stores/AuthStore'
import { useCartStore } from '@/assets/Stores/CartStore'
import AddressComponent from '@/components/AddressComponent.vue'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const AddressStore = useAddressStore()
const myAddresses = computed(() => AddressStore.addresses)
const auth = useAuthStore()
const choosenAddress = ref({})
const cartStore = useCartStore()
const isLoading = computed(() => AddressStore.isLoadingGetAddresses)

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
