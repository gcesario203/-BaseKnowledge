<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder-o" :main=" category.name" sub="Categoria"></PageTitle>
    <ul>
      <li v-for="article in articles" :key="article.id">{{article.name}}</li>
    </ul>
    <div class="load-more">
      <button
        v-if="loadMore"
        class="btn btn-lg btn-outline-primary"
        @click="getArticles"
      >Carregar mais artigos</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../global";
import PageTitle from "../template/PageTitle";

export default {
  name: "ArticlesByCategory",
  components: { PageTitle },
  data: () => {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true,
      headers: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "imageUrl", label: "Image,", sortable: true },
        { key: "author", label: "Autor", sortable: true }
      ]
    };
  },
  methods: {
    getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`;
      axios.get(url).then(res => {
        this.category = res.data;
      });
    },
    getArticles() {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`;

      axios.get(url).then(res => {
        this.articles = this.articles.concat(res.data);
        this.page++;

        if (res.data.length === 0) {
          this.loadMore = false;
        }
      });
    }
  },
  mounted() {
    this.category.id = this.$route.params.id;
    this.getCategory();
    this.getArticles();
  }
};
</script>

<style>
    .articles-by-category ul {
    list-style: none;
    padding: 0;
    }

    .articles-by-category .load-more{
        display: flex;
        justify-content: center;

        margin-top: 25px;
    }
</style>