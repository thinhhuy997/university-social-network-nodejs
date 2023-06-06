
const mongoose = require("mongoose");

const Thongbao = mongoose.model(
  "Thongbao",
  new mongoose.Schema({
    id_user: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    chuyenmuc: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "Chuyenmuc"
    },
    tieude_thongbao: String,
    noidung_thongbao: String,
    created_at: { type: Date, default: Date.now }
  })
);

module.exports = Thongbao;
