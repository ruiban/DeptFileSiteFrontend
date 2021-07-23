// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import { getCookie } from './util/common'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);

window.bus = new Vue();
/* eslint-disable no-new */

//自定义指令
Vue.directive('has', {
  inserted: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});



//全局方法
Vue.prototype.$_has = function (value) {
  let isExist = false
  var permissions = getCookie("permissions");
  if (permissions === undefined || permissions == null) {
    return false;
  }
  if (permissions.indexOf(value) > -1) {
    isExist = true;
  }
  return isExist;
}


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

