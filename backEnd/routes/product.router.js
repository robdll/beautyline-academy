const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllrs/product.controlrs");
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product", (req, res) => {
    res.status(400).json({ message: "Route not allowed, add an id" });
});
router.delete("/product", (req, res) => {
    res.status(400).json({ message: "Route not allowed, add an id" });
});
module.exports = router;
