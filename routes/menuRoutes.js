// routes/menuRoutes.js
const express = require("express");
const {
  getMenuItems,
  getMenuItemById,
} = require("../controllers/menuController");

const router = express.Router();

// GET /api/menu
router.get("/", getMenuItems);

// GET /api/menu/:id
router.get("/:id", getMenuItemById);

module.exports = router;
