
import Axios from "axios";

// Saves the current state
const state = {
   anzeigen: [],
   favoriten: [],
   currentAnzeige: ''
};

// Getter to return state variables
const getters = {
   allAnzeigen: state => state.anzeigen,
   getCurrentAnzeige: state => state.currentAnzeige,
};

// Actions that call mutation functions
const actions = {

    /**
     * Hole alle Anzeige und setzte sie in den Zustand anzeigen
     * @param commit
     * @returns {Promise<void>}
     */
    async fetchAnzeigen({commit}) {
        const response = await Axios.get("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/all");

        commit('SET_ANZEIGEN', response.data);
    },
    async addAnzeige({rootState},anzeigeInfo) {
        const userId = rootState.login.user.id;
        const response = await Axios.post('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/add?titel=' + anzeigeInfo.titel +
            '&thema='+ anzeigeInfo.thema + '&ben_id=' + userId + '&beschreibung=' + anzeigeInfo.beschreibung)
        return  response.data
    },
    /**
     * Setzen nur die Anzeigen die vom Benutzer erstellt wurden in den Zustand Anzeigen
     * @param commit
     * @param rootState
     * @returns {Promise<void>}
     */
    async filterAnzeigenEigene({ commit, rootState }) {
        const userId = rootState.login.user.id;
        //const userId = 1
        const response = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/ben_id?ben_id=${userId}`);

        commit('SET_ANZEIGEN', response.data);
    },

    /**
     * Setzte die Favoriten als aktuellen Zustand in Anzeigen
     * @param rootState Zustand aus login
     * @param commit
     * @returns {Promise<void>}
     */
    async filterAnzeigenFavoriten({ rootState, commit }) {
        const userId = rootState.login.user.id;

        const responseFav = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/favorit/ben_id?ben_id=${userId}`);
        console.log(responseFav.data);

        commit('CLEAR_FAVORITEN');
       for (const fav of responseFav.data) {
           const responseR = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/id?id=${fav.anz_id}`)

           commit('COLLECT_FAVORITEN', responseR.data);
       }

        commit('SET_FAVORITEN');
    },
    async filterAnzeigenById ({commit}, id) {

        const response = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/id?id=${id}`)

        commit('SET_CURRENT_ANZEIGE', response.data);
    }


};

// Changes state in vuex storage
const mutations = {
    // Speicher alle Anzeigen im Zustand anzeigen
    SET_ANZEIGEN: (state, anzeigen) => (state.anzeigen = anzeigen),

    // Setze die Favoriten des Benutzers als aktuelle Anzeigen
    SET_FAVORITEN: (state, ) => (state.anzeigen = state.favoriten),

    // Sammel alle Favoriten im Zustand favoriten
    COLLECT_FAVORITEN: (state, favoriten) => (state.favoriten.unshift(favoriten)),

    // Leere den Zustand favoriten
    CLEAR_FAVORITEN: (state) => (state.favoriten = []),

    SET_CURRENT_ANZEIGE: (state, anzeige) => (state.currentAnzeige = anzeige),


};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};