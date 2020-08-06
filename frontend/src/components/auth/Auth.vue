<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="Logo">
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro':'Login'}}</div>

            <input type="text" v-if="showSignup" v-model="user.name" placeholder="Nome">
            <input v-model="user.email" name="email" placeholder="E-mail">
            <input type="password" v-model="user.password" name="password" placeholder="Senha">
            <input v-if="showSignup" type="password" v-model="user.confirmPassword" placeholder="Confirme sua Senha">


            <button v-if="showSignup" @click="signUp">Cadastrar</button>
            <button v-else @click="signIn">Log in</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já Possui cadastro? Clique aqui para entrar em sua conta</span>
                <span v-else>Não possuí cadastro? Clique aqui para criar sua conta</span>
            </a>
        </div>
    </div>
</template>

<script>
import {showError,userKey,baseApiUrl} from '../../global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function(){
        return{
            showSignup: false,
            user:{}
        }
    },
    methods:{
        signIn(){
            axios
            .post(`${baseApiUrl}/signin`, this.user)
            .then(res=>{
                this.$store.commit('setUser', res.data)
                localStorage.setItem(userKey, JSON.stringify(res.data))
                this.$router.push({path:'/'})
            })
            .catch(showError)
        },
        signUp(){
            axios
            .post(`${baseApiUrl}/signup`, this.user)
            .then(()=>{
                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.showSignup = false
            })
        }
    }
}
</script>

<style>
    .auth-content{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .auth-modal{
        background-color: white;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(1, 1, 1, 0.15);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .auth-title{
        font-weight: 100;
        font-size: 1.2rem;
        margin: 10px 0 15px 0;
    }

    .auth-modal input{
        border: none;
        width: 100%;
        padding: 5px;
        margin-bottom: 10px;
        outline: none;
    }

    .auth-modal button{
        align-self: flex-end;
        background-color: slateblue;
        color: white;
        padding: 5px 15px;
    }

    .auth-modal a{
        margin-top: 35px;
    }

    .auth-modal hr{
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
                                           rgba(120,120,120,0)
                                             rgba(120,120,120,0.75)
                                            rgba(120,120,120,0));
    }
</style>