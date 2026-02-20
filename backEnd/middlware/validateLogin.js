const { loginSchema } = require("../validaty/login.schema");

const validateLogin = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Login data is invalid",
            errors: result.error.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }

    req.body = result.data;
    next();
};

module.exports = validateLogin;

