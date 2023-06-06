const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type:String,
      unique:true
    },
    displayName: String,
    email: { 
        type: String,
        unique: true,
    },
    password: String,
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      },
    chuyenmuc:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chuyenmuc",
    }],
    lop:String,
    khoa:String,
    avatar:String
   
  })
);

module.exports = User;
