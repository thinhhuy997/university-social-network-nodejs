
const mongoose = require("mongoose");

const Baiviet = mongoose.model(
  "Baiviet",
  new mongoose.Schema({
    id_user: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    tieude:String,
    noidung:String,
    urlvideo:[{
      type:String
    }],
    urlImage:[{
      type:String
    }],
    id_comment:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }]
  })
);


module.exports = Baiviet;
