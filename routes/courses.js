const express = require("express"),
      router  = express.Router(),
      Course  = require('../models/course'),
      Client  = require('../models/client')


//NEW Route -- shows the form to add a new course
router.get("/new", (req, res, next)=>{
  res.render('courses/new', {pageTitle: "Add Course", path:"/courses/new"});
})

//CREATE Route -- Adds a new course to the DB
router.post("/", (req, res, next)=>{
  let course = req.body.course;
  Course.collection.insertOne({name: course})
  res.render("clients/enquire", {pageTitle:"Enquiry", path:"/clients"});
})



module.exports = {
  router: router
}
