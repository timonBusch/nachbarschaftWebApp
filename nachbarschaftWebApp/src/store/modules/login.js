import axios from 'axios';

// Saves the current state
const state = {
    users: [],
    currentUser: {}
};

// Getter to return state variables
const getters = {
    allUsers: state => state.users
};

// Actions that call mutation functions
const actions = {

    // Get all Users from API
    async fetchUsers({ commit }) {
        const response = await axios.get('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/benutzer/all');
        commit('setUsers',response.data)

        // Load user from the localStorage and set it as current user
        let user = JSON.parse(window.localStorage.currentUser);
        commit('setCurrentUser',user)
    },
    // Call mutation to set current user to empty
    logoutUser({commit}) {
        commit('setEmptyUser')
    },
    //
async loginUser({commit}, loginInfo) {
    try {
        const user = await axios.get("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/benutzer/email?email=" + loginInfo.email);

        commit('setCurrentUser', user);
        return user;
    }catch {
        return {error: "Email was incorrect or not found, Please try again"}
    }

}
};

// Changes state in vuex storage
const mutations = {
    // Save all users in state
    setUsers: (state, users) => (state.users = users),

    // Set current user in state to empty
    setEmptyUser: (state) => {
        state.currentUser = {}
        window.localStorage.currentUser = JSON.stringify({});
        },

    // Set current user in state
    setCurrentUser: (state, user) => {
        state.currentUser = user;
        window.localStorage.currentUser = JSON.stringify(user);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};