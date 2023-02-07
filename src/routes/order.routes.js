const { Router } = require("express");
const { getUserOrders } = require("../controllers/order.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/order/{uid}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all user's orders
 *     tags: [Orders]
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
 *               $ref: '#/components/schemas/getUserOrdersResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error / This user has no orders
 */

router.get("/:uid", getUserOrders);

module.exports = router;
