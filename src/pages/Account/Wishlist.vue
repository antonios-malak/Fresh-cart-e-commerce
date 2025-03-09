<template>
  <div v-if="isLoading" class="fixed inset-0 bg-gray-50/70 flex justify-center items-center z-50">
    <div
      class="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"
    ></div>
  </div>
  <div v-else>
    <div v-if="Wishes.length == 0">
      <div class="flex items-center justify-center min-h-[400px]">
        <p class="text-gray-500 text-lg">Your Wishlist is Empty</p>
      </div>
    </div>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-15 mb-5 justify-center items-center"
    >
      <WishlistProduct v-for="wish in Wishes" :key="wish._id" :item="wish" @AddToCart="AddToCart" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/assets/Stores/AuthStore'
import WishlistProduct from '@/components/WishlistProduct.vue'
import { useCartStore } from '@/assets/Stores/CartStore'
import { toast } from 'vue3-toastify'

const Wishes = ref([])
const isLoading = ref(true)
const CartStore = useCartStore()
async function getWishList() {
  try {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token: useAuthStore().token,
      },
    })
    Wishes.value = res.data.data
    console.log(Wishes.value)
    console.log(res)
    isLoading.value = false
  } catch (err) {
    console.log(err)
  }
}
async function AddToCart(id) {
  try {
    const res = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      },
      {
        headers: {
          token: useAuthStore().token,
        },
      },
    )
    CartStore.getCart()
    console.log(res.data)
    toast(res.data.message, {
      type: 'success',
      position: 'bottom-center',
      pauseOnHover: false,
      autoClose: 2000,
      transition: 'zoom',
      dangerouslyHTMLString: true,
    })
  } catch (err) {
    console.log(err)
    toast(err.data.message, {
      type: 'error',
      position: 'bottom-center',
      autoClose: 2000,
      pauseOnHover: false,
      transition: 'zoom',
      dangerouslyHTMLString: true,
    })
  }
}
onMounted(() => {
  getWishList()
})
</script>

<style scoped></style>
