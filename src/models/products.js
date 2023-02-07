const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 4
 *         name:
 *           type: string
 *           example: salchicha
 *         price:
 *           type: double
 *           example: 10
 *         availableQty:
 *           type: integer
 *           example: 30
 *         userId:
 *           type: integer
 *           example: 4
 *         img:
 *           type: string
 *           example: http.imagendesalchica
 *     createProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: salchicha
 *         price:
 *           type: double
 *           example: 10
 *         availableQty:
 *           type: integer
 *           example: 30
 *         userId:
 *           type: integer
 *           example: 4
 *         img:
 *           type: string
 *           example: http.imagendesalchica
 */

const Products = db.define("products", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  availableQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "available_qty",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Disponible",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Products;
