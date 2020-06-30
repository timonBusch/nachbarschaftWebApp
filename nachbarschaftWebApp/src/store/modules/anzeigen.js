
import Axios from "axios";
import vue from 'vue';

// Saves the current state
const state = {
   anzeigen: [],
   favoriten: [],
   favoritData: [],
   currentAnzeige: ''
};

// Getter to return state variables
const getters = {
   allAnzeigen: state => state.anzeigen,
   getCurrentAnzeige: state => state.currentAnzeige,
   getFavoritData: state => state.favoritData,
};

// Actions that call mutation functions
const actions = {

    /**
     * Hole alle Anzeige und setzte sie in den Zustand anzeigen
     * @param commit
     * @param rootState
     * @returns {Promise<void>}
     */
    async fetchAnzeigen({commit, rootState}) {
        const userId = rootState.login.user.id
        let response = null;
        if (userId != null) {
            response = await Axios.get("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/excludeUserFav?ben_id=" + userId);
        } else {
            response = await Axios.get("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/all");
        }
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
        commit('SET_FAVORIT_DATA', responseFav.data)
        commit('CLEAR_FAVORITEN');
       for (const fav of responseFav.data) {
           const responseR = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/id?id=${fav.anz_id}`)
           vue.set(responseR.data, 'isFavorit', true);

           commit('COLLECT_FAVORITEN', responseR.data);
       }

        commit('SET_FAVORITEN');
    },

    /**
     * Setze eine Anzeige mit einer bestimmten Id als current_anzeige
     * @param commit
     * @param id
     * @returns {Promise<void>}
     */
    async filterAnzeigenById ({commit}, id) {

        const response = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/id?id=${id}`)

        commit('SET_CURRENT_ANZEIGE', response.data);
    },

    /**
     * Fuege einen Favoriten fuer den Benutzer hinzu
     * @param rootState Zustand aus der dem Benutzer
     * @param anz_id
     * @returns {Promise<any>}
     */
    async addFavorit ({rootState}, anz_id) {
        const ben_id = rootState.login.user.id
        const response = await Axios.post('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/favorit/add?ben_id=' +
            ben_id + '&anz_id=' + anz_id);

        return response.data;
    },

    /**
     * Anzeigen werden nach dem gesuchten Wort gefiltert
     * @param commit
     * @param word
     * @returns {Promise<void>}
     */
    async filterAnzeigenByWord({commit},word) {
        const response = await Axios.get(`http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/search?suche=${word}`)

        commit('SET_ANZEIGEN', response.data)
    },

    async sortAnzeigenByDate({state, commit}) {

        let toSort = state.anzeigen
        for(let i = toSort.length; i > 1; i--) {
            for(let y = 0; y < i-1; y++) {
                if(toSort[y].datum < toSort[y+1].datum) {
                    let first = toSort[y];
                    toSort[y] = toSort[y + 1];
                    toSort[y+1] = first;
                }
            }
        }
        commit('SET_ANZEIGEN', toSort);

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

    SET_FAVORIT_DATA: (state, favoritenData) => (state.favoritData = favoritenData)


};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};