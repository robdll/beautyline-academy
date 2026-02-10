const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.get("/teste", (req, res) => {
    res.json({ msg: "Hello word" })
})

app.listen(PORT, () => {
    console.log("Server running in port ", PORT)
})

