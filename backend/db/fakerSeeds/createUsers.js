const bcrypt = require('../../node_modules/bcryptjs');
const faker = require('../../node_modules/faker');
const User = require('./user.js');


const users = [];

for (let i = 0; i < 100; i++) {
    const user = User();
  user.hashedPassword = bcrypt.hashSync(user.hashedPassword);
  users.push(user);
}

module.exports = users;