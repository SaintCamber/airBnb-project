'use strict';
const spotImages = require('../fakerSeeds/createSpotImages.js');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let options = {};
    if(process.env.NODE_ENV === 'production'){
      options.schema = process.env.SCHEMA;
    }
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert('SpotImages', spotImages, {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      id: { [Op.gt]: 0 },
    });

  }
};
