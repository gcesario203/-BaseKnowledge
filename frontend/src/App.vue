<template>
  <div id="app" :class="{'hide-menu':!isMenuVisible}">
    <Header title="Knowledge basement" :hideToggle="false" :hideUserDropdown="false"></Header>
    <Menu></Menu>
    <Cont></Cont>
    <Footer></Footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from './components/template/Header'
import Menu from './components/template/Menu'
import Cont from './components/template/Cont'
import Footer from './components/template/Footer'

export default {
  name: 'App',
  components: {Header,Menu,Cont,Footer},
  computed:mapState(['isMenuVisible'])
}
</script>

<style>
  *{
    font-family: "Lato", sans-serif;
  }

  body{
    margin: 0;
  }

  #app{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    display: grid;
    height: 100vh;
    grid-template-rows: 60px 1fr 40px;
    grid-template-columns: 300px 1fr;

    grid-template-areas:
      "header header"
      "menu content"
      "menu footer"
    ;
  }

  #app.hide-menu{
    grid-template-areas: 
      "header header"
      "content content"
      "footer footer"
    ;
  }
</style>