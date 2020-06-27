import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login'
import anzeigen from './modules/anzeigen'
import benutzer from './modules/benutzer'

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store( {
    strict: true,
    plugins: [createPersistedState()],
    modules: {
        login,
        anzeigen,
        benutzer
    }
})