// // models/Order.js
// const mongoose = require("mongoose");

// const orderItemSchema = new mongoose.Schema({
//   menuItem: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "MenuItem",
//     required: true,
//   },
//   name: String, // Denormalized
//   price: Number,
//   quantity: Number,
// });

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     items: [orderItemSchema],
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: [
//         "Accepted",
//         "Preparing",
//         "Out for Delivery",
//         "Delivered",
//         "Cancelled",
//       ],
//       default: "Accepted",
//     },
//     orderDate: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);
// models/Order.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  name: String, // Denormalized for easier display
  price: Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    // === NEW: Delivery Address ===
    address: {
      type: String,
      required: true, // Make it mandatory since every order needs a delivery address
      trim: true,
    },
    // Optional: If you want to store discount separately
    discountApplied: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "Accepted",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Accepted",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
