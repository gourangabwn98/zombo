// seedMenu.js
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");
require("dotenv").config();

const menuData = [
  {
    name: "Polau + Chicken",
    description: "Full plate polau with juicy chicken curry",
    price: 99,
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80",
  },
  {
    name: "Polau + Aloo Dom",
    description: "Aromatic polau with spicy potato curry",
    price: 69,
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
  },
  {
    name: "Steam Rice + Chicken",
    description: "Steamed rice with rich chicken gravy",
    price: 79,
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
  },
  {
    name: "Steam Rice + Aloo Dom",
    description: "Light rice with homestyle aloo dom",
    price: 49,
    category: "Main Course",
    img: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80",
  },
];

const seedDB = async () => {
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(menuData);
  console.log("Menu seeded successfully!");
  process.exit();
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    seedDB();
  })
  .catch((err) => console.log(err));
