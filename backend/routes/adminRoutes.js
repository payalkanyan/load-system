const express = require("express");
const { getAllUsers, getAllLoads, deleteUser } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);
router.get("/loads", authMiddleware, getAllLoads);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;  // ✅ Make sure it's `module.exports = router;`
