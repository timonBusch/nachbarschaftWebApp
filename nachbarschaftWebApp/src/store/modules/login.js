

// Saves the current state
const state = {
    token: '',
    user: []
};

// Getter to return state variables
const getters = {
    isLoggedIn: state => {
        return state.token
    },
    getUser: state => {
        return state.user;
    }
};

// Actions that call mutation functions
const actions = {
    login: ({commit}, token) => {
        commit('SET_TOKEN', token);

        // Authentifizierungs header setzten
        //Axios.defaults.headers.common['Authorization']= `Bearer ${store.state.token}`;
    },
    userLogin: ({commit}, user) => {
        commit('SET_USER', user);

        // Authentifizierungs header setzten
        //Axios.defaults.headers.common['Authorization']= `Bearer ${store.state.token}`;
    },
    logout: ({ commit }) => {
            commit('RESET', '')
    }
};

// Changes state in vuex storage
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_USER: (state, user) => {
        state.user = user;
    },
    RESET: (state) => {
        state.token = '';
        state.user = [];
    }


};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};