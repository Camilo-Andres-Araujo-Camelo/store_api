const Carts = require("../models/carts");
const ProductsInCart = require("../models/products_in_cart");
const Products = require("../models/products");
class CartServices {
  static async createCart(userId) {
    try {
      Carts.create({ userId });
    } catch (error) {
      throw error;
    }
  }

  static async getCart(userId) {
    try {
      const result = await Carts.findOne({
        where: {
          userId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "user_id"],
        },
        include: {
          model: ProductsInCart,
          as: "products",
          attributes: ["id", "productId", "quantity", "price"],
          include: {
            model: Products,
            as: "product",
            attributes: ["name"],
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateTotalPrice(id, totalPrice) {
    try {
      await Carts.update(
        { totalPrice },
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
}

module.exports = CartServices;
