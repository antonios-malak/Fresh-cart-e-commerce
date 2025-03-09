<template>
  <div
    class="group max-w-full sm:max-w-[16rem] cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div class="relative overflow-hidden h-[200px] sm:h-[250px] lg:h-[300px] rounded-t-xl group">
      <img
        class="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
        :src="brand.image"
        alt="category-image"
      />
      <div
        class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"
      ></div>
    </div>
    <div class="p-5 sm:p-6 text-center">
      <h1
        class="text-sm sm:text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300"
      >
        {{ brand.name }}
      </h1>
    </div>
  </div>
</template>

<script setup>
defineProps(['brand'])
</script>

<style lang="scss" scoped></style>
