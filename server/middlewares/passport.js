var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../models/user');

module.exports = function(passport) {
	passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, function verify(email, password, done) {
		userModel.findOne({ email }).then(function(err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false, { message: 'Invalid credentials' }); }
	
			if(user.password != password) { return done(null, false, { message: 'Invalid credentails' }); }
	
			return done(null, user);
		});
	}));

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	  	});
	
	passport.deserializeUser(function (id, done) {
		userModel.findById(id, function (err, user) {
		  	done(err, user);
		});
	});
}