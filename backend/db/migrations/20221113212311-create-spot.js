'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        foreignKey: true,
        references:{model:'Users',key:'id'}
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false,

      },
      city: {
        type: Sequelize.STRING,
        allowNull:false,

      },
      state: {
        type: Sequelize.STRING,
        allowNull:false,

      },
      country: {
        type: Sequelize.STRING,
        allowNull:false,

      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull:false,

      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull:false,

      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,

      },
      description: {
        type: Sequelize.STRING,
        allowNull:false,

      },
      price: {
        type: Sequelize.FLOAT,
        allowNull:false,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};