const express = require("express");
const authController = require("../controllers/auth")

const router = express.Router();

router.get("/logout", authController.getLogout);

module.exports = router;
