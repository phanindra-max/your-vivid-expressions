var express 		= require("express"),
	router  		= express.Router(),
	mongoose 		= require("mongoose"),
	passport 		= require("passport")
	User 			= require("../models/user");

//index routes
router.get ("/", function (req, res) {
	res.render("landing");
});

router.get("/temp", isLoggedIn,function(req, res){
	res.render("temp");
});

router.get("/temp/1", isLoggedIn, function(req, res){
	res.render("index");
	// res.render("realsecret");
});

router.get("/temp/realsecret", isLoggedIn, function(req, res){
	res.render("realsecret");
});

//============
//Auth Routes
//============
router.get("/login", function(req, res){
	res.render("login");
});

router.get("/logout", function(req, res){
	req.logout();
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.redirect("/temp");
});


router.post("/login",passport.authenticate("local", {
	successRedirect: "/temp",
	failureRedirect: "/login",
	// failureFlash: "Dobbindi Roiii!!!"
}) , function(req, res){
});

router.get("/signup", function(req, res){
	res.render("signup");
});

router.post("/signup", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register({username: req.body.username}, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			res.redirect("/signup");
		}
		passport.authenticate("local")(req, res, function(err, user){
			res.redirect("/temp");
		});
	});
});

//middleware
function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;