'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User,{foreignKey:"userId",onDelete:"CASCADE",hooks:true})
      Booking.belongsTo(models.Spot,{foreignKey:"spotId",onDelete:"CASCADE",hooks:true})
      
    }
  }
  Booking.init({
    spotId:{type: DataTypes.INTEGER,references:{model:'Spots',key:'id'},onDelete:'CASCADE'},
    userId: {type: DataTypes.INTEGER,references:{model:'Users',key:'id'},onDelete:"CASCADE"},
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};