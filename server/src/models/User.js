const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    username: {
      type: String,
      required: [true, "Username is required"],

      // unique is not a validator hence wont use a message as argument
      unique: true,
      trim: true,
      validate: {
        validator: (value) => {
          return validator.matches(value, /^[a-zA-Z0-9_]+$/);
        },

        message: "Username can only contain alphabets, numbers and underscores",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      validate: {
        validator: (value) => {
          return isEmail(value);
        },

        message: "Please enter a valid email address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      validate: {
        validator: (value) => {
          return isStrongPassword(value);
        },

        message:
          "Password must be of at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol",
      },
    },

    profilePicture: {
      type: String,
      default: "",
      trim: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  // when timestamps added,
  // mongoose auto adds createdAt, updatedAt fields
  { timestamps: true },
);

const User = new mongoose.model("User", userSchema);
module.exports = User;
