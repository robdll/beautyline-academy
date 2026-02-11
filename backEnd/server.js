const express = require("express");
const cors = require("cors");
const Router = require("./routes/user.router");
const morgan = require("morgan");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(morgan("common"));
app.use("/", Router);




app.listen(PORT, () => {
    console.log("Server running in port ", PORT)
})

