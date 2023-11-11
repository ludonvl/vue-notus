<template>
  <footer class="block">
    <div class="container mx-auto">
      <hr class="border-b-1 border-blueGray-200" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 p-4">
          <div
            class="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left"
          >
            © {{ date }}, fait par
            <a
              href="https://cv.ludovicnouvel.fr"
              target="_blank"
              class="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
            >
              ludonvl
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
