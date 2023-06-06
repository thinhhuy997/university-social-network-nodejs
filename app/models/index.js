const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.chuyenmuc = require("./chuyenmuc.model");
db.baiviet = require("./baiviet.model")
db.comment = require("./comment.model")
db.ROLES = ["SinhVien", "Admin", "PhongKhoa"];

module.exports = db;