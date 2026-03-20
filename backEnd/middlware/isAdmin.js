const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Acesso negado" });
    }
    next();
};

module.exports = isAdmin;
