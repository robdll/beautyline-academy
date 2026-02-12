const express = require("express");
const cors = require("cors");
const Router = require("./routes/user.router");
const morgan = require("morgan");
const connectDB = require("./config/DBmongo");
const User = require("./model/user.model");
require("dotenv").config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(morgan("common"));
app.use("/", Router);


app.post('/usuarios', async (req, res) => {
    try {

      const novoUsuario = await User.create(req.body);
      res.status(201).json(novoUsuario);

    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
});



app.listen(PORT, () => {
    console.log("Server running in port ", PORT)
})

