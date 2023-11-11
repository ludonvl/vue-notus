<template>
  <div>
    <div class="container mx-auto">
      <div>
        <div class="flex">
          <div class="relative flex flex-wrap items-stretch">
            <span
              class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
            >
              <i class="fas fa-search"></i>
            </span>
            <input
              v-model="search"
              type="text"
              placeholder="Rechercher une boisson"
              class="search-input border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10 min-h-2"
              @input="onSearch"
            />
          </div>
          <div class="flex flex-1">
            <multiselect
              v-model="glass"
              :options="getGlasses"
              placeholder="Type de verre"
              :show-labels="false"
              class="mx-4"
              @select="selectFilter('g', $event)"
              @remove="removeFilter"
            />
            <multiselect
              v-model="alcoholic"
              :options="getAlcoholic"
              placeholder="Alcoholic"
              :searchable="false"
              :show-labels="false"
              class="mr-4"
              @select="selectFilter('a', $event)"
              @remove="removeFilter"
            />
            <multiselect
              v-model="ingredient"
              :options="getIngredients"
              placeholder="Ingredients"
              :show-labels="false"
              @select="selectFilter('i', $event)"
              @remove="removeFilter"
            />
          </div>
        </div>
        <template v-if="isLoaded">
          <div v-if="filterDrinks.length > 0" class="flex mt-4">
            <div
              v-for="drink in filterDrinks"
              :key="drink.idDrink"
              class="flex-1 horizontal-list-item cursor-pointer"
              @click="goDrink(drink.idDrink)"
            >
              <div>
                <img
                  :src="`${drink.strDrinkThumb}/preview`"
                  class="horizontal-list-item-img shadow rounded align-middle border-none" 
                />
              </div>
              <h6 class="text-l font-normal leading-normal mt-0 mb-2 text-emerald-800 text-center">
                {{drink.strDrink}}
              </h6>
            </div>
          </div>
          <template v-if="filterDrinks.length === 0">
            <div v-if="fillCategories.length === 0" class="mt-4">
              Aucune boisson ne correspond à votre recherche.
            </div>
            <div v-for="(category, index) in fillCategories" :key="index" class="flex flex-col">
              <h5 class="text-2xl font-normal leading-normal mt-4 text-emerald-800 mb-2">
                {{ category.strCategory }}
              </h5>
              <div class="horizontal-list">
                <div
                  v-for="drink in drinks[category.strCategory]"
                  :key="drink.idDrink"
                  class="horizontal-list-item cursor-pointer"
                  @click="goDrink(drink.idDrink)"
                >
                  <div>
                    <img
                      :src="`${drink.strDrinkThumb}/preview`"
                      class="horizontal-list-item-img shadow rounded align-middle border-none" 
                    />
                  </div>
                  <h6 class="text-l font-normal leading-normal mt-0 mb-2 text-emerald-800 text-center">
                    {{drink.strDrink}}
                  </h6>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
</div>
</template>
<script>
import { groupBy, debounce } from 'lodash';

export default {
  name: "discover-page",

  data() {
    return {
      isLoaded: false,
      search: null,
      filterDrinks: [],
      drinks: {},
      filters: {
        'glasses': [],
        'ingredients': [],
        'alcoholic': []
      },
      categories: null,
      glass: null,
      ingredient: null,
      alcoholic: null
    }
  },

  computed: {
    getGlasses() {
      return this.filters.glasses.map((glass) => {
        return glass.strGlass
      });
    },
    getIngredients() {
      return this.filters.ingredients.map((ingredient) => {
        return ingredient.strIngredient1
      });
    },
    getAlcoholic() {
      return this.filters.alcoholic.map((alcoholic) => {
        return alcoholic.strAlcoholic
      });
    },
    fillCategories() {
      if (Object.values(this.drinks).length > 0) {
        return this.categories.filter((category) => {
          if (category.strCategory in this.drinks && this.drinks[category.strCategory]) {
            return this.drinks[category.strCategory].length > 0;
          }
          return false;
        });
      }

      return [];
    }
  },

  methods: {
    goDrink(id) {
      this.$router.push(`/drink/${id}`);
    },
    
    onSearch: debounce(function (value) {
      const search = value.target.value;
      this.glass = null;
      this.ingredient = null;
      this.alcoholic = null;

      if (search) {
        this.$http.get(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${value.target.value}`).then(({data}) => {
          this.setDrinks(data.drinks);
        })
      } else {
        this.getAllDrinks();
      }

      console.log(value.target.value)
    }, 500),

    getFilters(filter) {
      return this.$http.get(`https://thecocktaildb.com/api/json/v1/1/list.php?${filter}=list`);
    },

    getAllDrinks() {
      this.categories.forEach((category) => {
        this.$http.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?c=${category.strCategory}`).then(({data}) => {
          this.drinks[category.strCategory] = data.drinks;
        });
      });
    },

    setDrinks(drinks) {
        const groupedDrinks = groupBy(drinks, 'strCategory');

        this.categories.forEach((category) => {
          this.drinks[category.strCategory] = groupedDrinks[category.strCategory];
        });
    },

    selectFilter(filter, value) {
      if (filter === 'g') {
        this.alcoholic = null;
        this.ingredient = null;       
      } else if (filter === 'a') {
        this.glass = null;
        this.ingredient = null;
      } else if (filter === 'i') {
        this.glass = null;
        this.alcoholic = null;
      }

      this.$http.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?${filter}=${value}`).then(({data}) => {
        this.filterDrinks = data.drinks
      });
    },
    removeFilter() {
      this.filterDrinks = [];
    }
  },

  created() {
    Promise.all([
      this.getFilters('c'),
      this.getFilters('g'),
      this.getFilters('i'),
      this.getFilters('a'),
    ]).then((values) => {
      this.categories = values[0].data.drinks;
      this.filters.glasses = values[1].data.drinks;
      this.filters.ingredients = values[2].data.drinks;
      this.filters.alcoholic = values[3].data.drinks;

      this.getAllDrinks();
      this.isLoaded = true;
    });
    
  }
};
</script>
<style scoped>
.horizontal-list {
  width: 100%;
  overflow-x: scroll;
  display: flex;
}

.horizontal-list-item {
  width: 200px;
  min-height: 150px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.horizontal-list-item-img {
  width: 100px;
  height: 100px;
  min-width: 100px;
}

.search-input {
  min-height: 40px;
}
</style>