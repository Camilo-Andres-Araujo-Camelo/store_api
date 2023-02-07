const { Op } = require("sequelize");
const Products = require("../models/products");
const Users = require("../models/users");

class ProductServices {
  static async create(product) {
    try {
      const result = await Products.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAvailables() {
    try {
      const result = await Products.findAll({
        where: {
          availableQty: { [Op.gt]: [0] },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "user_id"],
        },
        include: {
          model: Users,
          as: "user", // alias colocado en initModels
          attributes: ["userName"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = Products.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "user_id",
            "status",
            "userId",
            "img",
          ],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async subtractProducts(id, availableQty) {
    try {
      await Products.update(
        { availableQty },
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

  static async updateProduct(id) {
    try {
      await Products.update(
        { status: "Out of stock" },
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

module.exports = ProductServices;
