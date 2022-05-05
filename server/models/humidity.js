const mongoose = require('mongoose');

const humiditySchema = new mongoose.Schema({
	// mongoose generate _id field by default
	value: {
		type: Number,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

const humidityModel = mongoose.model('temps', humiditySchema);

module.exports = humidityModel;
