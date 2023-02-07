const Carts = require("./carts");
const Orders = require("./orders");
const Products_in_cart = require("./products_in_cart");
const Products_in_order = require("./products_in_order");
const Products = require("./products");
const Users = require("./users");

const initModels = () => {
  Products.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(Products, { as: "products", foreignKey: "user_id" });

  Carts.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasOne(Carts, { as: "cart", foreignKey: "user_id" });

  Orders.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(Orders, { as: "orders", foreignKey: "user_id" });

  Products_in_cart.belongsTo(Carts, { as: "cart", foreignKey: "cart_id" });
  Carts.hasMany(Products_in_cart, { as: "products", foreignKey: "cart_id" });

  Products_in_cart.belongsTo(Products, {
    as: "product",
    foreignKey: "product_id",
  });
  Products.hasMany(Products_in_cart, { as: "carts", foreignKey: "product_id" });

  Products_in_order.belongsTo(Orders, { as: "order", foreignKey: "order_id" });
  Orders.hasMany(Products_in_order, { as: "products", foreignKey: "order_id" });

  Products_in_order.belongsTo(Products, {
    as: "product",
    foreignKey: "product_id",
  });
  Products.hasMany(Products_in_order, {
    as: "Orders",
    foreignKey: "product_id",
  });
};

module.exports = initModels;
