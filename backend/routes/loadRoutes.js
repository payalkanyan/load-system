const express = require("express");
const { createLoad, getLoads, placeBid, getBids } = require("../controllers/loadController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createLoad);
router.get("/", getLoads);
router.post("/bid", authMiddleware, placeBid); // 🔥 Fix here
router.get("/:loadId/bids", authMiddleware, getBids);

module.exports = router;
