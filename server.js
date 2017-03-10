const express = require("express");
const zipdb = require("zippity-do-dah");
const forecastIo = require("forecastio");
const path = require("path");

const app = express();
const weatherApi = new forecastIo("20b9c9a0a4a8a4807953227f96cd8d21")
const port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
})
app.get(/^\/(\d{5})$/, function(req, res, next){
	var zipcode = req.params[0];
	var location = zipdb.zipcode(zipcode);
	if(!location){
		next()
	}

	var latitude = location.latitude;
	var longitude = location.longitude;

	weatherApi.forecast(latitude, longitude, function(err, position){
		if(err){
			next();
		}
		res.json({
			temperature: position.currently.temperature,
			summary: position.currently.summary,
			at: position.timezone
		})
	})
})

app.use(function(req, res, next){
	res.status(404).render("404");
})

app.listen(port, function(){
	console.log("Server Running on Port "+port)
})