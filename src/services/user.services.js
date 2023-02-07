const Carts = require("../models/carts");
const Products = require("../models/products");
const ProductsInCar = require("../models/products_in_cart");
const Users = require("../models/users");

class UserServices {
  static async getUserById(id) {
    try {
      const result = Users.findByPk(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserCart(id) {
    try {
      const result = await Users.findOne({
        where: {
          id,
        },
        attributes: ["id", "userName", "email"],
        include: {
          model: Carts,
          as: "cart",
          attributes: ["id", "totalPrice"],
          include: {
            model: ProductsInCar,
            as: "products",
            attributes: ["productId", "quantity"],
            include: {
              model: Products,
              as: "product",
              attributes: ["name", "price"],
            },
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
