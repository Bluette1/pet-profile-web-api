const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet"
      }
    ]
  })
);

module.exports = User;
