const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/login", controller.signin);
  // login cho toan bo
  app.get('/login',(req,res)=>{
    res.render('login',{username:'',password:''})
  })
  app.get("/logout",controller.logout)
  // auth google
const passport = require('passport');
app.use(passport.initialize());




app.get('/sinhvien/loginwithgooglesuccess', controller.loginwithgooglesuccess);
app.get('/sinhvien/error', (req, res) => res.send("error logging in"));



app.get('/sinhvien/auth/google', controller.signinwithgoogle );
app.get('/sinhvien/auth/google/callback',passport.authenticate('google', { failureRedirect: '/error' }) ,controller.signinwithgooglecallback)

}
