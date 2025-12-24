// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");

// Public routes (no auth needed as per your request)
router.get("/stats", getAdminStats);
router.get("/orders", getAllOrders);
router.patch("/orders/:id/status", updateOrderStatus);

module.exports = router;
