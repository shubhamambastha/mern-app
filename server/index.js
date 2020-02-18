// Environment variables
require('dotenv').config()

// Importing packages
const express = require("express")
const bodyParser = require('body-parser')
const handle = require('./controllers/index.js')
const db = require('./models')
const routes = require('./routes')
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.json({hello: "world"});
})
app.use('/api/auth/', routes.auth)

app.use(handle.notFound);
app.use(handle.error)


db.connect()
	.then(function () {
		app.listen(PORT, ()=> {
			console.log(`Application started on PORT ${PORT}`);
			//console.log(process.env);
		}).on('error', (error)=> {
			console.log(`Unable to start app. Error >>>> ${error}`);
		});
	}).catch( (error)=> {
		console.log(`Failed to setup connecton with database ${error}`);
    });	