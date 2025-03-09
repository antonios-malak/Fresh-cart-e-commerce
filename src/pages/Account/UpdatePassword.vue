<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-2 py-2 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full p-3 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
      >
        <h2
          class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Change Password
        </h2>
        <div v-if="apiError" class="text-red-600">{{ apiError }}</div>
        <div v-if="isLoading" class="text-green-600">Loading...</div>
        <div v-if="successMessage" class="text-green-600">{{ successMessage }}</div>
        <Form @submit="updatePassword" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
            <label
              for="CurrentPassword"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Current Password</label
            >
            <div class="relative">
              <Field
                v-model="currentPassword"
                type="text"
                name="CurrentPassword"
                id="Currentpassword"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
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
                type="text"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
          </div>
          <div>
            <label
              for="repassword"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >RE Password</label
            >
            <div class="relative">
              <Field
                v-model="rePassword"
                type="text"
                name="repassword"
                id="repassword"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
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
import 'vue3-toastify/dist/index.css'
import { useAuthStore } from '@/assets/Stores/AuthStore'

const currentPassword = ref('')
const newPassword = ref('')
const rePassword = ref('')
const isLoading = ref(false)
const apiError = ref('')
const successMessage = ref('')

async function updatePassword() {
  try {
    isLoading.value = true
    const res = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        currentPassword: currentPassword.value,
        password: newPassword.value,
        rePassword: rePassword.value,
      },
      {
        headers: {
          token: useAuthStore().token,
        },
      },
    )
    console.log(res)
    isLoading.value = false
    successMessage.value = 'Password updated successfully'
  } catch (err) {
    console.log(err)
    isLoading.value = false
    apiError.value = err.response.data.message
  }
}
</script>

<style lang="scss" scoped></style>
