<template>
  <div
    class="block w-auto p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300"
  >
    <div class="flex items-center justify-between mb-2">
      <h5 class="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ address.name }}
      </h5>
      <button
        v-if="useAddress.AddressMode"
        @click="handleDeleteAddress(address._id)"
        class="rounded-full group flex items-center justify-center focus-within:outline-red-500"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="sm:w-[28px] sm:h-[28px]"
        >
          <circle
            class="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
            cx="17"
            cy="17"
            r="17"
            fill=""
          />
          <path
            class="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
            d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
            stroke="#EF4444"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <div class="space-y-2">
      <p
        class="font-normal text-sm sm:text-base text-gray-700 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-md"
      >
        <span class="font-bold">Address:</span> {{ address.details }}
      </p>
      <p
        class="font-normal text-sm sm:text-base text-gray-700 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-md"
      >
        <span class="font-bold">City:</span> {{ address.city }}
      </p>
      <p
        class="font-normal text-sm sm:text-base text-gray-700 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-md"
      >
        <span class="font-bold">Phone Number:</span> {{ address.phone }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAddressStore } from '@/assets/Stores/AddressStore'

defineProps(['address', 'AddressMode'])
const emit = defineEmits(['deleteAddress'])
const useAddress = useAddressStore()

const handleDeleteAddress = (id) => {
  emit('deleteAddress', id)
}
</script>

<style lang="scss" scoped></style>
