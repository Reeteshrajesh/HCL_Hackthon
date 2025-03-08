const express = require("express");
const {
  findFastestRoute,
  findCheapestRoute,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/fastestroute", authMiddleware, findFastestRoute);
router.post("/cheapestroute", authMiddleware, findCheapestRoute);

module.exports = router;
