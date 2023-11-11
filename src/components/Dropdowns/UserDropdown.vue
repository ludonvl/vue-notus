<template>
  <div class="w-full">
    <div v-if="user" class="w-full">
      <a
        class="text-blueGray-500 block"
        href="#pablo"
        ref="btnDropdownRef"
        v-on:click="toggleDropdown($event)"
      >
        <div class="items-center flex w-full">
          <span
            class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
          >
            <img
              alt="..."
              class="w-full rounded-full align-middle border-none shadow-lg"
              :src="image"
            />
          </span>
          <span class="ml-2 text-sm text-white font-bold truncate width-name">{{ user.name }}</span>
        </div>
      </a>
      <div
        ref="popoverDropdownRef"
        class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        v-bind:class="{
          hidden: !dropdownPopoverShow,
          block: dropdownPopoverShow,
        }"
      >
        <router-link
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          to="/profile"
        >
          Profile
        </router-link>
        <router-link
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          to="/drink/settings"
        >
          Paramètres
        </router-link>
        <router-link
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          to="/drink/statistics"
        >
          Statistics
        </router-link>
        <router-link
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          to="/drink/discover"
        >
          Aide
        </router-link>
        <div class="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="javascript:void(0);"
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          @click="logout"
        >
          Se deconnecter
        </a>
      </div>
    </div>
    <div v-else class="flex justify-center w-full">
      <button
        class="bg-orange-200 text-black active:bg-emerald-600 px-4 py-2 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
            <router-link to="/auth/login">
              Se connecter
            </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "@/assets/img/team-1-800x800.jpg";

export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dropdownPopoverShow: false,
      image: image,
    };
  },
  methods: {
    goLogin() {
      this.$router.push('login');
    },

    logout() {
      this.$router.push('/');
    },

    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "top",
        });
      }
    },
  },
};
</script>
<style scoped>
.width-name {
  width: 150px;
}
</style>