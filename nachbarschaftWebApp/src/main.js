import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import VueRouter from "vue-router";
import Profil from "./components/Profil";
import Anzeigen from "./components/Anzeigen";
import Login from "./components/Login";
import store from "./store"
import Registrieren from "./components/Registrieren";
import Anzeige from "./components/Anzeige";
import AddAnzeige from "./components/AddAnzeige";
import Chat from "./components/Chat";
import ChatOverview from "./components/ChatOverview";
import Meldungen from "./components/Meldungen";
//import Axios from "axios";

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(require('vue-moment'));


Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: Anzeigen},
    { path: '/meldungen',
      name: 'meldungen',
      component: Meldungen,
    },
    {
      path: '/profil/:id?',
      name: 'profil',
      component: Profil,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      component: Registrieren
    },
    {
      path: '/anzeige/:id',
      name: 'anzeige',
      props: true,
      component: Anzeige
    },
    {
      path: '/add_anzeige',
      name: 'add',
      component: AddAnzeige
    },
    {
      path: '/chat/:partnerId',
      name: 'chat',
      props: true,
      component: Chat
    },
    {
      path: '/nachrichten',
      name: 'nachrichten',
      component: ChatOverview
    }
  ],
  mode: 'history'
})

//Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

