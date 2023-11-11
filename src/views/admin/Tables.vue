<template>
  <div class="flex flex-wrap">
    <div class="w-full mb-12">
      <card-table
        :title="title"
        :columns="columns"
        :items="items"
      >
        <template #header-right>
          test
        </template>
      </card-table>
    </div>
  </div>
</template>
<script>
import CardTable from "@/components/Cards/CardTable.vue";
import axios from 'axios';

export default {
  components: {
    CardTable,
  },
  data() {
    return {
      title: "Mes boissons",
      drinks: [],
      columns: [
        {
          key: 'name',
          label: 'Nom'
        },
        {
          key: 'category',
          label: 'Categorie'
        },
        {
          key: 'action',
          label: ''
        },
      ]
    }
  },

  computed: {
    items() {
      return this.drinks.map((drink) => {
        return {
          ...drink,
          'action': null
        }
      });
    }
  },

  created() {
    const appClient = axios.create({
      baseURL: `http://localhost:8000/api`,
      withCredentials: true
    });

    appClient.get(`/drink`).then(({data}) => {
      console.log(data)
      this.drinks = data.drinks
    });
  }
};
</script>
