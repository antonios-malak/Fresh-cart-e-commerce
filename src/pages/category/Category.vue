<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-gray-50/80 backdrop-blur-sm flex justify-center items-center z-50"
  >
    <div
      class="w-8 h-8 md:w-12 md:h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"
    ></div>
  </div>
  <div
    class="container mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-8 lg:mt-10 w-full sm:w-[90%] lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8"
  >
    <CategoryItem v-for="category in categories" :key="category.id" :category="category" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CategoryItem from '@/components/CategoryItem.vue'

const categories = ref([])
const isLoading = ref(true)

async function getAllCategories() {
  try {
    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    categories.value = res.data.data
    console.log(categories.value)
    isLoading.value = false
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  getAllCategories()
})
</script>

<style lang="scss" scoped></style>
