const { updateProductSchema } = require("../validaty/product.schema");
const validateUpdateProduct = (req, res, next) => {
    const result = updateProductSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Os dados de atualização do produto não são válidos",
            errors: result.error.issues.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }
    req.body = result.data;
    next();
};
module.exports = validateUpdateProduct;
