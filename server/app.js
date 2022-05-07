const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const userModel = require('./models/user');
const tempModel = require('./models/temp');
const port = 3000;

// app.set('trust proxy', 1) // trust first proxy
app.set('view engine', 'ejs');

// connect to mongodb cloud db
async function main() {
	await mongoose.connect('mongodb+srv://alabaganne:ala50101959@cluster0.xga5n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
	console.log('successfully connected to cloud database');
}
main().catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, done) {
	userModel.findOne({ email }, function(err, user) {
		if(err) return done(err);
		if(!user) return done(null, false);
		if(user.password != password) return done(null, false);
		return done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(id, done) {
	userModel.findById(id, function(err, user) {
		done(err, user);
	});
})

// login
app.get('/login', function(req, res) {
	return res.render('login');
});
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
	res.redirect('/dashboard');
});

app.get('/', function(req, res) {
	res.redirect('/login');
});

app.get('/dashboard', async function(req, res) {
	// get latest temp reading from db
	let currentTemp = await tempModel.findOne().sort('-created'); // latest temp value
	// render data to the user
	return res.render('index', { currentTemp });
});

app.post('/api/user', async function(req, res) {
	try {
		await userModel.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		});
	
		res.status(201).send('user created');
	} catch(err) {
		res.status(400).send(err);
	}
})

app.post('/api/temp', async function(req, res) {
	// retrieve temp value from req
	if(!req.body.value) {
		return res.status(422).send('temp value is required');
	}
	// save temp value in the db
	try {
		await tempModel.create({ value: req.body.value });
		res.status(201).send('temp created');
	} catch(err) {
		res.status(400).send(err);
	}
});

app.listen(port, function() {
	console.log('app is listening on port ' + port);
});