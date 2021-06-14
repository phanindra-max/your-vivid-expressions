var express 		= require("express"),
	router  		= express.Router();

//index route
router.get ("/", function (req, res) {
	res.render("realsecret");
});

module.exports = router;