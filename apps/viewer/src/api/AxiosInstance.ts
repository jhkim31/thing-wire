import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1",
    timeout: 3000
})

export default api;