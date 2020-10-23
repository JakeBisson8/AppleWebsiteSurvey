//application starts here
var express = require("express");
var app = express();

//controller
var controller = require("./survey-controller.js");

//set the template engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//fire controller
controller(app);

//listen to port
app.listen(3000);
console.log("Listening to port: 3000");