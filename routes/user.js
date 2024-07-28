const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require('passport');
const {saveRedirectUrl} = require("../middlewares.js");

const userController = require("../Controller/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signUp));

// router.get("/signup" , userController.renderSignupForm)
//// Project- Phase 2 (Part d)
// SignUp User - Post
// router.post("/signup" , wrapAsync(userController.signUp));

router.route("/login")
.get( userController.renderLoginForm)
.post(saveRedirectUrl  , 
    passport.authenticate("local" , 
        {failureRedirect: '/login' , 
            failureFlash: true }) ,
 userController.login);

// router.get("/login" , userController.renderLoginForm);

// router.post("/login" , saveRedirectUrl  , 
//     passport.authenticate("local" , 
//         {failureRedirect: '/login' , 
//             failureFlash: true }) ,
//  userController.login);

router.get("/logout" , userController.logOut);

module.exports = router;
