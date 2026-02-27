const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");
const connectDB = require("./config/DBmongo");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use(morgan("common"));
app.use(routes);
if (require.main === module) {
  require("dotenv").config();
  connectDB();
  app.listen(PORT, () => {
    console.log("Server running in port ", PORT)
  })
}
module.exports = app;
