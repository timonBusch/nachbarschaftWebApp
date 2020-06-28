import Axios from "axios";


export default {
    async updateProfile(userData) {

        const response = await Axios.post('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/benutzer/update?id='
            + userData.id + '&benutzername=' + userData.benutzername + '&vorname=' + userData.vorname + '&nachname='
            + userData.nachname + '&plz=' + userData.plz + '&wohnort=' + userData.wohnort + '&strasse='
            + userData.strasse + '&hausnummer=' + userData.hausnummer + '&email=' + userData.email + '&passwort='
            + userData.passwort + '&typ=' + userData.typ + '&art=' + userData.art);
        return response.data;
    }
}