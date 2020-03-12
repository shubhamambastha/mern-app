// Environment variables
require('dotenv').config()

// Importing packages
const express = require("express")
const bodyParser = require('body-parser')
const handle = require('./controllers/index.js')
const db = require('./models')
const routes = require('./routes')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth/', routes.auth)
app.use('/api/poll/', routes.polls)
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use(handle.error)


db.connect()
	.then(function () {
		app.listen(PORT, () => {
			console.log(`Application started on PORT ${PORT}`);
		}).on('error', (error) => {
			console.log(`Unable to start app. Error >>>> ${error}`);
		});
	}).catch((error) => {
		console.log(`Failed to setup connecton with database ${error}`);
	});	