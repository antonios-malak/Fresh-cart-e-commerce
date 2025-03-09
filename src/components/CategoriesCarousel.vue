<template>
  <div class="mb-[30px] relative">
    <Carousel
      :items-to-show="3"
      :wrap-around="true"
      :autoplay="4000"
      :pause-autoplay-on-hover="true"
      :gap="3"
      :height="200"
    >
      <Slide v-for="category in categories" :key="category.id">
        <div class="">
          <img :src="category.image" alt="image" class="w-full object-fill" />
          <div
            class="absolute top-[80%] left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h1 class="text-white text-3xl font-bold">{{ category.name }}</h1>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

defineProps(['categories'])
</script>

<style scoped>
.carousel {
  --vc-pgn-background-color: grey;
  --vc-pgn-active-color: green;
  --vc-pgn-border-radius: 5px;
  --vc-pgn-height: 5px;
  --vc-pgn-width: 14px;
  --vc-pgn-gap: 6px;
}
</style>
