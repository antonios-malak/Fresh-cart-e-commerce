<template>
  <div>
    <div class="container mx-auto px-4 py-8">
      <div v-if="isLoading" class="flex items-center justify-center h-screen">
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else-if="error" class="text-center text-red-600">p
        <p>{{ error }}</p>
      </div>
      <div v-else class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Product Image Gallery -->
          <div class="space-y-4">
            <div class="rounded-lg overflow-hidden">
              <img :src="selectedImage || product.imageCover" :alt="product.title" class="w-full h-auto object-cover">
            </div>
            <div class="grid grid-cols-5 gap-2">
              <div v-for="(image, index) in product.images" :key="index"
                class="rounded-lg overflow-hidden cursor-pointer" @click="selectedImage = image">
                <img :src="image" :alt="`${product.title} - ${index + 1}`" :class="['w-full h-24 object-cover transition-opacity hover:opacity-75',
                  selectedImage === image ? 'border-2 border-green-500' : '']">
              </div>
            </div>
          </div>
          <!-- Product Details -->
          <div class="space-y-4">
            <h1 class="text-3xl font-bold">{{ product.title }}</h1>
            <p class="text-gray-600">{{ product.description }}</p>
            <div class="text-2xl font-semibold text-green-600">${{ product.price }}</div>
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">Category:</span>
              <span class="font-medium">{{ product.category?.name }}</span>
            </div>
            <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const product = ref({});
const isLoading = ref(false);
const error = ref(null);
const selectedImage = ref(null);

async function getProduct() {
  try {
    isLoading.value = true;
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${route.params.id}`
    );
    product.value = response.data.data;
  } catch (err) {
    error.value = err.message || 'Failed to fetch product';
    console.error('Error fetching product:', err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getProduct();
});
</script>
