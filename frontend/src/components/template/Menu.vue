<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite o filtro selecionado" v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree"/>
    </aside>
</template>

<script>
import Tree from 'liquor-tree'
import {mapState} from 'vuex'
import {baseApiUrl} from '../../global'
import axios from 'axios'

export default {
    name:'Menu',
    components:{Tree},
    computed: mapState(['isMenuVisible']),
    data: function(){
        return{
            treeFilter:'',
            treeData: this.getTreeData(),
            treeOptions:{
                propertyNames:{'text':'name'},
                filter:{emptyText: 'Categoria não encontrada'}
            }
        }
    },
    methods:{
        getTreeData(){
            const url = `${baseApiUrl}/categories/tree`

            return axios(url).then(res=>res.data)
        },
        onNodeSelect(node){
            this.$router.push({
                name: 'articlesByCategory',
                params: {id:node.id}
            })

            if(this.$mq === 'xs' || this.$mq === 'sm'){
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to left, rgb(126, 124, 124),rgb(134, 130, 130));
        color: black;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .menu a,
    .menu a:hover{
        color: white;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{
        background-color: rgba(255, 255, 255, 0.25);
    }

    .tree-arrow.has-child{
        filter: brightness(2);
    }

    .menu .menu-filter{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        padding: 0 0 8px 0;
        border-bottom: 1px solid #aaa;
    }

    .menu .menu-filter i{
        margin: 0 10px 0 0;
    }

    .menu .menu-filter input,
    .menu .menu-filter input::placeholder{
        background: transparent;
        color: white;
        font-size: 1.3rem;
        width: 100%;
        border: 0;
        outline: 0;
    }

    .tree-filter-empty{
        color: white;
    }
</style>