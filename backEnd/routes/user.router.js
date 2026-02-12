const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const { userSchema } = require("../validations/user.validate");


router.get("/user/register", getUsers);
router.get("/user/register/:id", getUserById);
router.post("/user/register", validate(userSchema), createUser);
router.put("/user/register/:id", validate(userSchema), updateUser);
router.delete("/user/register/:id", deleteUser);


module.exports = router;
