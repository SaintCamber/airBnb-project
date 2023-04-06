'use strict';
const reviews = require('../fakerSeeds/createReviews.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let options = {};
    if(process.env.NODE_ENV === 'production'){
      options.schema = process.env.SCHEMA;
    }
    options.tableName = "reviews";
  },

  async down (queryInterface, Sequelize) {
    let Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.gt]: 0 },
    });
  }
};
