import { createRouter, createWebHistory } from "vue-router";
import store from "@/store"; // Import the Vuex store to check authentication state

import Home from "@/components/pages/home/Home.vue";
import Login from "@/components/pages/auth/LoginForm.vue";
import Register from "@/components/pages/auth/RegisterForm.vue";
import Categories from "@/components/pages/categories/Categories.vue";
import NotFound from "@/components/pages/notFound/NotFound.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/categories", component: Categories },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Public routes (accessible without authentication)
  const publicPages = ["/", "/login", "/register"];

  // Check if the current route is public or requires authentication (protected)
  const protectedPages = !publicPages.includes(to.path);

  const isAuthenticated = store.getters.isAuthenticated;

  // If the route requires authentication and user is not authenticated, redirect to /register
  if (protectedPages && !isAuthenticated) {
    return next("/register");
  }
  // Otherwise, proceed to the route
  next();
});

export default router;
