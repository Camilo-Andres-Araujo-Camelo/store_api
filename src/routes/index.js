const authRoutes = require("../routes/auth.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const AuthMiddleware = require("../middlewares/auth.middleware");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/product", AuthMiddleware, productRoutes);
  app.use("/api/v1/cart", AuthMiddleware, cartRoutes);
  app.use("/api/v1/order", orderRoutes);
};

module.exports = routerApi;
