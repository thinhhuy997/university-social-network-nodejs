const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const sinhviencontroller = require("../controllers/sinhvien.controller");
const express = require('express')
const Router = express.Router()

// localstorage
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('/app/storage');

Router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "token, Origin, Content-Type, Accept"
  );
  next();
});

Router.get("/api/test/all", controller.allAccess);

Router.get("/api/test/sinhvien", [authJwt.verifyToken,authJwt.isSinhVien], controller.userBoard);

Router.get('/index',[authJwt.verifyToken,authJwt.isSinhVien],sinhviencontroller.index)



// set login sinhvien
Router.get('/login', (req,res) => {
  res.render('./sinhvien/authgoogle')
})
// end set login sinhvien
Router.put("/capnhatthongtin", sinhviencontroller.capnhatthongtin); // cap nhat thong tin

// Router.put("/capnhatthongtin", [authJwt.verifyToken,authJwt.isSinhVien], sinhviencontroller.capnhatthongtin); // cap nhat thong tin
Router.post("/dangbaiviet",sinhviencontroller.dangbaiviet)

Router.put("/suabaiviet", sinhviencontroller.suabaiviet); // cap nhat baiviet


Router.post("/xoabaiviet",sinhviencontroller.xoabaiviet)

Router.post("/commentbaiviet",sinhviencontroller.commentbaiviet)

Router.post("/chinhsuacomment",sinhviencontroller.chinhsuacomment)

Router.post("/xoacomment",sinhviencontroller.xoacomment)

Router.post('/TimKiemSinhVien',sinhviencontroller.TimKiemSinhVien)

module.exports = Router
