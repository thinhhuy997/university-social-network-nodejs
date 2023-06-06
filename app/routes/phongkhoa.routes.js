const { authJwt } = require("../middlewares");
const usercontroller = require("../controllers/user.controller");
const phongkhoacontroller = require("../controllers/phongkhoa.controller");
const express = require('express')
const Router = express.Router()

const Thongbao = require('../models/thongbao.model');
const Chuyenmuc = require("../models/chuyenmuc.model");
const User = require("../models/user.model");




Router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "token, Origin, Content-Type, Accept"
  );
  next();
});

Router.get("/api/test/all", usercontroller.allAccess);

Router.get("/index", [authJwt.verifyToken, authJwt.isPhongKhoa],phongkhoacontroller.index)

Router.get(
  "/api/test/phongkhoa",
  [authJwt.verifyToken, authJwt.isPhongKhoa],
  usercontroller.moderatorBoard
);



Router.put(
  "/capnhatmatkhau",
  // [authJwt.verifyToken, authJwt.isPhongKhoa],
  phongkhoacontroller.capnhatmatkhau
);

// api dang thong bao
// Router.post('/dangthongbao', (req, res) => {
//   const {tieude_thongbao, noidung_thongbao} = req.body
//   let thongbao = new Thongbao({
//       tieude_thongbao: tieude_thongbao,
//       noidung_thongbao: noidung_thongbao
//   })
//   thongbao.save((err,data) => {
//       if(err){
//           return res.json({code: 0, error:'co loi khi dang thong bao'})
//       }
//       return res.json({code: 200, data:data})
//   })
// })

Router.post('/dangthongbao', phongkhoacontroller.dangthongbao)

Router.post('/suathongbao', phongkhoacontroller.suathongbao)

Router.post('/xoathongbao', phongkhoacontroller.xoathongbao)
module.exports = Router
