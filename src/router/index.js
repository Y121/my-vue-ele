import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const home  = r => require.ensure([],() => r(require('../pages/home/home')),'home');

export default new Router({
  routes: [
    {
      path: '',
      redirect:'/home'
    },
    //首页城市列表页
    {
      path:'/home',
      component:home
    }
  ]
})
