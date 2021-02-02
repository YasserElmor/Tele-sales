const express = require("express"),
      router  = express.Router(),
      Client  = require('../models/client'),
      Course  = require('../models/course');

//SHOW Route -- renders the form to search for a specific client by his phone number
router.get("/", (req, res, next)=>{
  console.log(res.locals.user)
  res.render('clients/enquire', {pageTitle: "Enquiry", path: "/clients"});
})

//checking whether a certain user exists, if it does, render the show page, else render the create form
router.post("/", (req, res, next)=>{
  let number = req.body.number;
  Client.find({$or:[{phoneNumber1: number}, {phoneNumber2: number}, {phoneNumber3: number}]}, (err, clients)=>{
    if(err){
      console.log(err)
    }
    else{
      if(clients.length > 0 && number !== ""){
        res.render("clients/show", {clients: clients, pageTitle: `${(clients[0].name.split(" "))[0]}'s Data`, path:""})
      }
      else{
          Course.find({}, (err,courses)=>{
            res.render('clients/new', {number: number, courses:courses, pageTitle: "Insert", path: "/clients/new"})
          })
        }
      }
    })
})

//NEW Route -- renders the form to insert a new user to the DB
router.get("/new", (req, res, next)=>{
  Course.find({}, (err,courses)=>{
      res.render('clients/new', {
        number: '',
        courses: courses,
        pageTitle: "Insert",
        path: '/clients/new'
      });
  });
})

//CREATE Route --  submits a user to the DB
router.post("/new", (req, res, next)=>{
  let today = new Date;
  let date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  let client = {
        name          : req.body.name,
        age           : req.body.age,
        phoneNumber1  : req.body.phoneNumber1,
        phoneNumber2  : req.body.phoneNumber2,
        phoneNumber3  : req.body.phoneNumber3,
        qualification : req.body.qualification,
        occupation    : req.body.occupation,
        course        : req.body.courses,
        impression    : req.body.impression,
        notes         : req.body.notes,
        date          : date
      };

  Client.collection.insert(client,()=>{
    res.render("clients/enquire", {pageTitle: "Enquiry", path: '/clients'});
  });
});

//New FilterByCourse Page
router.get("/courses", (req, res, next) => {
  Course.find({}, (err,courses)=>{
    res.render("courses/filter", {courses: courses, pageTitle: "Filter By Course", path: "/clients/courses"});
  });
});

// Show By Course
router.post("/courses/:course", (req, res, next)=>{
  function capitalizeFirstLetter(word){
    capitalizedWord = word[0].toUpperCase()+word.slice(1);
    return capitalizedWord;
  };
  Client.find({$or:[{course: req.body.courses}, {course: capitalizeFirstLetter(req.body.courses)}]}, (err, clients)=>{
        res.render("clients/show", {clients: clients, pageTitle: `${capitalizeFirstLetter(req.body.courses)}'s Logs`, path:""});
  });
});

//Edit Route -- Edit a specific log
router.get("/:id/edit", (req, res, next)=>{
  Client.findById(req.params.id, (err, client)=>{
    Course.find({}, (err,courses)=>{
      res.render("clients/edit", {client: client, courses: courses, pageTitle: "Edit", path: ""});
    });
  });
});

//Update Route -- Submit the update to the DB
router.put("/:id", (req, res, next)=>{
  Client.findByIdAndUpdate(req.params.id, req.body.client, (err, client)=>{
      res.render("clients/enquire", {pageTitle: "Enquiry", path: '/clients'});
  });
});


module.exports = {
  router: router
};
