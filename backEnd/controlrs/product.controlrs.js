
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
        logger.info(SUCCESS_MESSAGES.PRODUCT_FOUND);

    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
            logger.error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
        }
        res.status(200).json(product);
        logger.info(SUCCESS_MESSAGES.PRODUCT_FOUND);

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
            logger.error(ERROR_MESSAGES.INVALID_ID);
        }
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
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
        logger.info(SUCCESS_MESSAGES.PRODUCT_CREATED);
        res.status(201).json(savedProduct);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_PRODUCT_DATA,
                details: err.errors
            });
            logger.error(ERROR_MESSAGES.INVALID_PRODUCT_DATA);
        }
        if (err.code === DUPLICATED_PRODUCT_CODE) {
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_PRODUCT
            });
            logger.error(ERROR_MESSAGES.DUPLICATED_PRODUCT);
        }
        logger.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
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
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }
        logger.info(SUCCESS_MESSAGES.PRODUCT_UPDATED);
        res.status(200).json(result);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_PRODUCT_DATA,
                details: err.errors
            });
            logger.error(ERROR_MESSAGES.INVALID_PRODUCT_DATA);
        }
        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
            logger.error(ERROR_MESSAGES.INVALID_ID);
        }
        if (err.code === DUPLICATED_PRODUCT_CODE) {
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_PRODUCT
            });
            logger.error(ERROR_MESSAGES.DUPLICATED_PRODUCT);
        }
        logger.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }
        logger.info(SUCCESS_MESSAGES.PRODUCT_DELETED);
        res.status(200).send(SUCCESS_MESSAGES.PRODUCT_DELETED);

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
            logger.error(ERROR_MESSAGES.INVALID_ID);
        }
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
