require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const morgan = require("morgan");
const connectDB = require("./config/DBmongo");
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  process.env.FRONTEND_URL?.replace(/\/$/, ""),
  "http://localhost:5173",
  "http://127.0.0.1:5173"
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan("common"));
app.use("/api", userRouter);
app.use("/api", productRouter);

connectDB();

if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Server running in port ", PORT)
  })
}
module.exports = app;
