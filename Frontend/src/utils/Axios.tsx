import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:3000/api/V1",
})

export default instance