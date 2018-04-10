import 'element-ui/lib/theme-chalk/index.css'; //elment-ui css的引入
import "@/style/common.css"; // 公共的css
import Vue from 'vue'; //vue引入
// import Axios from 'axios'; // axios引入
import App from '@/App'; // 主页面的载入
import ElementUI from 'element-ui'; // element-ui js的引入
import store from "@/vuex/vuex.js"; // vuex(状态管理)引入

// Vue.prototype.$axios = Axios; // axios注册
Vue.use(ElementUI); // element-ui的注册

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, //将 vuex store暴露出来
  template: '<App></App>',
  components: {App}
});
