<template>
  <div v-if="drink">
    <div class="relative overflow-hidden banner">
      <div>
        <img class="w-full" :src="drink.strDrinkThumb" />
      </div>
      <div class="absolute top-0 left-0 right-0 bottom-0 z-2 overlay"></div>
      <div class="absolute top-0 left-0 right-0 bottom-0 z-3 w-full h-full">
        <div class="px-4 mx-auto">
          <div class="text-center mt-4">
            <div class="text-white font-bold text-4xl py-10">{{drink.strDrink}}</div>
            <button
              v-if="!addedDrink"
              class="bg-orange-200 text-black active:bg-emerald-600 font-bold uppercase text-base px-6 py-5 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="toggleAddDrink"
            >
              <i class="fas fa-plus"></i> Ajouter a mes boissons
            </button>
            <button
              v-else
              class="bg-red-200 text-black active:bg-red-400 font-bold uppercase text-base px-6 py-5 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="toggleAddDrink"
            >
              <i class="fas fa-times"></i> Supprimer de mes boissons
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4">
      <div class="flex flex-wrap justify-between w-full">
        <div class="flex">
          <h1 class="font-bold mr-2">Categorie</h1>
          <div>{{ `${drink.strCategory} (${drink.strAlcoholic})` }}</div>
        </div>
        <div class="flex">
          <h1 class="font-bold mr-2">Type de verre</h1>
          <div>{{ drink.strGlass }}</div>
        </div>
      </div>
      <div class="flex flex-wrap mt-2">
        <div>
          <h1 class="font-bold">Instructions</h1>
          <div>{{ drink.strInstructions }}</div>
        </div>
      </div> 
      <div class="flex mt-2">
        <h1 class="font-bold">Ingrédients</h1>
        <div class="flex flex-col">
          <div v-for="(ingredient, index) in getIngredients" :key="index">
            {{drink[getMeasures[index]] }} {{ drink[ingredient] }}
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "drink-page",

  data() {
    return {
      drink: null,
      drinkId: null,
      addedDrink: false,
    }
  },

  computed: {
    getMeasures() {
      let keysDrink = Object.keys(this.drink);

      keysDrink = keysDrink.filter((value)=> {
        return value.includes('strMeasure')
      });

      return keysDrink;
    },

    getIngredients() {
      let keysDrink = Object.keys(this.drink);

      keysDrink = keysDrink.filter((value)=> {
        return value.includes('strIngredient')
      });

      return keysDrink;
    }
  },

  methods: {
    toggleAddDrink() {
      const appClient = axios.create({
        baseURL: `http://localhost:8000/api`,
        withCredentials: true
      });

      if (!this.addedDrink) {
        appClient.post('/drink', {
          api_drink_id: this.drink.idDrink,
          category: this.drink.strCategory,
          name: this.drink.strDrink,
        }).then(({data}) => {
          console.log(data)
          this.drinkId = data.resource.id
          this.addedDrink = true;
        });
      } else {
        appClient.delete(`/drink/${this.drinkId}`)
        .then(() => {
          this.addedDrink = false;
        });
      }
    },
  },

  created() {
    const id = this.$route.params.id;

    const appClient = axios.create({
      baseURL: `http://localhost:8000/api`,
      withCredentials: true
    });

    appClient.get(`/drink?api_drink_id=${id}`).then(({data}) => {
      this.addedDrink = Boolean(data.drinks.length);
      if (data.drinks.length) {
        this.drinkId = data.drinks[0].id
      }
    });

    this.$http.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then(({data}) => {
      this.isLoaded = true;
      this.drink = data.drinks[0]
    });
  }
};
</script>
<style lang="css" scoped>
.banner {
  margin-left: -2.5rem;
  margin-right: -2.5rem;
  height: 250px;
  max-height: 250px;
  border-bottom: 5px solid rgba(20,20,20,1);
}

.overlay {
  background-color:rgba(0,0,0,.6)
}
</style>
