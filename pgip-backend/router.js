const express = require("express");
const router = express.Router();

// Sample route
router.get("/", (req, res) => {
  res.send("Hello from router!");
});

module.exports = router;
