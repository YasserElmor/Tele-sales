const express              =  require('express'),
    router                 =  express.Router(),
    passport               =  require('passport'),
    User                   =  require('../models/user'),
    dotenv                 = require('dotenv'),
    config                 = dotenv.config({path: '../.env'})

//NEW Route (login form)
router.get("/login",(req,res)=>{
  res.render("login", {pageTitle: "Login", path: '/login'});
})

//Login Logic
router.post("/login",
  passport.authenticate("local",{
    successRedirect: "/clients",
    failureRedirect: "/login",
  }),
  (req,res)=>{
})

//Logout Logic
router.get("/logout",(req,res)=>{
  req.logout();
  res.render("clients/enquire", {pageTitle: "Enquiry", path: '/clients'});
})



  module.exports = {
    router: router
  }
