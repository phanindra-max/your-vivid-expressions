var express 		= require("express"),
	app				= express(),
    mongoose 		= require("mongoose"),
    bodyParser 		= require("body-parser"),
    passport 		= require("passport"),
    LocalStrategy 	= require("passport-local"),
    User 			= require("./models/user");

//require routes
var routes = require("./routes/routes");

mongoose.connect("mongodb://localhost/pro1", { useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Yeah I'm a bad guy",
	resave: false,
	saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//for defining the user globally
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

//for clearing the user login cache
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//using routes
app.use("/", routes);

app.listen(4000, function(){
    console.log("Server Started bro!!");
    console.log("In the right place but reaching wrong destination?????")
});