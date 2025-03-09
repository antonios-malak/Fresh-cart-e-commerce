<template>
  <div>
    <Navbar />
    <aside
      class="w-full md:hidden bg-gray-50 p-2 flex flex-wrap gap-2 text-[clamp(0.7rem,2vw,1rem)]"
    >
      <RouterLink
        class="whitespace-nowrap p-[clamp(0.5rem,1vw,1rem)] text-main hover:text-green-700"
        :to="{ name: 'accountdetails' }"
        >Account Details</RouterLink
      >
      <RouterLink
        class="whitespace-nowrap p-[clamp(0.5rem,1vw,1rem)] text-main hover:text-green-700"
        :to="{ name: 'allorders' }"
        >My Orders</RouterLink
      >
      <RouterLink
        class="whitespace-nowrap p-[clamp(0.5rem,1vw,1rem)] text-main hover:text-green-700"
        :to="{ name: 'wishlist' }"
        >My Wishlist</RouterLink
      >
      <RouterLink
        class="whitespace-nowrap p-[clamp(0.5rem,1vw,1rem)] text-main hover:text-green-700"
        :to="{ name: 'addresses' }"
        >My Addresses</RouterLink
      >
      <RouterLink
        class="whitespace-nowrap p-[clamp(0.5rem,1vw,1rem)] text-main hover:text-green-700"
        :to="{ name: 'updateAccount' }"
        >Update Info</RouterLink
      >
      <RouterLink
        class="whitespace-nowrap p-[clamp(0.5rem,1vw,1rem)] text-main hover:text-green-700"
        :to="{ name: 'updatePassword' }"
        >Update Password</RouterLink
      >
    </aside>
    <div class="account-layout block md:grid">
      <aside class="sidebar hidden md:block md:w-auto">
        <RouterLink
          class="block p-[clamp(0.5rem,1vw,1rem)] mb-2 text-main hover:text-green-700"
          :to="{ name: 'accountdetails' }"
          >Account Details</RouterLink
        >
        <RouterLink
          class="block p-[clamp(0.5rem,1vw,1rem)] mb-2 text-main hover:text-green-700"
          :to="{ name: 'allorders' }"
          >My Orders</RouterLink
        >
        <RouterLink
          class="block p-[clamp(0.5rem,1vw,1rem)] mb-2 text-main hover:text-green-700"
          :to="{ name: 'wishlist' }"
          >My Wishlist</RouterLink
        >
        <RouterLink
          class="block p-[clamp(0.5rem,1vw,1rem)] mb-2 text-main hover:text-green-700"
          :to="{ name: 'addresses' }"
          >My Addresses</RouterLink
        >
        <RouterLink
          class="block p-[clamp(0.5rem,1vw,1rem)] mb-2 text-main hover:text-green-700"
          :to="{ name: 'updateAccount' }"
          >Update Account info</RouterLink
        >
        <RouterLink
          class="block p-[clamp(0.5rem,1vw,1rem)] mb-2 text-main hover:text-green-700"
          :to="{ name: 'updatePassword' }"
          >Update Password</RouterLink
        >
      </aside>
      <main class="content overflow-auto scrollbar-hide w-full">
        <RouterView> </RouterView>
      </main>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '@/components/footer.vue'
import Navbar from '@/components/navbar.vue'
</script>

<style scoped>
.account-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  padding: 20px;
}
.sidebar {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
}
.content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
a.router-link-active.router-link-exact-active {
  background-color: #0a820a;
  color: white;
  border-radius: 5px;
  transition: 0.3s;
}
</style>
