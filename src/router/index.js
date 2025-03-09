import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MainLayout from '@/Layouts/MainLayout.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Category from '@/pages/category/Category.vue'
import Brands from '@/pages/Brands.vue'
import NotFound from '@/pages/NotFound.vue'
import Cart from '@/pages/Cart.vue'
import { useAuthStore } from '../assets/Stores/AuthStore'
import ProductDetails from '@/pages/products/ProductDetails.vue'
import Payment from '@/pages/payment and orders/Payment.vue'
import AllOrders from '@/pages/Account/AllOrders.vue'
import CategorySubcategories from '@/pages/category/categorySubcategories.vue'
import Wishlist from '@/pages/Account/Wishlist.vue'
import ForgetPassword from '@/pages/ForgetPassword/ForgetPassword.vue'
import ResetPassword from '@/pages/ForgetPassword/ResetCode.vue'
import AccountLayout from '@/Layouts/AccountLayout.vue'
import AccountDetails from '@/pages/Account/AccountDetails.vue'
import UpdateAccount from '@/pages/Account/UpdateAccount.vue'
import ResetCode from '@/pages/ForgetPassword/ResetCode.vue'
import UpdatePassword from '@/pages/Account/UpdatePassword.vue'
import MyAddresses from '@/pages/Account/MyAddresses.vue'
import ChooseAddress from '@/pages/payment and orders/ChooseAddress.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { needLogin: true },
        },
        {
          path: '/brands',
          name: 'brands',
          component: Brands,
          meta: { needLogin: true },
        },
        {
          path: '/category',
          name: 'category',
          component: Category,
          meta: { needLogin: true },
        },

        {
          path: '/cart',
          name: 'cart',
          component: Cart,
          meta: { needLogin: true },
        },
        {
          path: '/products/:id',
          name: 'product-details',
          component: ProductDetails,
          meta: { needLogin: true },
        },
        {
          path: '/chooseAddress',
          name: 'chooseAddress',
          component: ChooseAddress,
          meta: { needLogin: true },
        },
        {
          path: '/payment',
          name: 'payment',
          component: Payment,
          meta: { needLogin: true },
        },

        {
          path: '/category/:id',
          name: 'categorysubcategories',
          component: CategorySubcategories,
          meta: { needLogin: true },
          props: true,
        },

        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: { needLogin: false },
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
          meta: { needLogin: false },
        },
        {
          path: '/forgetpassword',
          name: 'forgetpassword',
          component: ForgetPassword,
          meta: { needLogin: false },
        },
        {
          path: '/resetpassword',
          name: 'resetpassword',
          component: ResetCode,
          meta: { needLogin: false },
        },
        {
          path: '/updatepassword',
          name: 'updatepassword',
          component: ResetPassword,
          meta: { needLogin: false },
        },
        {
          path: '/:notfound(.*)',
          component: NotFound,
        },
      ],
    },
    {
      path: '/myaccount',
      component: AccountLayout,
      meta: { needLogin: true },
      children: [
        {
          path: '/myaccount/accountdetails',
          name: 'accountdetails',
          component: AccountDetails,
          meta: { needLogin: true },
        },
        {
          path: '/myaccount/updateaccount',
          name: 'updateAccount',
          component: UpdateAccount,
          meta: { needLogin: true },
        },
        {
          path: '/myaccount/updatepassword',
          name: 'updatePassword',
          component: UpdatePassword,
          meta: { needLogin: true },
        },
        {
          path: '/myaccount/wishlist',
          name: 'wishlist',
          component: Wishlist,
          meta: { needLogin: true },
        },
        {
          path: '/chooseAddress/allorders',
          name: 'allorders',
          component: AllOrders,
          meta: { needLogin: true },
        },
        {
          path: '/myaccount/addresses',
          name: 'addresses',
          component: MyAddresses,
          meta: { needLogin: true },
        },
      ],
    },
  ],
})
router.beforeEach((to, _from, next) => {
  let nextRoute = null
  const authStore = useAuthStore()
  if (to.meta.needLogin === true && !authStore.isloggedIn) {
    nextRoute = { name: 'login' }
  } else if (to.meta.needLogin === false && authStore.isloggedIn) {
    nextRoute = { name: 'home' }
  }
  next(nextRoute)
})

export default router
