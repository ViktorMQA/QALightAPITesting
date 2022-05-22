require('dotenv').config();
const axios = require('axios');
const { assert } = require('chai');
const { generateUser } = require('../utils/dataHelpers');

//const token = 'bf19eb00232aa7e3a6ff8f8dc3bf5aa972b10c6fd780412b9abc53cfec97f398';
const token = process.env.token;


const base_url = 'https://gorest.co.in/public/v2';

describe('Users endpoint', () => {
    it('GET /Users', async () => {
        const response = await axios.get(`${base_url}/users`);
        console.log(Object.keys(response));
        const { status, statusText, data } = response;
        console.log(data, status, statusText);
        console.log('length is ', data.length);
        assert.equal(status, 200, 'status should be 200');
        assert.equal(statusText, 'OK', 'Status text should be OK');
    });
    it('ALL keys are present', async () => {
        const response = await axios.get(`${base_url}/users`);
        const data = response.data;
        data.forEach(user => {
            assert.hasAllKeys(user, ['name', 'email', 'gender', 'id', 'status'], 'All keys are present');
        });
    });
    it.only('POST /Users', async () => {
        const user = generateUser();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        //console.log(user)
        const response = await axios.post(`${base_url}/users`, user, config);
        const returnedUser = response.data;
        assert.ownInclude(returnedUser, user, 'saved user as same field')
        //console.log(returnedUser)

    });
    it('GET user by name', async ()=>{
        const configs = {
            params: {
                name: 'Brahmabrata Menon'
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`${base_url}/users`, configs)
        const userByName = response.data;
        console.log(userByName, userByName[0].name)
        assert.equal(userByName[0].name, 'Brahmabrata Menon', 'corect user name')
    })
});