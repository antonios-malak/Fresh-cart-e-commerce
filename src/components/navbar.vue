<template>
  <nav class="py-2 sm:py-4 bg-white sticky top-0 text-sm md:text-base z-50 shadow-md">
    <div class="container px-2 sm:px-4 md:px-6 mx-auto flex justify-between items-center">
      <div class="flex gap-2 sm:gap-4 items-center">
        <h1 class="logo transition-transform hover:scale-105">
          <img src="../assets/images/freshcart-logo.svg" alt="Logo" class="h-6 sm:h-8 md:h-10" />
        </h1>
        <!-- Desktop menu -->
        <ul class="hidden lg:flex gap-4 xl:gap-6 font-medium">
          <li>
            <router-link class="hover:text-green-600 transition-colors" :to="{ name: 'home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link class="hover:text-green-600 transition-colors" :to="{ name: 'category' }"
              >Category</router-link
            >
          </li>
          <li>
            <router-link class="hover:text-green-600 transition-colors" :to="{ name: 'brands' }"
              >Brands</router-link
            >
          </li>
          <li>
            <router-link class="hover:text-green-600 transition-colors" :to="{ name: 'cart' }"
              >Cart</router-link
            >
          </li>
          <li>
            <router-link class="hover:text-green-600 transition-colors" to="/myaccount"
              >My Account</router-link
            >
          </li>
        </ul>
      </div>

      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Hamburger button -->
        <button
          @click="isOpen = !isOpen"
          class="lg:hidden p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <i class="fas fa-bars text-base sm:text-lg"></i>
        </button>

        <!-- Mobile menu -->
        <ul
          class="lg:hidden fixed top-12 sm:top-16 left-0 right-0 bg-white shadow-lg transform transition-all duration-300 z-50"
          :class="
            isOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-full opacity-0 pointer-events-none'
          "
        >
          <li>
            <router-link class="block p-3 sm:p-4 hover:bg-gray-50" :to="{ name: 'home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link class="block p-3 sm:p-4 hover:bg-gray-50" :to="{ name: 'category' }"
              >Category</router-link
            >
          </li>
          <li>
            <router-link class="block p-3 sm:p-4 hover:bg-gray-50" :to="{ name: 'brands' }"
              >Brands</router-link
            >
          </li>
          <li>
            <router-link class="block p-3 sm:p-4 hover:bg-gray-50" :to="{ name: 'cart' }"
              >Cart</router-link
            >
          </li>
          <li>
            <router-link class="block p-3 sm:p-4 hover:bg-gray-50" to="/myaccount"
              >My Account</router-link
            >
          </li>
        </ul>

        <!-- Auth and Social Links -->
        <ul class="flex items-center gap-2 sm:gap-4">
          <div v-if="auth.$state.isloggedIn" class="hidden md:flex gap-2 sm:gap-4">
            <li>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <i class="fa-brands fa-facebook text-sm sm:text-base"></i>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-pink-600 transition-colors"
              >
                <i class="fa-brands fa-instagram text-sm sm:text-base"></i>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <i class="fa-brands fa-linkedin text-sm sm:text-base"></i>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-400 transition-colors"
              >
                <i class="fa-brands fa-twitter text-sm sm:text-base"></i>
              </a>
            </li>
            <li class="relative">
              <router-link :to="{ name: 'cart' }" class="text-gray-600">
                <i class="fa-solid fa-cart-shopping text-xl sm:text-2xl"></i>
                <span
                  class="bg-main text-white rounded w-3 h-3 sm:w-4 sm:h-4 block text-center text-xs absolute -top-1 -right-1"
                >
                  {{ CartStore.numOfCartItems }}
                </span>
              </router-link>
            </li>
          </div>

          <li v-if="auth.$state.isloggedIn">
            <router-link
              @click="auth.logOut"
              :to="{ name: 'register' }"
              class="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              Logout
            </router-link>
          </li>
          <template v-if="!auth.$state.isloggedIn">
            <li>
              <router-link :to="{ name: 'login' }" class="hover:text-green-600 transition-colors"
                >Log in</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'register' }" class="hover:text-green-600 transition-colors"
                >Register</router-link
              >
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../assets/Stores/AuthStore'
import { useCartStore } from '@/assets/Stores/CartStore'
import { ref } from 'vue'

const auth = useAuthStore()
const CartStore = useCartStore()
const isOpen = ref(false)
</script>

<style scoped>
a.router-link-active.router-link-exact-active {
  color: #0aad0a;
}
</style>
