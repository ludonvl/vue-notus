<template>
  <footer
    class="pb-6"
    :class="[
      absolute ? 'absolute w-full bottom-0 bg-blueGray-800' : 'relative',
    ]"
  >
    <div class="container mx-auto px-4">
      <hr class="mb-6 border-b-1 border-blueGray-600" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4">
          <div
            class="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left"
          >
            © {{ date }}, fait par
            <a
              href="https://cv.ludovicnouvel.fr"
              target="_blank"
              class="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
            >
              ludonvl
            </a>
          </div>
        </div>
        <div class="w-full md:w-8/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end justify-center">
            <li>
              <a
                class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                href="https://linkedin.com/ludovicnouvel"
                target="_blank"
              >
                <i
                  class="lg:text-blueGray-200 text-blueGray-400 fab fa-linkedin text-lg leading-lg"
                />
                <span class="lg:hidden inline-block ml-2">LinkedIn</span>
              </a>
            </li>

            <li>
              <a
                class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                href="https://github.com/ludonvl"
                target="_blank"
              >
                <i
                  class="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg"
                />
                <span class="lg:hidden inline-block ml-2">Star</span>
              </a>
            </li>
          </ul>
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
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
