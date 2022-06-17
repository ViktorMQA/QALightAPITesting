require('dotenv').config();
const Axios = require('axios');




const token = process.env.token;
const base_url = 'https://gorest.co.in/public/v2';

const axios = Axios.create({
    baseURL: base_url,
    headers: {
        Authorization: `Bearer ${token}`
    },
});

module.exports = axios;