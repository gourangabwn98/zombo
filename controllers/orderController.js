// controllers/orderController.js
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    // Validate each item and fetch current price
    const validatedItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);

      if (!menuItem || !menuItem.available) {
        return res
          .status(404)
          .json({ message: `Item ${item.name} not available` });
      }

      if (menuItem.price !== item.price) {
        return res
          .status(400)
          .json({ message: "Price mismatch. Please refresh menu." });
      }

      validatedItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      });

      calculatedTotal += menuItem.price * item.quantity;
    }

    // Extra safety: match frontend total
    // if (Math.abs(calculatedTotal - totalAmount) > 1) {
    //   return res.status(400).json({ message: "Total amount mismatch" });
    // }

    const order = await Order.create({
      user: req.user._id,
      items: validatedItems,
      totalAmount: calculatedTotal,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ orderDate: -1 })
      .lean();

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
