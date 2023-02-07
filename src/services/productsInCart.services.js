const ProductsInCart = require("../models/products_in_cart");

class ProductsInCartServices {
  static async getProductInCart(id) {
    try {
      const result = await ProductsInCart.findOne({
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getProductAndCart(cart_id, product_id) {
    try {
      const result = await ProductsInCart.findOne({
        where: {
          cart_id,
          product_id,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async addProductInCart(productInCart) {
    try {
      const result = await ProductsInCart.create(productInCart);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateProductInCart(id, quantity) {
    try {
      await ProductsInCart.update(
        { quantity },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async empty(cart_id) {
    try {
      ProductsInCart.destroy({
        where: {
          cart_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsInCartServices;
