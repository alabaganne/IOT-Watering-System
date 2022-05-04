const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
	// mongoose generate _id field by default
	temp: {
		type: Number,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

const tempModel = mongoose.model('temps', tempSchema);

module.exports = tempModel;
