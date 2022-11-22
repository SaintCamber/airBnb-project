'use strict';
let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}
options.tableName = "SpotImages"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert(options, [{
      id:1,
      spotId:1,
      url:'www.hergoesanimage1 .com',
      preview: false
    },
    {
      id:2,
      spotId:1,
      url:'www.hergoesanimage2 .com',
      preview: true
    },
    {
      id:3,
      spotId:1,
      url:'www.hergoesanimage3 .com',
      preview: false
    },
    {
      id:4,
      spotId:1,
      url:'www.hergoesanimage4 .com',
      preview: false
    },
    {
      id:5,
      spotId:1,
      url:'www.hergoesanimage5 .com',
      preview: false
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
    await queryInterface.bulkDelete(options,{id:[1,2,3,4,5]})
  }
};
