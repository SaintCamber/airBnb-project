'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot,{foreignKey:'spotId',onDelete:'CASCADE',hooks:true})
      Review.belongsTo(models.User,{foreignKey:"userId",onDelete:'CASCADE',hooks:true})
      Review.hasMany(models.reviewImage,{foreignKey:"reviewId",onDelete:"CASCADE",hooks:true,as:'ReviewImages'})
    }
  }
  Review.init({
    spotId: {type : DataTypes.INTEGER,references:{model:"Spots",key:"id"}},
    userId:  {type : DataTypes.INTEGER,references:{model:"Users",key:"id"}},
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER()
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};