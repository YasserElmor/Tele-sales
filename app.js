const express                = require('express'),
      app                    = express(),
      bodyParser             = require('body-parser'),
      mongoose               = require('mongoose'),
      clientRouter           = require('./routes/clients'),
      courseRouter           = require('./routes/courses'),
      authRouter             = require('./routes/index'),
      path                   = require('path'),
      methodOverride         = require('method-override'),
      passport               = require('passport'),
      localStrategy          = require('passport-local'),
      User                   = require('./models/user'),
      expressSession         = require('express-session')
//database setup
mongoose.connect('mongodb://localhost:27017/tele',{
   useFindAndModify: false,
   useCreateIndex: true,
   useNewUrlParser:true,
  useUnifiedTopology: true
 }).then(
  ()=>{console.log("connected")},
  err =>{console.log("err",err);}
);

//Passport Config
app.use(expressSession({
  secret            : "Secret Test",
  resave            : false,
  saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// User.register(new User({username: "yasser"}), "password");
app.use((req, res, next)=>{
  res.locals.user = req.user;
  next()
})


//middlewares
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public"))); //statically accessing the filesystem instead of the routes
app.set('view engine','ejs');
app.use("/clients", clientRouter.router)
app.use("/courses", courseRouter.router)
app.use(authRouter.router);

//Root Directory
app.get("/", (req, res, next)=>{
  res.render("clients/enquire", {pageTitle: "Enquiry", path: '/clients'});
})

//Error Directory
app.get("*",(req, res, next)=>{
  res.send("<h1>Error 404 <br>Page Not Found</h1>");
});

//server setup
app.listen(3000,'127.0.0.1',()=>{
  console.log("Server Started!");
});
