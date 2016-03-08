var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.set('debug', true); //log connection methods
mongoose.connect('mongodb://localhost/more-fun');
mongoose.connection.once('open', function () {
	console.log("Connected to MongoDB");
})

var Sighting = require("./Sighting");


app.post("/api/sighting", function (req, res, next) {
	console.log("post")
	var sighting = new Sighting(req.body);
	sighting.save(function(err, s) {
		return err ? res.status(500).send(err) : res.send(s);
	});
});

app.get("/api/sighting", function (req, res, next) {
	console.log("get")
//	var query = req.query.status ? {status: req.query.status} : {}
	var query;
	if (req.query.status) {
		query = {status: req.query.status}
	} else {
		query = {};
	}
	Sighting.find({}, function(err, sightings) {
		return res.send(sightings);
	});
});

app.put("/api/sighting", function(req, res) {
	Sighting.findById(req.query.id, function(err, sighting) {
		Sighting.update(req.body, function(err, s) {
			if (err) {
				return res.status(500).send(err);
			} else {
				Sighting.findById(req.query.id, function(e, s) {
					return res.send(s);
				});
			}
		});
	});
});

app.delete("/api/sighting", function(req, res, next) {
	console.log("delete");
	Sighting.findByIdAndRemove(req.query.id, function(err, response){
		res.status(200).send("Success");
	})
});

app.listen(port, function(){
	console.log("listening")
});