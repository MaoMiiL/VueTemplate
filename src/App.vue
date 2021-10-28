<template>
  <div id="app" class="iconfont">
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
    }
  }
};
</script>

<style lang="less">
@import './styles/base.less';
@import './assets/fonts/iconfont.css';

@defalutColor: #2c3e50;
@leftAsideWidth: 240px;
@topNavHeight : 60px;

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: @defalutColor;
  position: relative;
  background-color: #e9e9e9;
}

</style>
