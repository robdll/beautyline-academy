const express = require("express");
const router = express.Router();
const userRouter = require("./user.router");
const productRouter = require("./product.router");
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Beautyline Academy API" });
});
router.use("/", userRouter);
router.use("/", productRouter);
module.exports = router;
