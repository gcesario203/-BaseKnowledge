<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{user.name}}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="User"></Gravatar>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin"><i class="fa fa-cogs"></i>Administração</router-link>
            <a href="#"><i class="fa fa-sign-out"></i>Sair</a>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropdown',
    components:{Gravatar},
    computed: mapState(['user'])
}
</script>

<style>
    .user-dropdown{
        position: relative;
        height: 100%;
        transition: 500ms;
    }

    .user-button{
        display: flex;
        align-items: center;
        color: black;
        font-weight: 100;
        height: 100%;
        padding: 0 20px;
    }

    .user-dropdown:hover{
        background-color: rgba(0,0,0,0.1);
    }

    .user-dropdown-img{
        margin: 0 10px;
    }

    .user-dropdown-img>img{
        max-height: 37px;
        border-radius: 5px;
    }

    .user-dropdown-content{
        position: absolute;
        right: 0;
        background: #f9f9f9;
        min-width: 170px;
        box-shadow: 0 8px 16px 0px rgba(#000000, #000000, #000000, 0.2);
        padding: 10px;
        z-index: 1;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5 linear;
        transition: 500ms;
    }

    .user-dropdown:hover
    .user-dropdown-content{
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a{
        color: black;
        text-decoration: none;
        transition: 500ms;
        padding: 10px;
    }
    .user-dropdown-content a:hover{
        text-decoration: none;
        background-color: #ededed;
    }
</style>