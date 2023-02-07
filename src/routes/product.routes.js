const { Router } = require("express");
const { create, getAvailables } = require("../controllers/product.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/product/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create a new user into application
 *     tags: [Product]
 *     requestBody:
 *       description: Required files to create a new product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createProduct'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product created
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
 * /api/v1/product/availables:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all available products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: all available products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
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

router.get("/availables", getAvailables);
router.post("/create", create);

module.exports = router;
