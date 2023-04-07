const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  hashedPassword: bcrypt.hashSync(faker.internet.password())
});

