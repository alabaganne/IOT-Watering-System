const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tempModel = require('./models/temp');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb+srv://alabaganne:ala50101959@cluster0.xga5n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}

app.get('/', async function(req, res) {
	// get latest temp reading from db
	let temp = tempModel.find().sort('-created').limit(1);
	console.log(temp);
	// render data to the user
	return res.render('index', { data: rows[0] });
});

app.post('/', async function(req, res) {
	// retrieve temp value from req
	if(!req.body.temp) {
		return res.status(422).send('temp is required');
	}

	// save temp value in the db
	try {
		await tempModel.create({ name: req.body.temp });
		res.status(201).send('created');
	} catch(err) {
		res.status(400).send(err);
	}
});

app.listen(port, function() {
	console.log('app is listening on port ' + port);
});