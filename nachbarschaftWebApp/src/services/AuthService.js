import axios from 'axios';

const url = 'http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/';
//const url = "http://localhost:8080/";

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
}