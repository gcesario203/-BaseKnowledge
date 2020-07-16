<template>
  <div class="user-admin">
    <b-form>
      <input type="hidden" id="user-id" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              :readonly="mode === 'remove'"
              required
              placeholder="Digite seu nome"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              :readonly="mode === 'remove'"
              required
              placeholder="Digite seu e-mail"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3">Administrador</b-form-checkbox>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              :readonly="mode === 'remove'"
              required
              placeholder="Digite sua senha"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de senha:" label-for="user-confirmPassword">
            <b-form-input
              id="user-confirmPassword"
              type="password"
              v-model="user.confirmPassword"
              :readonly="mode === 'remove'"
              required
              placeholder="Confirme sua senha"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Remover</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table hover striped :items="users" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button variant="warning" @click="loadUser(row.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadUser(row.item,'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit">
    </b-pagination>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../global";

export default {
  name: "UserAdmin",
  data: () => {
    return {
      mode: "save",
      user: {},
      users: [],
      page:1,
      limit:0,
      count:0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-Mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: value => (value ? "Sim" : "Não")
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadUsers() {
      axios.get(`${baseApiUrl}/users/?page=${this.page}`).then(res => {
        this.users = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    }
  },
  watch:{
    page(){
      this.loadUsers()
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>