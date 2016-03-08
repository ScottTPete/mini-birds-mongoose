var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sightingSchema = new Schema({
	name: {
		type: String,
		lowercase: true,
	},
	order: {
		type: String,
		maxLength: 20
	},
	staus: {
		type: String,
		lowercase: true,
		enum: [
			"extinct",
			"near threatened",
			"least concerned"
		]
	},
	confirmed: {
		type: Boolean,
		default: false
	},
	numberSeen: {
		type: Number,
		min: 13
	}
});

module.exports = mongoose.model("Sighting", sightingSchema);