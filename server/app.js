const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ala50101959',
	database: 'watering'
});
connection.connect();


/*
	db name: watering
	db tables:
		temps: [id, temp, created]
*/

app.get('/', function(req, res) {
	// get temp from db
	connection.query(`
		SELECT temp AS current_temp
		FROM temps
		ORDER BY created
		LIMIT 1
	`, function(err, rows) {
		if(err) throw err;

		return res.render('index', { data: rows[0] });
	});
});

app.post('/', function(req, res) {
	// retrieve temp value from req
	const { temp } = req.body;
	if(!temp) {
		return res.send('temp is required');
	}
	// save temp value in the db
	connection.query('INSERT INTO temps (temp) VALUES (?)', temp, function(err, result) {
		if(err) throw err;

		return res.send(result);
	});
});

app.listen(port, function() {
	console.log('Watering app listening on port ' + port);
});