var express 		= require("express"),
	app				= express(),
    bodyParser 		= require("body-parser");

//require routes
var routes = require("./routes/routes");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//using routes
app.use("/", routes);

app.listen(process.env.PORT || 4000, function(){
    console.log("Server Started !!");
});