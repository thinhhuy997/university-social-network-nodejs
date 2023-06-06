const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;


verifyToken = (req, res, next) => {
  let token = req.cookies.token
  console.log(token)

  if (!token) {
      return res.redirect('/login')
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.redirect('/login')
    }
    req.userId = decoded.id;
    next();
  });
};

isSinhVien = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    
    Role.findOne(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log(role)
        console.log(role.name)
        if (role.name === "SinhVien") {
          console.log('tai khoan la sinh vien')
          next();
          return;
        }
      
        
        return res.redirect('/sinhvien/login')
   
      }
    );
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

      
        if (role.name === "Admin") {
          next();
          return;
        }
      

        return res.redirect('/login')
      }
    );
  });
};

isPhongKhoa = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

      
        if (role.name === "PhongKhoa") {
        
          next();
          return;
        }
        

        return res.redirect('/login')
      }
    );
  });
};
const authJwt = {
  verifyToken,
  isSinhVien,
  isAdmin,
  isPhongKhoa
};
module.exports = authJwt;
