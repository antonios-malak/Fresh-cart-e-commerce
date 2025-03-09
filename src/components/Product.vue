<template>
  <div
    class="p-7 h-full relative flex flex-col justify-center items-center overflow-hidden w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 group hover:scale-[1.02] transition-all duration-300 ease-in-out"
  >
    <span @click="handleAddToFav" class="absolute top-3 left-3 cursor-pointer"
      ><i class="fa-solid fa-heart" :class="props.isFav ? 'text-red-600' : 'text-gray-600'"></i
    ></span>

    <router-link
      :to="{ name: 'product-details', params: { id: props.item._id } }"
      class="block h-full"
    >
      <div class="relative">
        <img
          class="w-full h-64 p-4 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          :src="props.item.imageCover"
          :alt="props.item.title"
        />

        <div class="absolute top-2 right-2">
          <span
            class="block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full dark:bg-blue-200 dark:text-blue-800"
          >
            <span class="flex items-center gap-1">
              <svg
                class="w-3 h-3 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                title="Rating Star"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
              {{ props.item.ratingsAverage }} ({{ props.item.ratingsQuantity }})
            </span>
          </span>
        </div>
        <div class="absolute bottom-2 right-2">
          <span
            class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full dark:bg-green-200 dark:text-green-800"
          >
            {{ props.item.sold }} sold
          </span>
        </div>
      </div>

      <div class="p-2 flex flex-col justify-between items-start space-y-3">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-main dark:text-blue-400">
              {{ props.item.category.name }}
            </span>
          </div>

          <h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
            {{ props.item.title.split(' ').slice(0, 2).join(' ') }}
          </h3>

          <div class="flex items-center justify-between">
            <div v-if="props.item.priceAfterDiscount" class="space-y-1">
              <div class="text-xs text-red-600 dark:text-red-400 line-through">
                {{ props.item.price }} Egp
              </div>
              <div class="text-sm font-bold text-gray-600 dark:text-white">
                {{ props.item.priceAfterDiscount }} Egp
              </div>
            </div>
            <div v-else class="text-sm font-bold text-gray-600 dark:text-white">
              {{ props.item.price }} Egp
            </div>
          </div>
        </div>
      </div>
    </router-link>
    <button
      type="button"
      class="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-300 ease-in-out transform opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 focus:outline-none"
      @click="handleAddToCart"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  item: Object,
  isFav: Boolean,
})
const emit = defineEmits(['AddToCart', 'AddToFav'])
const handleAddToCart = () => {
  emit('AddToCart', props.item._id)
}
const handleAddToFav = () => {
  emit('AddToFav', props.item._id)
}
</script>
