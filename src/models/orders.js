const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     getUserOrdersResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         totalPrice:
 *           type: double
 *           example: 140
 *         status:
 *           type: string
 *           example: purchased
 *         createdAt:
 *           type: string
 *           example: 2023-02-06T03:26:42.471Z
 *         user_id:
 *           type: integer
 *           example: 4
 */

const Orders = db.define("orders", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  totalPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    field: "total_price",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "purchased",
  },
});

module.exports = Orders;
