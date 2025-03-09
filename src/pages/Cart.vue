<template>
  <section class="py-24 relative">
    <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h2 class="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
        Shopping Cart
      </h2>
      <h3 class="text-left text-green-600 title font-manrope font-bold text-2xl leading-10 mb-8">
        <RouterLink :to="{ name: 'wishlist' }"> Your Wish List </RouterLink>
      </h3>
      <div v-if="CartStore.numOfCartItems">
        <div class="hidden lg:grid grid-cols-2 py-6">
          <div class="font-normal text-xl leading-8 text-gray-900">Product</div>
          <p class="font-normal text-xl leading-8 text-gray-900 flex items-center justify-between">
            <span class="w-full max-w-[260px] text-center">Quantity</span>
            <span class="w-full max-w-[200px] text-center">Total</span>
          </p>
        </div>
        <CartItem
          v-for="product in CartStore.cartProducts"
          :key="product._id"
          :product="product"
          @decrementQuantity="decrementQuantity"
          @incrementQuantity="incrementQuantity"
          @deleteProduct="deleteProduct"
          :incrementLoading="incrementLoading"
          :decrementLoading="decrementLoading"
        />
        <div
          class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6"
        >
          <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Original price
                </dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">
                  ${{ CartStore.cartData.totalCartPrice }}
                </dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                <dd class="text-base font-medium text-green-600">0</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">0</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">0</dd>
              </dl>
            </div>

            <dl
              class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700"
            >
              <dt class="text-xl font-bold text-gray-900 dark:text-white">Total</dt>
              <dd class="text-base font-bold text-gray-900 dark:text-white">
                ${{ CartStore.cartData.totalCartPrice }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
          <button
            class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-green-400 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-green-600"
          >
            <RouterLink :to="{ name: 'chooseAddress' }" class="flex">
              Continue to Checkout
              <svg
                class="ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                  stroke="white"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </RouterLink>
          </button>
          <button
            @click="clearCart"
            class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-red-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-red-700"
          >
            Clear Cart
          </button>
        </div>
      </div>
      <div v-else class="flex items-center justify-center min-h-[400px]">
        <div class="flex flex-col items-center justify-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-24 w-24 text-gray-400 mb-4"
          >
            <path
              d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"
            ></path>
          </svg>
          <p class="text-gray-600 text-lg font-semibold mb-4">Your shopping cart is empty.</p>
          <button
            class="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            <RouterLink :to="{ name: 'home' }"> Let's go shopping! </RouterLink>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/assets/Stores/AuthStore'
import { useCartStore } from '@/assets/Stores/CartStore'
import CartItem from '@/components/CartItem.vue'

const incrementLoading = ref(false)
const decrementLoading = ref(false)
const CartStore = useCartStore()

async function incrementQuantity(id, count) {
  incrementLoading.value = true
  try {
    await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count,
      },
      {
        headers: {
          token: useAuthStore().token,
        },
      },
    )

    incrementLoading.value = false
    CartStore.getCart()
  } catch (err) {
    console.log(err)
  }
}

async function decrementQuantity(id, count) {
  decrementLoading.value = true
  try {
    await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count,
      },
      {
        headers: {
          token: useAuthStore().token,
        },
      },
    )
    decrementLoading.value = false

    CartStore.getCart()
  } catch (err) {
    console.log(err)
  }
}
async function deleteProduct(id) {
  try {
    const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: useAuthStore().token,
      },
    })
    CartStore.cartProducts = res.data.data.products
    CartStore.cartData = res.data.data
    CartStore.numOfCartItems = res.data.numOfCartItems
  } catch (err) {
    console.log(err)
  }
}
async function clearCart() {
  try {
    await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: useAuthStore().token,
      },
    })
    CartStore.getCart()
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  CartStore.getCart()
})
</script>

<style lang="scss" scoped></style>
