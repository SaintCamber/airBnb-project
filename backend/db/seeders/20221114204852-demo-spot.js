'use strict';
let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}
options.tableName = 'Spots'

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
     * */
    await queryInterface.bulkInsert(options,[{
    ownerId:1,
    address:'2410 foxcroft circle',
    city: 'denton',
    state:'texas',
    country:'USA',
    lat: 70,
    lng: 70,
    name: "foxcroft house",
    description: "run down and full of nightmares",
    price: 1000
  },{
    ownerId:1,
    address:'2440 foxcroft circle',
    city: 'denton',
    state:'texas',
    country:'USA',
    lat: 70,
    lng: 70,
    name: "foxcroft house",
    description: "run down and full of nightmares",
    price: 1000
  },{
    ownerId:1,
    address:'2480 foxcroft circle',
    city: 'denton',
    state:'texas',
    country:'USA',
    lat: 70,
    lng: 70,
    name: "foxcroft house",
    description: "run down and full of nightmares",
    price: 1000
  }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     
     await queryInterface.bulkDelete(options, {id:[1,2,3]});
  
  }
};
