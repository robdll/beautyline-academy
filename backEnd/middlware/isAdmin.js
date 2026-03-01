const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
    next();
};

module.exports = isAdmin;
