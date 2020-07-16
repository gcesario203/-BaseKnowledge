<template>
  <div class="article-admin">
    <b-form>
      <input type="hidden" id="article-id" v-model="article.id"/>
      <b-form-group label="Nome:" label-for="article-name">
            <b-form-input
              id="article-name"
              type="text"
              v-model="article.name"
              :readonly="mode === 'remove'"
              required
              placeholder="Digite o nome da categoria"
            ></b-form-input>
          </b-form-group>
      <b-form-group label="Descrição:" label-for="article-description">
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          :readonly="mode === 'remove'"
          placeholder="Descrição do artigo"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Link da imagem:" label-for="article-imageUrl">
        <b-form-input
          id="article-imageUrl"
          type="text"
          v-model="article.imageUrl"
          :readonly="mode === 'remove'"
          placeholder="Link da imagem"
        ></b-form-input>
      </b-form-group>
      <b-form-group v-show="mode === 'save'" label="Usuário:" label-for="article-userId">
        <b-form-select id="article-userId" :options="users" v-model="article.userId"></b-form-select>
      </b-form-group>
      <b-form-group v-show="mode === 'save'" label="Categoria:" label-for="article-categoryId">
        <b-form-select id="article-categoryId" :options="categories" v-model="article.categoryId"></b-form-select>
      </b-form-group>
      <b-form-group v-show="mode === 'save'" label="Conteúdo:" label-for="article-content">
        <VueEditor v-model="article.content" placeholder="Conteudo do artigo"></VueEditor>
      </b-form-group>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Remover</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-table hover striped :items="articles" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button variant="warning" @click="loadArticle(row.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(row.item,'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit">
    </b-pagination>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import { baseApiUrl, showError } from "../../global";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: () => {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sorted: true },
        { key: "name", label: "Nome", sorted: true },
        { key: "description", label: "Descrição", sorted: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadArticles() {
      axios.get(`${baseApiUrl}/articles/?page=${this.page}`).then(res => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },

    reset() {
      (this.mode = "save"), (this.article = {}), this.loadArticles();
    },

    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";

      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    remove() {
      const id = this.article.id;

      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios.get(`${baseApiUrl}/articles/${article.id}`).then(res => {
        this.article = res.data;
      });
    },

    loadCategories() {
      axios.get(`${baseApiUrl}/categories`).then(res => {
        // this.categories = res.data;
        this.categories = res.data.map(category => {
          return { value: category.id, text: category.path };
        });
      });
    },

    loadUsers() {
      axios.get(`${baseApiUrl}/users`).then(res => {
        this.users = res.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    }
  },
  watch:{
      page(){
          this.loadArticles()
      }
  },
  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  }
};
</script>

<style>
</style>