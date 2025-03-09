<template>
  <div class="container w-[70%] m-auto">
    <div
      class="errorMsg mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      v-if="apiError"
    >
      {{ apiError }}
    </div>
    <h1 class="mt-8 text-2xl text-gray-800">Register Now :</h1>
    <Form @submit="submit" class="flex flex-col gap-4" :validation-schema="validationSchema">
      <div class="mt-3">
        <label for="name" class="block mb-1 text-sm font-medium text-gray-600">Name:</label>
        <Field
          name="name"
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-1 required focus:outline-0 focus:bg-blue-100"
        />
        <ErrorMessage name="name" class="text-red-600" as="p" />
      </div>
      <div class="mt-1">
        <label for="email" class="block mb-1 text-sm font-medium text-gray-600">Email:</label>
        <Field
          name="email"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-1 required focus:outline-0 focus:bg-blue-100"
        />
        <ErrorMessage name="email" class="text-red-600" as="p" />
      </div>
      <div class="mt-1">
        <label for="password" class="block mb-1 text-sm font-medium text-gray-600">Password:</label>
        <div class="relative">
          <Field
            name="password"
            :type="showPassword ? 'text' : 'password'"
            class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-1 focus:outline-0 focus:bg-blue-100 placeholder:text-gray-400"
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
      </div>
      <div class="mt-1">
        <label for="rePassword" class="block mb-1 text-sm font-medium text-gray-600"
          >Repassword:</label
        >
        <div class="relative">
          <Field
            name="rePassword"
            :type="showPassword ? 'text' : 'password'"
            class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-1 focus:outline-0 focus:bg-blue-100 placeholder:text-gray-400"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-500"></i>
          </button>
        </div>
        <ErrorMessage name="rePassword" class="text-red-600" as="p" />
      </div>
      <div class="mt-1">
        <label for="telephone" class="block mb-1 text-sm font-medium text-gray-600">Tel:</label>
        <Field
          name="telephone"
          type="telephone"
          id="telephone"
          class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-1 required focus:outline-0 focus:bg-blue-100"
        />
        <ErrorMessage name="telephone" class="text-red-600" as="p" />
      </div>
      <button
        v-if="!isLoading"
        type="submit"
        class="focus:outline-none mt-1 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 block ms-auto cursor-pointer"
      >
        <template v-if="isLoading">...Loading</template>
        <template v-else>Register</template>
      </button>
    </Form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as Yup from 'yup'
const apiError = ref(null)
const isLoading = ref(false)
const showPassword = ref(false)
const router = useRouter()
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name must be only letters'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, 'Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      'Password must be at least 8 characters long and contain at least one letter and one number',
    ),
  rePassword: Yup.string()
    .required('rePassword is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  telephone: Yup.string()
    .required('Telephone is required')
    .matches(/^01[0-9]{9}$/, 'Telephone must be 10 digits long'),
})
function submit(values) {
  console.log(values)
  isLoading.value = true
  const response = axios
    .post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .then((res) => {
      console.log(res)
      router.push({ name: 'login' })
      isLoading.value = false
    })
    .catch((err) => {
      if (err?.response?.data?.errors?.msg) {
        apiError.value = err?.response?.data?.errors?.msg
      } else {
        apiError.value = err?.response?.data?.message
      }
      console.log(err)
      isLoading.value = false
    })
  console.log(response)
}
</script>

<style scoped></style>
