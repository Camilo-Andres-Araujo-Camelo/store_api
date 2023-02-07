const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: [
    "./src/routes/auth.routes.js",
    "./src/models/users.js",
    "./src/routes/cart.routes.js",
    "./src/models/carts.js",
    "./src/routes/order.routes.js",
    "./src/models/orders.js",
    "./src/routes/product.routes.js",
    "./src/models/products.js",
  ],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Store API",
      version: "1.0.0",
      description: "API para una app de e-commerce",
    },
  },
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("api/v1/docs.json", (req, res) => {
    res.setHeader({ "Content-Type": "application/json" });
    res.send(swaggerSpec);
  });
  console.log(`Doc V1 disponible en http://localhost:${port}/api/v1/docs`);
};

module.exports = swaggerDocs;
