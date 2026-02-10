const express = require("express");
const cors = require("cors")

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json());

app.get("/teste", (req, res) => {
    res.json({ msg: "Hello word" })
})

app.listen(PORT, () => {
    console.log("Server running in port ", PORT)
})

