import axios from 'axios';
const API = axios.create({
    baseURL:'https://job-portal-2nqp.onrender.com'
});
export default API;