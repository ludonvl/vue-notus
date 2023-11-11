<template>
  <div>
    
    <sidebar />
    <div class="md:ml-64 bg-blueGray-100">
      <div class="md:px-4 mx-auto w-full min-h-screen flex flex-col justify-between">
        <div :class="{'py-4': hasPadding}">
          <router-view />
        </div>
        <footer-admin />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
export default {
  name: "admin-layout",
  components: {
    Sidebar,
    FooterAdmin,
  },
  computed: {
    hasPadding() {
      return Object.keys(this.$route.params).length === 0
    }
  }
};
</script>
