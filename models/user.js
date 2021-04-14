'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.company)
      models.user.belongsToMany(models.company,{through:'review'})
    }
  };
  user.init({
    name: {
      type:DataTypes.STRING,
      validate: {
        len:[2,30],
        isAlpha:true
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:[2,20],
        isAlphanumeric:true,
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};