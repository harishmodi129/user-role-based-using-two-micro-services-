const express = require("express");

const {
  register,
  login,
  validateToken,
} = require("../controller/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate", validateToken);

module.exports = router;
