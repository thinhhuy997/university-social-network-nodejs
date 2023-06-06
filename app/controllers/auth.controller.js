const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;




var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
 

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.role) {
      Role.find(
        {
          name: { $in: req.body.role }
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.role = role.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "SinhVien" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.role = [role._id];
      
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      console.log(user)
      if (err) {
        res.status(500).send({code:0, message: err });
        return;
      }

      if (!user) {
       
        return res.render('login',{username:req.body.username,password:req.body.password,errorMessege:"Tên tài khoản hoặc mật khẩu không chính xác" })
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        console.log('mk k chinh xasc')
        return res.render('login',{username:req.body.username,password:req.body.password,errorMessege:"Tên tài khoản hoặc mật khẩu không chính xác" })
       
      }
      console.log('chinh xasc')

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      authorities.push("ROLE_" + user.role.name.toUpperCase());
      
      let data = {
        'userId' : user.id,
        'username' : user.username,
        'displayName':user.displayName,
        'password':user.password,
        'email' : user.email,
        'lop':user.lop,
        'khoa':user.khoa,
        'avatar':user.avatar
      }
   
      res.cookie("token", token)
      res.cookie("data",data)

      if(authorities=='ROLE_PHONGKHOA'){
        return res.redirect('/phongkhoa/index')
      }else if(authorities == 'ROLE_ADMIN'){
        return res.redirect('/admin/index')
      }
      return res.status(200).send({
        code:1,
        data:{
          id: user._id,
          username: user.username,
          email: user.email,
          role: authorities,
          accessToken: token
        }
      });
    });
};

// sign in with gg
    // auth google
    const passport = require('passport');
    let userProfile;

    
    passport.serializeUser(function(user, cb) {
      cb(null, user);
      });
      passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
      });

    /*  Google AUTH  */
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const GOOGLE_CLIENT_ID = 'our-google-client-id';
    const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';
    passport.use(new GoogleStrategy({
      clientID: '555668602811-9on6ca5776v2v21oes7uioadbiu6t5j8.apps.googleusercontent.com',
      clientSecret: 'Tmfwf1h9DqF6Pufgw7bZSJiI',
      callbackURL: "http://localhost:8080/sinhvien/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        if (profile.id) {

          User.findOne({email: profile._json.email})
            .then((existingUser) => {
              if (existingUser) {
                done(null, existingUser);
              } else {
                  Role.findOne({name:"SinhVien"},(err,data) => {
                    if(err){
                      return res.send('loi role khong trung khop')
                    }
                    new User({
                 
                      username:profile.id,
                      email: profile._json.email,
                      role:data.id, // role sinh vien
                      displayName: profile.name.familyName + ' ' + profile.name.givenName
                      
                    })
                      .save()
                      .then(user => done(null, user));
                    
                })
               
              }
            })
        }
       
    }
    ));

exports.signinwithgoogle = passport.authenticate('google', { scope : ['profile', 'email'],  prompt : "select_account" })
exports.signinwithgooglecallback = (req, res) =>  res.redirect('/sinhvien/loginwithgooglesuccess') ;
exports.loginwithgooglesuccess =   (req, res) => {
  console.log('gg success')
  console.log(userProfile)
   // dang nhap
    
   let regex = /^[a-z0-9](\.?[a-z0-9]){5,}@student\.tdtu\.edu\.vn$/g
   let email = userProfile.emails[0].value
   
   console.log('match')
  
   let boolean = regex.test(email)
   if(boolean == false){
      return res.render('login',{username:'',password:'',errorMessege:"Vui lòng sử dụng email sinh viên TDTU" })

   }


  
  

    User.findOne({username:userProfile.id}).then(tmp =>{
      if(tmp){
        Role.findOne({_id:tmp.role}).then( existdata => {
          if(existdata){
            var token = jwt.sign({ id: tmp.id }, config.secret, {
              expiresIn: 86400 // 24 hours
            });
            var authorities = [];
            authorities.push("ROLE_" + existdata.name.toUpperCase());

         
            let data = {
              'userId':tmp.id,
              'avatar':tmp.avatar,
              'username':userProfile.id,
              'email': userProfile._json.email,
              'displayName': tmp.displayName,
              'lop':tmp.lop,
              'khoa':tmp.khoa
            }
          
            res.cookie("token", token)
            res.cookie("data",data)
          
            return res.redirect('/sinhvien/index')
        
          }else{
            return res.send({error:'co loi khi dang nhap voi role '+ tmp.role})
          }
      })
      }else{
          return res.send({error:'co loi khi dang nhap trong db'})
      }
    })
    
    
   
  };
      
exports.logout = (req, res) => {
 
  res.clearCookie('data')
  res.clearCookie('token') 

  res.redirect('/login')

};


    
  


