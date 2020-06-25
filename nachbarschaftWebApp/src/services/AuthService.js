import axios from 'axios';

const url = 'http://localhost:8080/';

export default {
    login(credentials) {
        return axios.post(url + 'authenticate', credentials).then(response => {
            return response.data
        });
    },
    signUp(credentails) {
        return axios.post(url + 'benutzer/add', {
            params: credentails
        }).then(response => response.data);
    },
    getSecretContent(username) {
        return axios.get(url + 'benutzer/benutzername?=' + username).then(response => response.data);
    },
    getUser() {
        return axios.get(url + 'benutzer/benutzername?benutzername=Denninator', {
            Authorization: "Bearer " + this.$store.state.login.token
        }).then(response => response.data);
    }
}