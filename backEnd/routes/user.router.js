const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllrs/user.controlrs");


router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);


router.put("/user", (req, res) => {
    res.json({ message: "Rota não permitida, adicione um id" });
});

router.delete("/user", (req, res) => {
    res.json({ message: "Rota não permitida, adicione um id" });
});


module.exports = router;
