<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6 relative"
  >
    <div
      class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto"
    >
      <div class="img-box">
        <img
          :src="product.product.imageCover"
          alt="perfume bottle image"
          class="xl:w-[140px] rounded-xl object-cover"
        />
      </div>
      <div class="pro-data w-full max-w-sm">
        <h5 class="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
          {{ product.product.title }}
        </h5>
        <p
          class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center"
        >
          {{ product.product.category.name }}
        </p>
        <h6 class="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center">
          $ {{ product.price }}
        </h6>
      </div>
    </div>
    <div
      class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2"
    >
      <div class="flex items-center w-full mx-auto justify-center">
        <button
          :disabled="decrementLoading"
          @click="handleDecrementQuantity(product.product._id, product.count - 1)"
          class="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
        >
          <i v-if="decrementLoading" class="fa-solid fa-spinner fa-spin-pulse"></i>
          <svg
            v-else
            class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
            <path
              d="M16.5 11H5.5"
              stroke=""
              stroke-opacity="0.2"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <path
              d="M16.5 11H5.5"
              stroke=""
              stroke-opacity="0.2"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <input
          type="text"
          class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
          :value="product.count"
        />
        <button
          :disabled="incrementLoading"
          @click="handleIncrementQuantity(product.product._id, product.count + 1)"
          class="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
        >
          <i v-if="incrementLoading" class="fa-solid fa-spinner fa-spin-pulse"></i>
          <svg
            v-else
            class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M11 5.5V16.5M16.5 11H5.5"
              stroke=""
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <path
              d="M11 5.5V16.5M16.5 11H5.5"
              stroke=""
              stroke-opacity="0.2"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <path
              d="M11 5.5V16.5M16.5 11H5.5"
              stroke=""
              stroke-opacity="0.2"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
      <h6
        class="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center"
      >
        {{ product.price * product.count }}
      </h6>
    </div>
    <button
      @click="handleDeleteProduct(product.product._id)"
      class="rounded-full group flex items-center justify-center focus-within:outline-red-500 absolute top-4 right-4"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
          cx="17"
          cy="17"
          r="17"
          fill=""
        />
        <path
          class="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
          d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
          stroke="#EF4444"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps(['product', 'decrementLoading', 'incrementLoading'])
const emit = defineEmits(['incrementQuantity', 'decrementQuantity', 'deleteProduct'])

const handleIncrementQuantity = (id, count) => {
  emit('incrementQuantity', id, count)
}
const handleDecrementQuantity = (id, count) => {
  emit('decrementQuantity', id, count)
}
const handleDeleteProduct = (id) => {
  emit('deleteProduct', id)
}
</script>

<style lang="scss" scoped></style>
