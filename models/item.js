'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Item.belongsTo(models.User, {foreignKey: "userId"})

      //super many to many
      Item.belongsToMany(models.Cart, {through: models.Cart_item, foreignKey: "itemId"})
      Item.hasMany(models.Cart_item, {as: "ItemsProduct", foreignKey:"itemId"})
      
    }
  }
  Item.init({
    userId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};