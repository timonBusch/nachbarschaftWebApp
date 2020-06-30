import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import VueGeolocation from "vue-browser-geolocation/src";
import * as VueGoogleMaps from 'vue2-google-maps'
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
import Map from "./components/Map";

Vue.use(VueGoogleMaps, {
  load: {
    key: ''
  }
})

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(require('vue-moment'));
Vue.use(VueGeolocation)


Vue.config.productionTip = false

// Routen zu den verschiedenen Komponenten
const router = new VueRouter({
  routes: [
    { path: '/', component: Anzeigen},
    { path: '/meldungen',
      name: 'meldungen',
      component: Meldungen,
    },
    {
      path: '/profil/:id',
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
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    }
  ],
  mode: 'history'
})




new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

