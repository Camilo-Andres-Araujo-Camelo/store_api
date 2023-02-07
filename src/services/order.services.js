const Orders = require("../models/orders");

class OrdersServices {
  static async createOrder(newOrder) {
    try {
      const result = await Orders.create(newOrder);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserWithOrders(userId) {
    try {
      const result = await Orders.findOne({
        where: {
          userId,
        },
        attributes: {
          exclude: ["userId", "updatedAt"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrdersServices;
