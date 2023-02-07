const db = require("../utils/database");
const Carts = require("../models/carts");
const Orders = require("../models/orders");
const Products_in_cart = require("../models/products_in_cart");
const Products_in_order = require("../models/products_in_order");
const Products = require("../models/products");
const Users = require("../models/users");

const usersList = [
  {
    userName: "Pedro",
    email: "pedro@gmail.com",
    password: "12345",
  }, // user 1
  {
    userName: "Antonio",
    email: "antonio@gmail.com",
    password: "12345",
  }, // user 2
  {
    userName: "Jose",
    email: "jose@gmail.com",
    password: "1234",
  }, // user 3
];

const productsList = [
  {
    name: "Leche",
    price: 5,
    availableQty: 50,
    userId: 1,
    status: "Available",
    img: "http.imagenProducto1",
  }, // product 1
  {
    name: "Queso",
    price: 10,
    availableQty: 6,
    userId: 2,
    status: "Available",
    img: "http.imagenProducto2",
  }, // product 2
  {
    name: "Carne",
    price: 15,
    availableQty: 7,
    userId: 3,
    status: "Available",
    img: "http.imagenProducto3",
  }, // product 3
];

const cartsList = [
  {
    userId: 1,
    totalPrice: 0,
  }, // car 1 - user 1 - Pedro
  {
    userId: 2,
    totalPrice: 0,
  }, // car 2 - user 2 - Antonio
  {
    userId: 3,
    totalPrice: 0,
  }, // car 3 - user 3 - Jose
];

// const productInCartList = [
//   { carId: 1, productId: 1, quantity: 5, price: 25 }, // carrito 1 - leche 1 - precio 5
//   { carId: 2, productId: 1, quantity: 5, price: 25}, // carrito 2 - leche 1 - precio 5
//   { carId: 3, productId: 1, quantity: 5, price: 25 }, // carrito 3 - leche 1 - precio 5
//   { carId: 1, productId: 2, quantity: 5, price: 25 }, // carrito 1 - queso 2 - precio 10
//   { carId: 2, productId: 2, quantity: 5, price: 25 }, // carrito 2 - queso 2 - precio 10
//   { carId: 2, productId: 1, quantity: 5, price: 25 }, // carrito 2 - carne 3 - precio 15
//   { carId: 3, productId: 1, quantity: 5, price: 25 }, // carrito 3 - carne 3 - precio 15
// ];

// const orderList = [
//   { totalPrice: 0, userId: 1 }, // order_id: 1 - user 1
//   { totalPrice: 0, userId: 2 }, // order_id: 2 - user 2
//   { totalPrice: 0, userId: 3 }, // order_id: 3 - user 3
// ];

// const productInOrderList = [
//   { orderId: 1, productId: 1, quantity: 0, price: 0, status: false },
//   { orderId: 2, productId: 1, quantity: 0, price: 0, status: false },
//   { orderId: 3, productId: 1, quantity: 0, price: 0, status: false },
// ];

// db.sync( {alter:true} ) // Sincronizar y fuerza la alteración de las tablas
db.sync({ force: true })
  .then(() => {
    console.log("Iniciando la siembra de informacion");
    usersList.forEach((user) => Users.create(user));
    setTimeout(() => {
      productsList.forEach((product) => Products.create(product));
    }, 150);
    setTimeout(() => {
      cartsList.forEach((carInList) => Carts.create(carInList));
    }, 300);
    // setTimeout(() => {
    //   productInCartList.forEach((pc) => Products_in_cart.create(pc));
    // }, 450);
    // setTimeout(() => {
    //   orderList.forEach((ol) => Orders.create(ol));
    // }, 450);
    // setTimeout(() => {
    //   productInOrderList.forEach((pol) => Products_in_order.create(pol));
    // }, 450);
  })
  .catch((err) => console.log(err));
