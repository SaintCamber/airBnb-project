'use strict';
const reviews = require('../fakerSeeds/createReviews.js');
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
options.tableName = "Reviews";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options,reviews)

  },

  async down (queryInterface, Sequelize) {
    let {Op} = Sequelize;
    return queryInterface.bulkDelete(options, {
      id: { [Op.gt]: 0 },
    });
  }
};
