const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const morgan = require("morgan");
const connectDB = require("./config/DBmongo");
require("dotenv").config();

connectDB();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors())
app.use(express.json());
app.use(morgan("common"));
app.use("/", authRouter);
app.use("/", userRouter);



app.listen(PORT, () => {
  console.log("Server running in port ", PORT)
})

