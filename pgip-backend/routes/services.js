const express = require("express");
const router = express.Router();

// Mock services
const services = [
  { id: 1, name: "Schemes", description: "Government Schemes" },
  { id: 2, name: "Exams", description: "Competitive Exam Notifications" },
  { id: 3, name: "Tax Updates", description: "Tax and Financial Updates" },
];

router.get("/", (req, res) => {
  res.json(services);
});

module.exports = router;
