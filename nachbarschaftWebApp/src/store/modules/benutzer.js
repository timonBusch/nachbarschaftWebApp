

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
    async fetchUserInformationById({commit}) {
        commit('CLEAR_USER');
        //const response = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/benutzer/id?id=${id}`);
        let demo = {
            "id": "1",
            "benutzername": "hjuerg",
            "vorname": "Hans",
            "nachname": "Jürgen",
            "strasse": "In der Strasse",
            "hausnummer": "1",
            "plz": "11332",
            "wohnort": "Demo",
            "email": "demo@demo.de",
            "passwort": "12345",
            "typ": "demo",
            "art": "demo"
        }
        commit('SET_USER', demo);
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
                sumStars += getters.getBewertungen[i].sterne;
            }
            average = Math.round((sumStars/getters.getBewertungen.length));
        }
        commit('SET_AVERAGE_STARS', average);
    },
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