
const Product = require("../model/productDB.model");
const { ERROR_MESSAGES, SUCCESS_MESSAGES } = require("../constants/message.constants");
const logger = require("../config/logger");

const DUPLICATED_PRODUCT_CODE = 11000;

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(200).json([]);
            logger.info(SUCCESS_MESSAGES.PRODUCT_FOUND);
        }
        res.status(200).json(products);
        logger.info(SUCCESS_MESSAGES.PRODUCT_FOUND, {
            id: products._id,
            name: products.name,
            price: products.price,
            category: products.category,
            tags: products.tags,
            stock: products.stock,
            brand: products.brand
        });

    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND, error: err.message });
            logger.error(ERROR_MESSAGES.PRODUCT_NOT_FOUND, { error: err.message });
        }
        res.status(200).json(product);
        logger.info(SUCCESS_MESSAGES.PRODUCT_FOUND, {
            id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            tags: product.tags,
            stock: product.stock,
            brand: product.brand
        });

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID, error: err.message });
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
        }
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
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
        logger.info(SUCCESS_MESSAGES.PRODUCT_CREATED, {
            id: savedProduct._id,
            name: savedProduct.name,
            price: savedProduct.price,
            category: savedProduct.category,
            tags: savedProduct.tags,
            stock: savedProduct.stock,
            brand: savedProduct.brand
        });
        res.status(201).json(savedProduct);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_PRODUCT_DATA,
                details: err.errors
            });
            logger.error(ERROR_MESSAGES.INVALID_PRODUCT_DATA, { error: err.message });
        }
        if (err.code === DUPLICATED_PRODUCT_CODE) {
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_PRODUCT
            });
            logger.error(ERROR_MESSAGES.DUPLICATED_PRODUCT, { error: err.message });
        }
        logger.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}
const updateProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true,
                context: "query",
            }
        );
        if (!result) {
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND, error: err.message });
            logger.error(ERROR_MESSAGES.PRODUCT_NOT_FOUND, { error: err.message });
        }
        logger.info(SUCCESS_MESSAGES.PRODUCT_UPDATED, {
            id: result._id,
            name: result.name,
            price: result.price,
            category: result.category,
            tags: result.tags,
            stock: result.stock,
            brand: result.brand
        });
        res.status(200).json(result);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_PRODUCT_DATA,
                details: err.errors
            });
            logger.error(ERROR_MESSAGES.INVALID_PRODUCT_DATA, { error: err.message });
        }
        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID, error: err.message });
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
        }
        if (err.code === DUPLICATED_PRODUCT_CODE) {
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_PRODUCT
            });
            logger.error(ERROR_MESSAGES.DUPLICATED_PRODUCT, { error: err.message });
        }
        logger.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND, error: err.message });
            logger.error(ERROR_MESSAGES.PRODUCT_NOT_FOUND, { error: err.message });
        }
        logger.info(SUCCESS_MESSAGES.PRODUCT_DELETED, {
            id: result._id,
            name: result.name,
            price: result.price,
            category: result.category,
            tags: result.tags,
            stock: result.stock,
            brand: result.brand
        });
        res.status(200).send(SUCCESS_MESSAGES.PRODUCT_DELETED);

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID, error: err.message });
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
        }
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
