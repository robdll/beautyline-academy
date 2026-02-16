const express = require("express");
const router = express.Router();
const { login } = require("../controllrs/auth.controlrs");

router.post("/auth/login", login);

module.exports = router;
