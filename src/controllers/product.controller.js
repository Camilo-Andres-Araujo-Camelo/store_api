const ProductServices = require("../services/product.services");

const create = async (req, res) => {
  try {
    const product = req.body;
    const { availableQty } = product;
    availableQty ? (product.status = true) : (product.status = false);
    const result = await ProductServices.create(product);
    if (result) {
      res.status(201).json({
        message: "Product created",
        ProductInfo: {
          name: result.name,
          price: result.price,
          quantity: result.available_qty,
          available: result.status,
          createBy: result.user_id,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAvailables = async (req, res) => {
  try {
    const result = await ProductServices.getAvailables();
    res.status(200).json({
      message: "All products available",
      result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAvailables,
};
