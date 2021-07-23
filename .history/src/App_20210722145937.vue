<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import {getRequest} from './api/api'

export default {
  name: 'App',
  // provide(){
  //   return{
  //     reload: this.reload
  //   }
  // },
  data(){
    return {
      //计时器
      timmer: null,
      //isRouterAlive:true
    }
  },
  methods: {
    overTimeOperation() {
      //当前页面不是登录页面，将进行计时，30分钟没操作，跳转登录页面重新登录
      if( this.$route.name !== '登录'){
        //30分钟内触发，清除上一次的计时器，重新开始计时
        clearTimeout(this.timmer);
        var _this = this;
        this.timmer = setTimeout(()=>{
        sessionStorage.clear();
        _this.$alert('长时间未操作，请重新登录！','登录过时',{
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            getRequest('/logout');
            _this.$router.push({path:"/"});
          }
        })
        
        },30*60*1000);
      }
    },
    // reload(){
    //   this.isRouterAlive = false
    //   this.$nextTick(function(){
    //     this.isRouterAlive = true
    //   })
    // }
  }
}
</script>

<style>
body {
  height: 100%;
  overflow: auto;
  padding-top: -60px !important;
}
#app {

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
