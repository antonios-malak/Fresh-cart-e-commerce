<template>
  <div class="w-full p-4 md:p-6 lg:p-8">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">My Addresses</h1>
    <div class="addresses w-full mt-5 md:mt-8">
      <div
        v-if="useAddress.isLoadingGetAddresses"
        class="fixed inset-0 bg-gray-50/70 flex justify-center items-center z-50"
      >
        <div
          class="w-8 h-8 md:w-12 md:h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"
        ></div>
      </div>
      <div v-if="deleteAddressError" class="p-3">
        <p class="text-red-500 text-base md:text-lg">{{ deleteAddressError }}</p>
      </div>
      <div
        v-if="myAddresses.length == 0"
        class="w-full flex items-center justify-center text-base md:text-lg p-4"
      >
        You have no addresses yet.
      </div>

      <div v-else class="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <AddressComponent
          v-for="address in myAddresses"
          :key="address._id"
          :address="address"
          @deleteAddress="deleteAddress"
          :deleteAddressError="deleteAddressError"
          :AddressMode="AddressMode"
        />
      </div>
    </div>
    <button
      @click="toggleAddressModal"
      type="button"
      class="mt-4 md:mt-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm md:text-base px-4 md:px-6 py-2 md:py-3 block cursor-pointer w-full sm:w-auto"
    >
      Add new address
    </button>
    <!-- Dark overlay -->
    <div
      v-if="addressModal"
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="toggleAddressModal"
    ></div>
    <!-- Modal -->
    <div v-if="addressModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div
          class="relative w-full max-w-sm md:max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700 mx-4"
        >
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-3 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
          >
            <h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              Add New Address
            </h3>
            <button
              @click="toggleAddressModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <p v-if="apiError" class="text-red-600 mb-3 ps-4">{{ apiError }}</p>
          <p v-if="successMessage" class="text-green-600 mb-3 px-4 pt-4">{{ successMessage }}</p>

          <div class="p-4 md:p-5">
            <Form
              @submit="addAddress"
              class="space-y-4 md:space-y-6"
              action="#"
              :validation-schema="addressSchema"
            >
              <div>
                <label
                  for="addressName"
                  class="block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white"
                  >Address Name</label
                >
                <Field
                  type="text"
                  name="name"
                  id="addressName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="home / work"
                  required
                />
                <ErrorMessage name="name" class="text-red-600 text-sm" as="p" />
              </div>

              <div>
                <label
                  for="details"
                  class="block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white"
                  >Details</label
                >
                <Field
                  type="text"
                  name="details"
                  id="details"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Street name, building number"
                  required
                />
                <ErrorMessage name="details" class="text-red-600 text-sm" as="p" />
              </div>

              <div>
                <label
                  for="city"
                  class="block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white"
                  >City</label
                >
                <Field
                  type="text"
                  name="city"
                  id="city"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your city"
                  required
                />
                <ErrorMessage name="city" class="text-red-600 text-sm" as="p" />
              </div>

              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white"
                  >Phone</label
                >
                <Field
                  type="text"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your phone number"
                  required
                />
                <ErrorMessage name="phone" class="text-red-600 text-sm" as="p" />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-base px-5 py-2.5 md:py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <template v-if="isLoading">loading...</template>
                <template v-else>Save</template>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAddressStore } from '@/assets/Stores/AddressStore'
import { useAuthStore } from '@/assets/Stores/AuthStore'
import AddressComponent from '@/components/AddressComponent.vue'
import axios from 'axios'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import * as Yup from 'yup'

const successMessage = ref('')
const apiError = ref('')
const isLoading = ref(false)
const deleteAddressError = ref('')
const useAddress = useAddressStore()
const myAddresses = computed(() => useAddress.addresses)
const AddressMode = useAddress.AddressMode
const addressSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  details: Yup.string().required('Details is required'),
  city: Yup.string().required('City is required'),
  phone: Yup.string().required('Phone is required'),
})

const addressModal = ref(false)
function toggleAddressModal() {
  addressModal.value = !addressModal.value
}

async function addAddress(values) {
  try {
    isLoading.value = true
    const res = await axios.post('https://ecommerce.routemisr.com/api/v1/addresses', values, {
      headers: {
        token: useAuthStore().token,
      },
    })
    console.log(res)
    successMessage.value = res.data.message
    await useAddress.getAddresses() // Wait for addresses to update
    toggleAddressModal() // Close the modal after success
    isLoading.value = false
  } catch (err) {
    console.log(err)
    apiError.value = err.response.data.message
    isLoading.value = false
  }
}

async function deleteAddress(id) {
  try {
    const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
      headers: {
        token: useAuthStore().token,
      },
    })
    console.log(res)
    await useAddress.getAddresses()
  } catch (err) {
    console.log(err)
    deleteAddressError.value = err.response.data.message
  }
}
onMounted(async () => {
  useAddress.setAddressMode(true)
  await useAddress.getAddresses()
  console.log(myAddresses)
})
</script>

<style lang="scss" scoped></style>
