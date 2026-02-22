const Product = require("../model/products.model");

const DUPLICATED_PRODUCT_CODE = 11000;

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(products);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching products" });
    }
}


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).json(product);

    } catch (err) {
        console.error(err);

        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        res.status(500).json({ message: "Error fetching product" });
    }
}


const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            subSubCategory,
            tags,
            stock,
            brand,
            image
        } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            subCategory,
            subSubCategory,
            tags,
            stock,
            brand,
            image
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid product data",
                details: err.errors
            });
        }

        if (err.code === DUPLICATED_PRODUCT_CODE) {
            return res.status(409).json({
                message: "Product name already exists"
            });
        }

        console.error(err);
        return res.status(500).json({ message: "Error creating product" });
    }
}


const updateProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                context: "query",
            }
        );

        if (!result) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).json(result);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid data",
                details: err.errors
            });
        }

        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        if (err.code === DUPLICATED_PRODUCT_CODE) {
            return res.status(409).json({
                message: "Product name already exists"
            });
        }

        return res.status(500).json({ message: "Internal error" });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send("Product deleted successfully");

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        console.error(err);
        res.status(500).json({ message: "Error deleting product" });
    }
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
