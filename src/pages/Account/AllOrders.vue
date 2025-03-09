<template>
  <div v-if="isLoading" class="fixed inset-0 bg-gray-50/70 flex justify-center items-center z-50">
    <div
      class="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"
    ></div>
  </div>
  <div v-else>
    <div v-if="orders.length == 0">
      <div class="flex items-center justify-center min-h-[400px]">
        <p class="text-gray-500 text-lg">You have no orders yet .</p>
      </div>
    </div>
    <section v-else class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>

          <div v-for="order in orders" :key="order._id" class="mt-6 flow-root sm:mt-8">
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              <div
                class="flex flex-col md:flex-row items-start flex-wrap md:items-center gap-6 py-6"
              >
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    <a href="#" class="hover:underline">{{ order._id }}</a>
                  </dd>
                </dl>

                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {{ order.createdAt }}
                  </dd>
                </dl>

                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-2">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                    Total Price:
                  </dt>
                  <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {{ order.totalOrderPrice }}
                  </dd>
                </dl>

                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-2">
                  <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                  <dd
                    v-if="order.isDelivered === false"
                    class="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  >
                    <svg
                      class="me-1 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                    In transit
                  </dd>
                  <dd
                    v-else
                    class="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    <svg
                      class="me-1 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                    Completed
                  </dd>
                </dl>

                <div
                  class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4"
                >
                  <button
                    v-if="order.isDelivered === false"
                    type="button"
                    class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                  >
                    Cancel order
                  </button>
                  <button
                    v-else
                    type="button"
                    class="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto"
                  >
                    Order again
                  </button>
                  <a
                    href="#"
                    class="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                    >View details</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
          <button
            class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
          >
            <RouterLink :to="{ name: 'home' }" class="flex">
              Continue shopping
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/assets/Stores/AuthStore'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const orders = ref([])
const isLoading = ref(true)
const authStore = useAuthStore()

async function getAllOrders() {
  try {
    const userId = authStore.user.id
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    console.log(res)

    orders.value = res.data
    isLoading.value = false
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await authStore.getUser()
  await getAllOrders()
})
</script>

<style lang="scss" scoped></style>
