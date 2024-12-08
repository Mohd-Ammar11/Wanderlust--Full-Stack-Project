const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res) => {
    try{
     let {username, email, password} = req.body;
     const newUser = new User({email, username});
     const registeredUser = await User.register(newUser, password);  // 
     console.log(registeredUser);
 
     req.login(registeredUser, (err) => {  // login user automatically if sign up 
         if(err) {
             return next(err);
         }
         req.flash("success", "Welcome to Wanderlust");
         res.redirect("/listings");
     });
 
    } catch(err){
     req.flash("error", err.message);
     res.redirect("/signup");
    }
 };


 module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";    // defined in middleware.js
    res.redirect(redirectUrl);     
};


module.exports.logout = (req, res, next) => {
    req.logOut((err) => {  // req.logOut -> passport function
        if(err) {
           return next(err);
        }    
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};