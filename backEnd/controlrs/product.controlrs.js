
const Product = require("../model/productDB.model");
const { ERROR_MESSAGES, SUCCESS_MESSAGES, DUPLICATED_PRODUCT_CODE } = require("../constants/message.constants");
const logger = require("../config/logger");
const { productCreated, productUpdated, productDeleted, productFound, productsFound } = require("../utils/loggerSucces.utils");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            logger.info(SUCCESS_MESSAGES.PRODUCT_FOUND);
            return res.status(200).json([]);
        }
        res.status(200).json(products);
        productsFound(products, SUCCESS_MESSAGES.PRODUCT_FOUND);

    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            logger.error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }
        res.status(200).json(product);
        productFound(product, SUCCESS_MESSAGES.PRODUCT_FOUND);

    } catch (err) {
        if (err.name === "CastError") {
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID, error: err.message });
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
        productCreated(savedProduct, SUCCESS_MESSAGES.PRODUCT_CREATED);
        res.status(201).json(savedProduct);

    } catch (err) {
        if (err.name === "ValidationError") {
            logger.error(ERROR_MESSAGES.INVALID_PRODUCT_DATA, { error: err.message });
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_PRODUCT_DATA,
                details: err.errors
            });
        }

        if (err.code === DUPLICATED_PRODUCT_CODE) {
            logger.error(ERROR_MESSAGES.DUPLICATED_PRODUCT, { error: err.message });
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_PRODUCT
            });
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
            logger.error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }
        productUpdated(result, SUCCESS_MESSAGES.PRODUCT_UPDATED);
        res.status(200).json(result);

    } catch (err) {
        if (err.name === "ValidationError") {
            logger.error(ERROR_MESSAGES.INVALID_PRODUCT_DATA, { error: err.message });
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_PRODUCT_DATA,
                details: err.errors
            });
        }

        if (err.name === "CastError") {
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID, error: err.message });
        }

        if (err.code === DUPLICATED_PRODUCT_CODE) {
            logger.error(ERROR_MESSAGES.DUPLICATED_PRODUCT, { error: err.message });
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_PRODUCT
            });
        }

        logger.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (!result) {
            logger.error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }
        productDeleted(result, SUCCESS_MESSAGES.PRODUCT_DELETED);
        res.status(200).send(SUCCESS_MESSAGES.PRODUCT_DELETED);

    } catch (err) {
        if (err.name === "CastError") {
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID, error: err.message });
        }

        logger.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
