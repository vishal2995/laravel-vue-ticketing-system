import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/authStore";
import TicketView from '../views/TicketView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/login",
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: TicketView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guest: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token || !!Cookies.get("auth_token"); // Check if user is logged in

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.guest && isAuthenticated) {
    next("/tickets");
  } else {
    next();
  }
});

export default router
