const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: [true, "Product Id is required"],
    unique: [true, "Id must be unique"],
  },
  title: {
    type: String,
    required: [true, "Please Enter task Name"],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    dafault: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
