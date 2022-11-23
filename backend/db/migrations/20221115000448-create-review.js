'use strict';
let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}
options.tableName = 'Reviews'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        foreignKey:true,
        onDelete:"CASCADE",
        references:{model:'Spots',key:'id'}
      },
      userId: {
        type: Sequelize.INTEGER,
        foreignKey:true,
        onDelete:"CASCADE",
        references:{model:'Users',key:'id'}
      },
      review: {
        type: Sequelize.STRING
      },
      stars: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    
    await queryInterface.dropTable(options);
  }
};