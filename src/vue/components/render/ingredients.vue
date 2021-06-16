<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Something bad happened</div>
    <div v-else>
      <div v-if="ingredients">
        <div v-for="item in productIngredients" :key="item.id">
          <img :src="item.image.url" />
          <h3 class="text-2xl">{{ item.title }}</h3>
          <h4>{{ item.subTitle }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../../lib/datocms';

export default {
  name: 'Ingredients',
  props: {
    handle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ingredients: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    productIngredients() {
      return this.ingredients.product.ingredients;
    },
  },
  async mounted() {
    try {
      this.ingredients = await request({
        query: `
      {
        product(filter: {shopifyReference: {eq: "${this.handle}"}}) {
          id
          shopifyReference
          ingredients {
            id
            description
            title
            subTitle
            image {
              url
            }
          }
        }
      }
         
      `,
      });
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
};
</script>
