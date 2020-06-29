
import Axios from "axios";

const state = {
    meldungen: [],
    currentMeldung: ''
};

const getters = {
    allMeldungen: state => state.meldungen,
};

const actions = {

    async getAllMeldungen({commit}) {
        const response = await Axios.get("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/favorit/all");

            commit('SET_MELDUNG', response.data);
    },

};

const mutations = {
    SET_MELDUNG: (state, data) => (state.meldungen = data),
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}