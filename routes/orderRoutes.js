// routes/orderRoutes.js
const express = require("express");
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/orders - Create order
router.post("/", protect, createOrder);

// GET /api/orders/myorders - Get user's orders
router.get("/myorders", protect, getMyOrders);

module.exports = router;
