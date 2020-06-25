import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login'

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store( {
    strict: true,
    plugins: [createPersistedState()],
    modules: {
        login
    }
})