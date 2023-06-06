const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    id_user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    time:{
      type:String
    },
    noidung:String
  })
);

module.exports = Comment;