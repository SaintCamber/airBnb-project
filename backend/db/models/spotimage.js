'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spotImage.belongsTo(models.Spot,{foreignKey:'spotId',onDelete:"CASCADE",hooks:true,as :'images'})
    }
  }
  spotImage.init({
    spotId:{ type: DataTypes.INTEGER,references:{model:"Spots",key:"id"},onDelete:"CASCADE"},
    url: DataTypes.STRING,
    preview: {type:DataTypes.BOOLEAN,defaultValue:false}
  }, {
    sequelize,
    modelName: 'spotImage',
    scopes: {
      spotSearch: {
        attributes: { exclude: [ "createdAt", "updatedAt"] },
      },
  }});
  return spotImage;
};