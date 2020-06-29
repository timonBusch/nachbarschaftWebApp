import Axios from "axios";

export default {

    async deleteAnzeige(id) {
        const response = await Axios.delete('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/anzeige/delete/' + id);

        return response.data;
    },
    async deleteFavorit(id) {
        const response = await Axios.delete('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/favorit/delete/' + id);

        return response.data;
    },
    async filterFavoritenByAnzIdAndBenId(anz_id, ben_id) {
        const response = await Axios.get('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/favorit/anz_idAndBen_id?anz_id=' + anz_id
            +'&ben_id=' + ben_id);
        console.log(response.data);
        return response.data;
    },

    async anzeigeMelden(anz_id, text) {
        const response = await Axios.post('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/meldung/add?' +
            'anz_id=' + anz_id + '&grund=' + text + '&status=' + status + '&ben_id');

        return response.data;
    },

    async benutzerMelden(ben_id, text) {
        let status = "Pruefung durch Admin";
        const response = await Axios.post('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/meldung/add?' +
            'ben_id=' + ben_id + '&grund=' + text + '&status=' + status + '&anz_id');

        return response.data;
    }
}