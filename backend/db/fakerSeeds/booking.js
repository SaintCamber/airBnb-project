const faker = require('faker')

module.exports = () => ({
    userId: Math.floor(Math.random() * 100) + 1,
    spotId: Math.floor(Math.random() * 100) + 1,
    startDate: faker.date.future(),
    endDate: faker.date.future(),})