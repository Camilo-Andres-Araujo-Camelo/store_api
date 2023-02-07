const ProductsInOrder = require("../models/products_in_order");

class ProductsInOrdersServices {
  static async createProductInOrder(newProductInOrder) {
    try {
      ProductsInOrder.create(newProductInOrder);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsInOrdersServices;
