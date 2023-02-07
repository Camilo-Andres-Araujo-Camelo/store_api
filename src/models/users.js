const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

/**
 * @openapi
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: mike@gmail.com
 *         userName:
 *           type: string
 *           example: mike
 *         password:
 *           type: string
 *           example: 12345
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: mike@gmail.com
 *         password:
 *           type: string
 *           example: 12345
 *     loginResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 4
 *         email:
 *           type: string,
 *           example: mike@gmail.com
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const User = db.define(
  "users",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "user_name",
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        const { password } = user;
        const hash = bcrypt.hashSync(password, 10);
        user.password = hash;
      },
    },
  }
);

module.exports = User;
