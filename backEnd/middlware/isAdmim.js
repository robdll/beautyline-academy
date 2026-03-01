const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accesso negato" });
    }
    next();
};

module.exports = isAdmin;