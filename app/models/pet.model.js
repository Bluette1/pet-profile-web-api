const mongoose = require("mongoose");

const Pet = mongoose.model(
  "Pet",
  new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    weight: Number,
    color: String,
    missing: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
  })
);

module.exports = Pet;
