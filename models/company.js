'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.company.belongsTo(models.user)
      models.company.belongsToMany(models.user,{through:'review'})
    }
  };
  company.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'company',
  });
  return company;
};