'use strict';

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
     await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          id:1,
          spotId: 1,
          userId: 1,
          review:
            "in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat",
          stars: 3,
        },
        {
          id:2,
          spotId: 2,
          userId: 2,
          review:
            "gravida nisi at nibh in hac habitasse platea dictumst aliquam augue",
          stars: 5,
        },
        {
          id:3,
          spotId: 3,
          userId: 3,
          review:
            "eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu",
          stars: 2,
        },
        {
          id:4,
          spotId: 2,
          userId: 3,
          review:
            "eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu",
          stars: 2,
        },
        {
          id:5,
          spotId: 3,
          userId: 3,
          review:
            "eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu",
          stars: 2,
        }
      ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     let options = {}
     options.tableName = "Reviews"
    await queryInterface.bulkDelete('Reviews',{id:[1,2,3,4,5]})
  }
};
