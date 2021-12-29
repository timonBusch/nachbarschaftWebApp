import axios from 'axios';

const url = 'http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/';
//const url = "http://localhost:8080/";

export default {
    login() {

    },
    signUp(credentails) {
        return axios.post(url + 'benutzer/add?benutzername=' + credentails.username + '&email=' + credentails.email + '&passwort=' + credentails.password + '&plz=' + credentails.plz +
            '&vorname=&nachname&strasse&hausnummer&wohnort=' + credentails.wohnort + '&typ=standard&art=privat').then(response => {
            return response.data
        })

    },
}