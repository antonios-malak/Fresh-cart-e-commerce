<template>
  <div
    class="w-full max-w-sm mx-auto rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-xl dark:bg-gray-800 dark:text-white hover:bg-green-600 group transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
  >
    <div class="p-6 text-center">
      <h1
        class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-white transition-all duration-300"
      >
        {{ subCategory.name }}
      </h1>
      <p
        class="mt-2 text-sm text-gray-600 group-hover:text-white dark:text-gray-300 transition-all duration-300"
      >
        Click to explore products
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps(['subCategory'])
</script>

<style lang="scss" scoped></style>
