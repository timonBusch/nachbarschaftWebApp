import Axios from "axios";

export default {
    async meldungLoeschen(id) {
    console.log(id);
    const response = await Axios.delete("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/meldung/delete/" + id);
    return response.data;
    }
}