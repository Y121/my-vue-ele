import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const home = r =>
  require.ensure([], () => r(require("../pages/home/home")), "home");
const city = r =>
  require.ensure([], () => r(require("../pages/city/city")), "city");
const msite = r =>
  require.ensure([], () => r(require("../pages/msite/msite.vue")), "msite");
const food = r =>
  require.ensure([], () => r(require("../pages/food/food.vue")), "food");

export default new Router({
  routes: [
    {
      path: "",
      redirect: "/home"
    },
    //首页城市列表页
    {
      path: "/home",
      component: home
    },
    //当前选择城市页
    {
      path: "/city/:cityId",
      component: city
    },
    {
      path: "/msite",
      component: msite
    },
    {
      path: "/food",
      component: food
    }
  ]
});
