<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import Header from './components/Header'
import Tabbar from './components/Tabbar'
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    Header,
    Tabbar,
    Player
  }
}
</script>
<style scoped lang="scss">
  @import "assets/css/variable";
  .theme{
    position: fixed;
    left: 0;
    bottom: 0;
    button{
      width: 100px;
      height: 100px;
      &:nth-of-type(1){
        background: $background-color-theme;
      }
      &:nth-of-type(2){
        background: $background-color-theme1;
      }
      &:nth-of-type(3){
        background: $background-color-theme2;
      }
    }
  }
</style>
