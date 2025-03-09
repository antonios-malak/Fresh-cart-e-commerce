<template>
  <div>
    <h1 class="mt-8 text-2xl text-gray-800">Update info :</h1>
    <div v-if="apiError" class="text-red-600">{{ apiError }}</div>
    <div v-if="isLoading" class="text-green-600">Loading...</div>
    <div v-if="successMessage" class="text-green-600">{{ successMessage }}</div>
    <Form @submit="updateAccount" class="flex flex-col gap-4" :validation-schema="validationSchema">
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
        <label for="phone" class="block mb-1 text-sm font-medium text-gray-600">Tel:</label>
        <Field
          name="phone"
          type="telephone"
          id="phone"
          class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-1 required focus:outline-0 focus:bg-blue-100"
        />
        <ErrorMessage name="phone" class="text-red-600" as="p" />
      </div>
      <button
        v-if="!isLoading"
        type="submit"
        class="focus:outline-none mt-1 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 block ms-auto cursor-pointer"
      >
        <template v-if="isLoading">...Loading</template>
        <template v-else>save</template>
      </button>
    </Form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/assets/Stores/AuthStore'
import axios from 'axios'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { ref } from 'vue'
import * as Yup from 'yup'
const isLoading = ref(false)
const AuthStore = useAuthStore()
const apiError = ref('')
const successMessage = ref('')
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name must be only letters'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, 'Email is invalid'),

  phone: Yup.string()
    .required('Telephone is required')
    .matches(/^(?:\+20|0)?1[0-2,5]{1}[0-9]{8}$/, 'Telephone must be 11 digits long'),
})
async function updateAccount(values) {
  try {
    isLoading.value = true
    const res = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', values, {
      headers: {
        token: AuthStore.token,
      },
    })
    console.log(res)
    console.log(AuthStore.token)
    console.log(values)
    isLoading.value = false
    successMessage.value = 'Account updated successfully'
  } catch (err) {
    console.log(err)
    apiError.value = err.response.data.errors.msg
  }
}
</script>

<style scoped></style>
