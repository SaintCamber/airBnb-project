'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot,{foreignKey:'spotId',onDelete:"CASCADE",hooks:true,as:"SpotImages"})
    }
  }
  SpotImage.init({
    spotId:{ type: DataTypes.INTEGER,references:{model:"Spots",key:"id"},onDelete:"CASCADE",allowNull:false},
    url: DataTypes.STRING,
    preview: {type:DataTypes.BOOLEAN,defaultValue:false,allowNull:false}
  }, {
    sequelize,
    modelName: 'SpotImage',
    // tableName:"spotimages",
    scopes: {
      spotSearch: {
        attributes: { exclude: [ "createdAt", "updatedAt"] },
      },
  }});
  return SpotImage;
};