const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controlrs/product.controlrs");
const auth = require("../middlware/auth");
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", auth, createProduct);
router.put("/product/:id", auth, updateProduct);
router.delete("/product/:id", auth, deleteProduct);
router.put("/product", (req, res) => {
    res.status(400).json({ message: "Route not allowed, add an id" });
});
router.delete("/product", (req, res) => {
    res.status(400).json({ message: "Route not allowed, add an id" });
});
module.exports = router;
