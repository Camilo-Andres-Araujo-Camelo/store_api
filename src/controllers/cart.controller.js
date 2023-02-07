const CartServices = require("../services/cart.services");
const OrdersServices = require("../services/order.services");
const ProductsServices = require("../services/product.services");
const ProductsInOrdersServices = require("../services/productInOrder.services");
const ProductsInCartServices = require("../services/productsInCart.services");
const UserServices = require("../services/user.services");
const transporter = require("../utils/mailer");

const addProduct = async (req, res) => {
  try {
    const { uid } = req.params;
    const { id: productId, quantity: quantityOrdered } = req.body;
    const getCartResult = await CartServices.getCart(uid);
    const { dataValues: DVCartResult } = getCartResult;

    //verificar stock /////////////
    const productResult = await ProductsServices.getById(productId);
    const { dataValues: DVProductResult } = productResult;
    if (quantityOrdered > DVProductResult.availableQty) {
      res
        .status(400)
        .json({ message: "the quantity ordered is greater than the stock" });
      return;
    }
    //verificar stock /////////////
    //Verificando existencia de Product_in_cart
    const { id } = DVCartResult;
    const productAndCart = await ProductsInCartServices.getProductAndCart(
      id,
      productId
    );

    if (!productAndCart) {
      // objeto para nuevo productInCart
      const productInCart = {
        cartId: DVCartResult.id,
        productId: productId,
        quantity: quantityOrdered,
        price: DVProductResult.price,
      };
      // Creando nuevo productInCart
      await ProductsInCartServices.addProductInCart(productInCart);
    } else {
      //Modificando product_in_cart
      const { dataValues: DVProductsAndCart } = productAndCart;
      const newQuantity = quantityOrdered + DVProductsAndCart.quantity;
      await ProductsInCartServices.updateProductInCart(
        DVProductsAndCart.id,
        newQuantity
      );
    }

    /////Sumando totalPrice a cart///////////////
    const { totalPrice: initialTotalPrice } = DVCartResult;
    const finalTotalPrice =
      initialTotalPrice + DVProductResult.price * quantityOrdered;
    await CartServices.updateTotalPrice(DVCartResult.id, finalTotalPrice);

    ////// agregando compra precio total al carrito
    const getCartWithTotalPrice = await CartServices.getCart(uid);
    const { dataValues: DVgetCartWithTotalPrice } = getCartWithTotalPrice;

    ////// Sustrayendo productos comprados del stock
    const newStock = DVProductResult.availableQty - quantityOrdered;
    await ProductsServices.subtractProducts(productId, newStock);
    if (newStock === 0) {
      ProductsServices.updateProduct(productId);
    }

    ////// Solicitando nuevo stock para response
    const newStockProductResult = await ProductsServices.getById(productId);
    const { dataValues: DVnewStock } = newStockProductResult;

    ///// Response
    res.status(201).json({
      message: "product added to cart",
      cartInfo: DVgetCartWithTotalPrice,
      addedProduct: DVnewStock,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getuserProducts = async (req, res) => {
  try {
    const { uid } = req.params;
    const result = await UserServices.getUserCart(uid);
    res.status(200).json({
      message: "Products in cart",
      userInfo: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const purchase = async (req, res) => {
  try {
    const { uid } = req.params;
    const result = await CartServices.getCart(uid);
    const { dataValues: DVCartResult } = result;
    const { totalPrice, id, products } = DVCartResult;
    const user = await UserServices.getUserById(uid);

    if (totalPrice === 0) {
      res.status(400).json({ message: "No products in the cart" });
    } else {
      // Creando nueva orden,
      const newOrder = {
        totalPrice,
        userId: uid,
      };
      const result = await OrdersServices.createOrder(newOrder);
      const { dataValues: DVCreateOrderResult } = result;

      products.forEach((product) => {
        const newProductInOrder = {
          orderId: DVCreateOrderResult.id,
          productId: product.dataValues.id,
          quantity: product.dataValues.quantity,
          price: product.dataValues.price,
        };
        ProductsInOrdersServices.createProductInOrder(newProductInOrder);
      });
      await ProductsInCartServices.empty(id);
      await CartServices.updateTotalPrice(id, 0);
      res.status(201).json({ message: "completed purchase" });
      await transporter.sendMail({
        to: user.dataValues.email,
        from: "caac9530@gmail.com",
        subject: "Purchase confirmation",
        html: `<h1> Successful purchase </h1>
        
        `,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getuserProducts,
  purchase,
};
