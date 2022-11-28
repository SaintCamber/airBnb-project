'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User,{foreignKey: "ownerId",as:'owner',onDelete:"CASCADE",hooks:true})
      Spot.hasMany(models.Booking,{foreignKey:'spotId',onDelete:'CASCADE',hooks:true})
      Spot.hasMany(models.Review,{foreignKey:'spotId',onDelete:'CASCADE',hooks:true})
      Spot.hasMany(models.SpotImage,{foreignKey:'spotId',onDelete:'CASCADE',hooks:true})

    }
  }
  Spot.init({
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    ownerId:{type: DataTypes.INTEGER,allowNull:false,references:{model:"Users",key:"id"}},
    address: {type:DataTypes.STRING,},
    city:{type: DataTypes.STRING,},
    state: {type:DataTypes.STRING,},
    country: {type:DataTypes.STRING,},
    lat: {type:DataTypes.FLOAT,},
    lng: {type:DataTypes.FLOAT,},
    name: {type:DataTypes.STRING,},
    description: {type:DataTypes.STRING,},
    price: {type:DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};