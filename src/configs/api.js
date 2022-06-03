import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v3'
});

export default api;
