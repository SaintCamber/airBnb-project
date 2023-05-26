'use strict';
const spots = require('../fakerSeeds/createSpots.js');
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Spots';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, spots, {});
  },

  async down (queryInterface, Sequelize) {
    let Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.gt]: 0 },
    });
  }
};
