const express = require("express");
const router = express.Router();


router.get("/user", (req, res) => {
    res.json({user: "user test"});
});


module.exports = router;
