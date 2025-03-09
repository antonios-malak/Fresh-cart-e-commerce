<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
      >
        <p class="font-light text-black text-2xl">Enter code to reset your password!</p>
        <Form @submit="resetPassword" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
            <label
              for="resetcode"
              class="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >Enter the code sent to your email:</label
            >
            <Field
              v-model="code"
              type="text"
              name="resetcode"
              id="resetcode"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>

          <button
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Change Password
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

const code = ref('')
async function resetPassword() {
  try {
    const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
      resetCode: code.value,
    })
    console.log(res)
    router.push({ name: 'resetpassword' })
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
