const { userSchema } = require("../validaty/user.schema");

const validateUser = (req, res, next) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: result.error.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }

    req.body = result.data;
    next();
};


module.exports = validateUser;
