<template>
    <div class="header">
        <a class="toggle" @click="toggleMenu()" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title"><router-link to="/">{{title}}</router-link></h1>
        <UserDropdown v-if="!hideUserDropdown"></UserDropdown>
    </div>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    components:{UserDropdown},
    props:{
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed:{
        icon(){
            return this.$store.state.isMenuVisible?"fa-angle-left":"fa-angle-down"
        }
    },
    methods:{
        toggleMenu(){
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header{
        grid-area:header;
        background: linear-gradient(to left, rgb(10, 200, 99),rgb(26, 190, 108));
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title{
        font-size: 1.2rem;
        color: rgb(34, 36, 34);
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
        transition: 500ms;
    }

    .title a{
        color:rgb(34, 36, 34);
        text-decoration: none;
        transition: 500ms;
    }
    .title a:hover{
        color:rgba(34, 36, 34,0.4);
        text-decoration: none;
    }

    .title a{
        color: rgb(34, 36, 34);
        text-decoration: none;
    }

    .header > a.toggle{
        width: 60px;
        height: 100%;
        color: rgb(34, 36, 34);
        justify-self: flex-start;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 500ms;
    } 

    .header > a.toggle:hover{
        color: rgba(34, 36, 34, 0.35);
        background-color: rgba(0, 0, 0,0.1);
        cursor: pointer;
    }
</style>