import axios from "axios";

export class Request {
    static get(url) {
        return axios(url).then(res => res.data);
    }

    static post(url, body) {
        return axios({
            method: 'post',
            url,
            body
        }).then(res => res.data)
    }
}