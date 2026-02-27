const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser, login } = require("../controlrs/user.controllers");
const validateUser = require("../middlware/validateUser");
const validateUpdate = require("../middlware/validateUpdate");
const validateLogin = require("../middlware/validateLogin");
const auth = require("../middlware/auth");

router.post("/login", validateLogin, login);

router.get("/user", auth, getUsers);
router.get("/user/:id", auth, getUserById);
router.post("/user", validateUser, createUser);
router.put("/user/:id", auth, validateUpdate, updateUser);
router.delete("/user/:id", auth, deleteUser);

router.put("/user", (req, res) => {
    res.json({ message: "Route not allowed, add an id" });
});
router.delete("/user", (req, res) => {
    res.json({ message: "Route not allowed, add an id" });
});
module.exports = router;
