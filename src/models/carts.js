const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     addToCart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 10
 *     addToCartResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: product added to cart
 *         cartInfo:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 4
 *             userId:
 *               type: integer
 *               example: 4
 *             totalPrice:
 *               type: double
 *               example: 60
 *             products:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   productId:
 *                     type: integer
 *                     example: 4
 *                   quantity:
 *                     type: integer
 *                     example: 6
 *                   price:
 *                     type: double
 *                     example: 5
 *                   product:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: leche
 *         addedProduct:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 4
 *             name:
 *               type: string
 *               example: leche
 *             price:
 *               type: double
 *               example: 5
 *             availableQty:
 *               type: integer
 *               example: 35
 *     getAllProductsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Products in cart
 *         userInfo:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 4
 *             userName:
 *               type: string
 *               example: Mike
 *             email:
 *               type: string
 *               example: mike@gmail.com
 *             cart:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 4
 *                 totalPrice:
 *                   type: double
 *                   example: 130
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: integer
 *                         example: 4
 *                       quantity:
 *                         type: integer
 *                         example: 6
 *                       product:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: leche
 *                           price:
 *                             type: double
 *                             example: 5
 */

const Carts = db.define("carts", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  totalPrice: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    field: "total_price",
  },
});

module.exports = Carts;
