const { authJwt } = require("../middlewares");
const usercontroller = require("../controllers/user.controller");
const admincontroller = require("../controllers/admin.controller");



const express = require('express')
const Router = express.Router()




Router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "token, Origin, Content-Type, Accept"
  );
  next();
});

Router.get("/api/test/all", usercontroller.allAccess);

Router.get("/index", [authJwt.verifyToken, authJwt.isAdmin], admincontroller.index);


Router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  usercontroller.adminBoard
);

// tao tai khoan cho phong khoa
// Router.post('/taotaikhoan', [authJwt.verifyToken, authJwt.isAdmin], admincontroller.taotaikhoan)
Router.post('/taotaikhoan', admincontroller.taotaikhoan)

Router.post('/phanquyen', admincontroller.phanquyen)


Router.post('/test', (req,res) => {
  console.log(req.body.username)
  return res.json({code:0,data:req.body.username})
})









module.exports = Router
