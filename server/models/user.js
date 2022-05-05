const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;