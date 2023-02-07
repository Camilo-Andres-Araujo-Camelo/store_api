const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routerApi = require("./routes");
const db = require("./utils/database");
const initModels = require("./models/initModels");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
initModels();

routerApi(app);

// db.sync({ force: true })
db.sync()
  .then(() => console.log("base de datos sincronizada"))
  .catch((error) => console.log(error));

module.exports = app;
