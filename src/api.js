import axios from "axios";

export const api = axios.create({
    baseURL: 'https://vemser-retrocards.herokuapp.com'
})