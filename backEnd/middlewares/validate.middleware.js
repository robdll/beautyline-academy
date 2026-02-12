const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: err.errors.map(e => ({ path: e.path, message: e.message }))
        });
    }
};

module.exports = validate;
