const OrdersServices = require("../services/order.services");

const getUserOrders = async (req, res) => {
  try {
    const { uid } = req.params;
    const result = await OrdersServices.getUserWithOrders(uid);
    if (!result) {
      res.status(400).json({ message: "This user has no orders" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUserOrders,
};
