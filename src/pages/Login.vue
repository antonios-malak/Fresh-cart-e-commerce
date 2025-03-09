<template>
  <div class="container w-[70%] m-auto">
    <div
      class="errorMsg mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      v-if="apiError"
    >
      {{ apiError }}
    </div>
    <h1 class="mt-8 text-2xl text-gray-600 font-bold">Login Now :</h1>
    <Form @submit="login" :validation-schema="validationSchema">
      <Field
        name="email"
        type="email"
        placeholder="Enter Your Email ......."
        class="bg-gray-50 border border-gray-300 mt-3 text-gray-600 text-sm rounded-lg block w-full p-3 focus:outline-0 focus:bg-blue-100 placeholder:text-gray-400"
      />
      <ErrorMessage name="email" class="text-red-600" as="p" />

      <div class="relative">
        <Field
          name="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter Your Password ......."
          class="bg-gray-50 border border-gray-300 mt-3 text-gray-600 text-sm rounded-lg block w-full p-3 focus:outline-0 focus:bg-blue-100 placeholder:text-gray-400"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-500"></i>
        </button>
      </div>
      <ErrorMessage name="password" class="text-red-600" as="p" />

      <div class="mt-4 flex justify-between items-center">
        <router-link :to="{ name: 'forgetpassword' }" class="text-sm text-main hover:text-green-700"
          >Forget your password ... ?</router-link
        >
        <button
          type="submit"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 block cursor-pointer"
        >
          <template v-if="isLoading">...Loading</template>
          <template v-else>Login</template>
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../assets/Stores/AuthStore'

const apiError = ref(null)
const isLoading = ref(false)
const showPassword = ref(false)
const router = useRouter()
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, 'Email is invalid'),
  password: Yup.string()
    .required('Password needed')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      'Password must be at least 8 characters long and contain at least one letter and one number',
    ),
})

function login(values) {
  const authStore = useAuthStore()

  console.log(values)

  isLoading.value = true
  const response = axios
    .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
    .then((res) => {
      router.push('/')
      isLoading.value = false
      localStorage.setItem('token', res.data.token)
      authStore.login(res.data.token)
      console.log(res)
    })
    .catch((err) => {
      if (err?.response?.data?.errors?.msg) {
        apiError.value = err?.response?.data?.errors?.msg
        console.log(err)
      } else {
        apiError.value = err?.response?.data?.message
        console.log(err)
      }
      isLoading.value = false
    })
  console.log(response)
}
</script>

<style scoped></style>
