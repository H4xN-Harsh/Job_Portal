import axios from 'axios';
const API = axios.create({
    baseURL:'https://job-portal-backend-9cpp.onrender.com'
});
export default API;