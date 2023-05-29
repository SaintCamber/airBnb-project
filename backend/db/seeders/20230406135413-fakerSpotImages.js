'use strict';
const Images = require('../fakerSeeds/createSpotImages.js');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = "spotimages";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    return queryInterface.bulkInsert("spotimages", Images, {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('spotimages', {
      id: { [Op.gt]: 0 },
    });

  }
};
