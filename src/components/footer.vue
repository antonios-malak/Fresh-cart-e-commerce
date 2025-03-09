<template>
  <footer class="bg-gray-100 shadow-inner mt-5">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col items-center gap-4">
        <!-- Get App Section -->
        <div class="space-y-3 w-full max-w-lg">
          <h3 class="text-lg md:text-xl text-gray-700 tracking-tight">Get the FreshCart App</h3>
          <p class="text-gray-500 text-sm md:text-base">
            We will send you a link, open it on your phone to download the app
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <input type="email" placeholder="Email..."
              class="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200" />
            <button
              class="w-full sm:w-auto whitespace-nowrap px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md">
              Share app link
            </button>
          </div>
        </div>
      </div>
      <!-- Payment Partners -->
      <div
        class="flex flex-col lg:flex-row justify-between items-center border-y border-gray-300 py-4 mt-4 space-y-4 lg:space-y-0">
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
          <h4 class="text-base lg:text-lg text-gray-700">Payment Partners</h4>
          <div class="flex justify-center space-x-4 sm:space-x-6 items-center">
            <img src="../assets/images/Amazon_Pay-Logo.wine.svg" alt="Amazon"
              class="h-4 sm:h-6 object-contain hover:opacity-80 transition-opacity" />
            <img src="../assets/images/Mastercard-logo.svg.png" alt="Mastercard"
              class="h-4 sm:h-6 object-contain hover:opacity-80 transition-opacity" />
            <img src="../assets/images/Visa-Logo-2006.png" alt="Visa"
              class="h-4 sm:h-6 object-contain hover:opacity-80 transition-opacity" />
          </div>
        </div>

        <!-- App Stores -->
        <div class="flex flex-col md:flex-row gap-3 md:gap-5 items-center">
          <h4 class="text-base lg:text-lg text-gray-700">Get deliveries with FreshCart</h4>
          <div class="flex justify-center space-x-3">
            <img src="../assets/images/app-store.png" alt="App Store"
              class="h-6 sm:h-8 object-contain hover:opacity-80 transition-opacity transform hover:scale-105 cursor-pointer" />
            <img src="../assets/images/Google_Play_Store_badge_EN.svg.png" alt="Google Play"
              class="h-6 sm:h-8 object-contain hover:opacity-80 transition-opacity transform hover:scale-105 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
