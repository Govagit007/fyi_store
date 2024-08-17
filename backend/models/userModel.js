const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    reuired: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 Characters"],
    minLength: [2, "Name must be atleast 4 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Yoyr Email"],
    unique: [true, "Email already registered"],
    validate: [validator.isEmail, "Please Enter valid Email"],
  },
  avatar: {
    url: {
      type: String,
    },
    cldId: {
      type: String,
    },
  },
  password: {
    type: String,
    required: [true, "Plese Enter Password"],
    minLength: [3, "Password atleast 8 characters"],
    select: false,
  },
  wishlist: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  cart: [
    {
      productId: {
        type: String,
      },
      title: {
        type: String,
      },
      image: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
