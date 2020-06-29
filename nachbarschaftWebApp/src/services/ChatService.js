import axios from 'axios';

const url = 'http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/';


export default {
    sendMessage(message) {
        const response = axios.post(url + "nachricht/add?von_id=" + message.von_id
            + "&zu_id=" + message.zu_id + "&text=" + message.nachricht);
        return response.data;
    },

}