const { Router } = require("express");
const {
  addProduct,
  getuserProducts,
  purchase,
} = require("../controllers/cart.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/cart/addproduct/{uid}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: add product to user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: integer
 *           minimun: 1
 *         description: user Id
 *     requestBody:
 *       description: Required files to add product to user's cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addToCart'
 *     responses:
 *       201:
 *         description: added product to user cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/addToCartResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error / the quantity ordered is greater than the stock
 * /api/v1/cart/getproducts/user/{uid}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all products in user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: integer
 *           minimun: 1
 *         description: user Id
 *     responses:
 *       201:
 *         description: Products in user's cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getAllProductsResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error / No products in the cart
 * /api/v1/cart/purchase/user/{uid}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: get all products in user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: integer
 *           minimun: 1
 *         description: user Id
 *     responses:
 *       201:
 *         description: Products in user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: completed purchase
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error
 */

router.post("/addproduct/:uid", addProduct);
router.get("/getproducts/user/:uid", getuserProducts);
router.post("/purchase/user/:uid", purchase);

module.exports = router;
