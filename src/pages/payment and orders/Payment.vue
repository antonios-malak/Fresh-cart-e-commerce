<template>
  <div class="bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-3xl mx-auto p-8">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

        <!-- Shipping Address -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>

          <Form @submit="Checkout" :validation-schema="validationSchema">
            <div class="mt-4">
              <label for="details" class="block text-gray-700 dark:text-white mb-1">Address</label>
              <Field
                type="text"
                id="details"
                name="details"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
              <ErrorMessage name="details" class="text-red-500" />
            </div>
            <div class="mt-4">
              <label for="city" class="block text-gray-700 dark:text-white mb-1">City</label>
              <Field
                type="text"
                id="city"
                name="city"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
              <ErrorMessage name="city" class="text-red-500" />
            </div>
            <div class="mt-4">
              <label for="phone" class="block text-gray-700 dark:text-white mb-1"
                >Phone number
              </label>
              <Field
                type="telephone"
                id="phone"
                name="phone"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
              <ErrorMessage name="phone" class="text-red-500" />
            </div>
            <div class="mt-8 flex justify-end">
              <button
                type="submit"
                class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
              >
                Confirm Order
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as Yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import axios from 'axios'
import { useCartStore } from '@/assets/Stores/CartStore'
import { useAuthStore } from '@/assets/Stores/AuthStore'

const authStore = useAuthStore()
const cartStore = useCartStore()

const validationSchema = Yup.object({
  details: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(
      /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
      'Phone number is invalid (Egyptian phone number)',
    ),
})

async function Checkout(values) {
  try {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartStore.cartId}?url=${window.location.href}`,
      values,
      {
        headers: {
          token: authStore.token,
        },
      },
    )
    window.location.href = res.data.session.url
  } catch (error) {
    console.error('Checkout failed:', error)
  }
}
</script>

<style></style>
