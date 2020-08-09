const mongoose = require("mongoose");

//user model
const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "user",
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
