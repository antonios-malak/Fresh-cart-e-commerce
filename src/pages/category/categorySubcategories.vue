<template>
  <div v-if="isLoading" class="fixed inset-0 bg-gray-50/70 flex justify-center items-center z-50">
    <div
      class="w-16 h-16 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"
    ></div>
  </div>
  <div
    class="container px-4 sm:px-6 lg:px-8 mx-auto my-12 w-full sm:w-[90%] lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
  >
    <SubcategoryItem
      v-for="subCategory in subCategories"
      :key="subCategory.id"
      :subCategory="subCategory"
    />
  </div>
</template>

<script setup>
import SubcategoryItem from '@/components/SubcategoryItem.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const subCategories = ref([])
const isLoading = ref(true)

async function getSubCategory() {
  const categoryId = route.params.id
  try {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    )
    console.log(res)
    subCategories.value = res.data.data
    isLoading.value = false
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getSubCategory()
})
</script>

<style lang="scss" scoped></style>
