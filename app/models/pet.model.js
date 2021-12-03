const mongoose = require("mongoose");

const Pet = mongoose.model(
  "Pet",
  new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    weight: Number,
    color: String,
    missing:{
      type: Boolean,
      default: false,
    },
    img:{
        data: Buffer,
        contentType: String
    }
  })
);

module.exports = Pet;