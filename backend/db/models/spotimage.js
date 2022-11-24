'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spotimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spotimage.belongsTo(models.Spot,{foreignKey:'spotId',onDelete:"CASCADE",hooks:true})
    }
  }
  spotimage.init({
    spotId:{ type: DataTypes.INTEGER,references:{model:"Spots",key:"id"},onDelete:"CASCADE"},
    url: DataTypes.STRING,
    preview: {type:DataTypes.BOOLEAN,defaultValue:false}
  }, {
    sequelize,
    modelName: 'spotimage',
    scopes: {
      spotSearch: {
        attributes: { exclude: [ "createdAt", "updatedAt"] },
      },
  }});
  return spotimage;
};