import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueRouter from "vue-router";
import Profil from "./components/Profil";
import Anzeigen from "./components/Anzeigen";
import Login from "./components/Login";
import store from "./store"
import Registrieren from "./components/Registrieren";
import Anzeige from "./components/Anzeige";


Vue.use(VueRouter)
Vue.use(require('vue-moment'));


Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: Anzeigen},
    { path: '/profil', component: Profil},
    { path: '/login', component: Login},
    { path: '/register', component: Registrieren},
    { path: '/anzeige', component: Anzeige}
  ],
  mode: 'history'
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

