const { faker } = require('@faker-js/faker');

module.exports = {
    generateUser,
}

function generateUser() {
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        gender: 'female',
        status: 'inactive'
    }
}



