const { productSchema } = require("../validaty/product.schema");
const validateProduct = (req, res, next) => {
    const result = productSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Os dados do produto não são válidos",
            errors: result.error.issues.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }
    req.body = result.data;
    next();
};
module.exports = validateProduct;
