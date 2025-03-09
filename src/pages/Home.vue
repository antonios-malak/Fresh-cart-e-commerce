<template>
  <div class="container w-[90%] m-auto">
    <!-- carousels ........ -->
    <div class="Carousel relative w-full h-[320px] mb-8 mt-5">
      <div class="relative h-full">
        <div
          v-for="(image, index) in carouselImages"
          :key="index"
          class="absolute w-full h-full transition-opacity duration-500 ease-in-out"
          :class="{ 'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index }"
        >
          <img :src="image" class="w-full h-full object-cover" alt="carousel image" />
        </div>
        <div class="absolute -bottom-5 left-0 right-0 flex justify-center space-x-2 z-10">
          <button
            v-for="(_, index) in carouselImages"
            :key="index"
            @click="currentIndex = index"
            class="w-3 h-1.5 rounded transition-all duration-300"
            :class="{
              'bg-green-500': currentIndex === index,
              'bg-gray-300': currentIndex !== index,
            }"
            :aria-label="`Go to slide ${index + 1}`"
            :aria-current="currentIndex === index"
          ></button>
        </div>
      </div>
    </div>
    <div class="mb-[20px]">
      <CategoriesCarousel :categories="categories" />
    </div>
    <!-- loadinng spinner  -->
    <div v-if="isLoading" class="fixed inset-0 bg-gray-50/70 flex justify-center items-center z-50">
      <div
        class="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"
      ></div>
    </div>
    <!-- error message ...... -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[400px]">
      <p class="text-red-500 text-lg">{{ error }}</p>
    </div>
    <!-- products ......... -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-15 mb-5 justify-center items-center"
    >
      <Product
        v-for="product in products"
        :key="product.id"
        :item="product"
        :isFav="isFav[product._id]"
        @AddToCart="AddToCart"
        @AddToFav="AddToFav"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Product from '../components/Product.vue'
import CategoriesCarousel from '@/components/CategoriesCarousel.vue'
import { useAuthStore } from '@/assets/Stores/AuthStore'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import image1 from '../assets/images/slider-image-1.jpeg'
import image2 from '../assets/images/slider-image-2.jpeg'
import image3 from '../assets/images/slider-image-3.jpeg'
import { useCartStore } from '@/assets/Stores/CartStore'

const carouselImages = ref([image1, image2, image3])
const currentIndex = ref(0)

const products = ref([])

const isLoading = ref(true)
const error = ref(null)

const categories = ref([])

const CartStore = useCartStore()

const isFav = ref({})

// Auto-advance the carousel
const startCarousel = () => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % carouselImages.value.length
  }, 5000)
}
async function getAllCategories() {
  try {
    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    categories.value = res.data.data
  } catch (err) {
    console.log(err)
  }
}
async function getAllProducts() {
  try {
    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    products.value = res.data.data
    isLoading.value = false
  } catch (err) {
    error.value = err.message
  }
}

async function AddToCart(id) {
  try {
    const res = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      },
      {
        headers: {
          token: useAuthStore().token,
        },
      },
    )
    CartStore.getCart()
    console.log(res.data)
    toast(res.data.message, {
      type: 'success',
      position: 'bottom-center',
      pauseOnHover: false,
      autoClose: 2000,
      transition: 'zoom',
      dangerouslyHTMLString: true,
    })
  } catch (err) {
    console.log(err)
    toast(err.data.message, {
      type: 'error',
      position: 'bottom-center',
      autoClose: 2000,
      pauseOnHover: false,
      transition: 'zoom',
      dangerouslyHTMLString: true,
    })
  }
}

async function AddToFav(id) {
  isFav.value[id] = !isFav.value[id]
  if (isFav.value[id] === true) {
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        {
          productId: id,
        },
        {
          headers: {
            token: useAuthStore().token,
          },
        },
      )
      toast(res.data.message, {
        type: 'success',
        position: 'bottom-center',
        autoClose: 2000,
        pauseOnHover: false,
        transition: 'zoom',
      })
      console.log(res.data)
      console.log(isFav.value[id])
    } catch (err) {
      console.log(err)
      isFav.value[id] = false
      toast(err.data.message, {
        type: 'error',
        position: 'bottom-center',
        autoClose: 2000,
        pauseOnHover: false,
        transition: 'zoom',
      })
    }
  } else {
    try {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: useAuthStore().token,
        },
      })
      toast(res.data.message, {
        type: 'success',
        position: 'bottom-center',
        autoClose: 2000,
        pauseOnHover: false,
        transition: 'zoom',
      })
      console.log(res.data)
      console.log(isFav.value[id])
    } catch (err) {
      isFav.value[id] = true
      console.log(err)
      toast(err.data.message, {
        type: 'error',
        position: 'bottom-center',
        autoClose: 2000,
        pauseOnHover: false,
        transition: 'zoom',
      })
    }
  }
}

onMounted(() => {
  startCarousel()
  getAllCategories()
  getAllProducts()
})
</script>
<style></style>
