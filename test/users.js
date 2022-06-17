//require('dotenv').config();
const axios = require('../utils/request');
const { assert } = require('chai');
const { generateUser } = require('../utils/dataHelpers');

//const token = 'bf19eb00232aa7e3a6ff8f8dc3bf5aa972b10c6fd780412b9abc53cfec97f398';

const userKeys = ['name', 'email', 'gender', 'id', 'status'];

describe('Users endpoint', () => {
    it('GET /Users', async () => {
        const response = await axios.get(`/users`);
        //console.log(Object.keys(response));
        const { status, statusText, data } = response;
        //console.log(data, status, statusText);
        //console.log('length is ', data.length);
        assert.equal(status, 200, 'status should be 200');
        assert.equal(statusText, 'OK', 'Status text should be OK');
    });
    it('ALL keys are present', async () => {
        const response = await axios.get(`/users`);
        const data = response.data;
        data.forEach(user => {
            assert.hasAllKeys(user, ['name', 'email', 'gender', 'id', 'status'], 'All keys are present');
        });
    });
    it('POST /Users', async () => {
        const user = generateUser();
        //console.log(user)
        const response = await axios.post(`/users`, user);
        const returnedUser = response.data;
        assert.ownInclude(returnedUser, user, 'saved user as same field')
        //console.log(returnedUser)

    });
    describe.only('get user by varios field', () => {
        let savedUser;
        before(async () => {
            const response = await axios.post('/users', generateUser());
            savedUser = response.data;
        });
        after(async () => {
            axios.delete(`/users/${savedUser.id}`)
        });

        userKeys.forEach((key) => {
            it(`GET user by ${key}`, async () => {
                const configs = {
                    params: {
                        [key]: savedUser[key],
                    },
                };
                const response = await axios.get(`/users`, configs)
                const users = response.data;
                //console.log(users);
                users.forEach((user) => {
                    assert.equal(savedUser[key], user[key], `user ${key} expect to be ${savedUser[key]} got - ${user[key]}`)
                })
            });
        });

    });
});