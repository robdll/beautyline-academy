const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllrs/user.controlrs");
const { validateUser } = require("../validaty/user.schema");
const { requireAuth } = require("../middleware/auth");

router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", validateUser, createUser);
router.put("/user/:id", requireAuth, validateUser, updateUser);
router.delete("/user/:id", requireAuth, deleteUser);


router.put("/user", (req, res) => {
    res.json({ message: "Route not allowed, add an id" });
});

router.delete("/user", (req, res) => {
    res.json({ message: "Route not allowed, add an id" });
});


module.exports = router;
