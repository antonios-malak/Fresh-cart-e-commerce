<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
      >
        <h2
          class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Change Password
        </h2>
        <Form @submit="updatePassword" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <Field
              v-model="email"
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >New Password</label
            >
            <div class="relative">
              <Field
                v-model="newPassword"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <i
                  :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  class="text-gray-500"
                ></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset passwod
          </button>
        </Form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const email = ref('')
const newPassword = ref('')
const showPassword = ref(false)

async function updatePassword() {
  try {
    const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
      email: email.value,
      newPassword: newPassword.value,
    })
    console.log(res)
    router.push({ name: 'home' })
  } catch (err) {
    console.log(err)
    toast(err.response.data.message, {
      type: 'error',
      position: 'bottom-center',
      autoClose: 3000,
      pauseOnHover: false,
      transition: 'zoom',
      dangerouslyHTMLString: true,
    })
  }
}
</script>

<style lang="scss" scoped></style>
