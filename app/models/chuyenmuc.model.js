const mongoose = require("mongoose");

const Chuyenmuc = mongoose.model(
  "Chuyenmuc",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Chuyenmuc;