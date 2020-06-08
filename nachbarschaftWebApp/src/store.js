import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        }
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/benutzer/id?id=1', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.id
                        const user = resp.data.benutzername
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        }

    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
})
