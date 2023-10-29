let bookings = require('../fakerSeeds/createBooking.js');
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
options.tableName = "Bookings";

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, bookings, {});

  },

  async down (queryInterface, Sequelize) {
    
    let {Op} = Sequelize;
    return queryInterface.bulkDelete(options, {
      id: { [Op.gt]: 0 },
    });
  }
};
