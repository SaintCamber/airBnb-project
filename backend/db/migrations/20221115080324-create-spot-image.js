'use strict';
let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}
options.tableName = "spotImages"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(options, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        references:{model:"Spots",
        key:"id"},
        onDelete:"CASCADE"
      },
      url: {
        type: Sequelize.STRING
      },
      preview: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
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