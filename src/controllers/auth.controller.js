const AuthServices = require("../services/auth.services");
const transporter = require("../utils/mailer");
const CartServices = require("../services/cart.services");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      const { id } = result;
      await CartServices.createCart(id);
      res.status(201).json({ message: "user created" });
      await transporter.sendMail({
        to: result.email,
        from: "caac9530@gmail.com",
        subject: "email confirmation",
        html: `<h1>Bienvenido a mi app ${result.userName}, gracias por registrarte, tu correo de login es ${result.email} </h1>`,
      });
    } else {
      res.status(400).json({ message: "something wrong" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "missing data",
        message: "No email provided",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "missing data",
        message: "No password provided",
      });
    }
    const result = await AuthServices.login({ email, password });
    if (result.isValid) {
      const { username, id, email } = result.user;
      const userData = { username, id, email };
      const token = await AuthServices.genToken(userData);
      userData.token = token;
      res.json(userData);
    } else {
      res.status(400).json("user not found");
    }
  } catch (error) {
    res.status(400).json({ message: "something wrong" });
  }
};

module.exports = {
  register,
  login,
};
