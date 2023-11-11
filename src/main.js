import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import BackPlugin from '@/plugins/BackPlugin';

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
import "vue-multiselect/dist/vue-multiselect.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Discover from "@/views/admin/Discover.vue";
import Statistics from "@/views/admin/Statistics.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";
import Drink from "@/views/admin/Drink.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";

import Multiselect from 'vue-multiselect'

// routes

const routes = [
  {
    path: "/drink",
    redirect: "/drink/discover",
    component: Admin,
    children: [
      {
        path: "/drink/discover",
        component: Discover,
      },
      {
        path: "/drink/statistics",
        component: Statistics,
      },
      {
        path: "/drink/settings",
        component: Settings,
      },
      {
        path: "/drink/tables",
        component: Tables,
      },
      {
        path: "/drink/maps",
        component: Maps,
      },
      {
        path: "/drink/:id",
        component: Drink,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        name: 'register',
        component: Register,
      },
    ],
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/",
    component: Index,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App)


app.use(router);

app.use(VueAxios, axios);
app.use(BackPlugin);
app.component('multiselect', Multiselect);

app.mount("#app");