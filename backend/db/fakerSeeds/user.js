const faker = require('../../node_modules/faker');
const bcrypt = require('../../node_modules/bcryptjs');

module.exports = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  hashedPassword: bcrypt.hashSync(faker.internet.password())
});

