

import Axios from "axios";
// Saves the current state

const state = {
    user: [],
    bewertungen: [],
    averageStars: '',
};

// Getter to return state variables
const getters = {
    getUser: state => state.user,
    getBewertungen: state => state.bewertungen,
    getAverageStars: state => state.averageStars,
};

// Actions that call mutation functions
const actions = {
    async fetchUserInformationById({commit}, id) {
        commit('CLEAR_USER');
        const response = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/benutzer/id?id=${id}`);

        commit('SET_USER', response.data);
    },
    async fetchBewertungenByUserId({commit}, id) {
        commit('CLEAR_BEWERTUNGEN')
        const response = await Axios.post(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/bewertung/ben_id?ben_id=${id}`);

        commit('SET_BEWERTUNGEN', response.data);
    },
    calcAverageStars({getters, commit}) {
        let sumStars = 0;
        let average = 0;
        if(getters.getBewertungen.length !== 0) {
            for(let i = 0; i< getters.getBewertungen.length; i++) {
                console.log(getters.getBewertungen[i].sterne)
                sumStars += getters.getBewertungen[i].sterne;
            }
            console.log(sumStars);
            average = Math.round((sumStars/getters.getBewertungen.length));

        }
        commit('SET_AVERAGE_STARS', average);
    }


};

// Changes state in vuex storage
const mutations = {
    SET_USER: (state, user) => (state.user = user),
    SET_BEWERTUNGEN: (state, bewertungen) => (state.bewertungen = bewertungen),
    CLEAR_BEWERTUNGEN: (state) => (state.bewertungen = []),
    CLEAR_USER: (state) => (state.user = []),
    SET_AVERAGE_STARS: (state, average) => (state.averageStars = average),

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};