const express = require("express");
const path = require("path");
const router = express.Router();

//home page file 
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/index.html"));
});

// Serve register.html on GET /register
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/register.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/login.html"));
});

module.exports = router;
