var express = require('express'), // express
		mongoose = require('mongoose'), // mongoose wrapper per mongo
		bodyParser = require('body-parser'), // body parser middleware
		app = express(), // l'app di express
  	path = require('path'), // il modulo path di node,
		databaseName = 'arch', // il database dell'app
		databaseHost = 'localhost', // l'host del db,
		mongoDev = 'mongodb://@localhost/arch',
		mongoProd = 'mongodb://heroku_w16xlmt2:8gssbg5gdq0jsfcik56kkdncps@ds035703.mongolab.com:35703/heroku_w16xlmt2',
		mongoUrl =  process.env.NODE_ENV === true ? mongoProd : mongoDev;
		connect = function () {
		  var options = { server: { socketOptions: { keepAlive: 1 } } };
		  mongoose.connect(mongoUrl, options);
		},
		ModelSchema = require('./server/models/model'), // schema d esempio di Mongoose
		ModelRoutes = require('./server/routes/model'); // le routes del modello di esempio

console.log('mongo url',mongoUrl)
// Connetti to mongodb
connect();
mongoose.connection.on('error', function(err) { // se fallisce segnala
	throw err;
});
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('open', function () {
	console.info('connesso al database "'+databaseName+'" sull\'host: '+databaseHost+'');
});

// usa body parser per accettare le POST
app.use(bodyParser.json())
// usa questo come percorso per le risorse statiche
app.use('/', express.static(path.join(__dirname, 'client/html')));
// usa anche questo per beccare le index
app.use('/', express.static(path.join(__dirname, 'client')));



app.post('/rest/model', ModelRoutes.save);
app.get('/rest/model', ModelRoutes.get);
app.put('/rest/model/:id', ModelRoutes.put);
app.delete('/rest/model/:id', ModelRoutes.delete);



// ascolta sulla porta...
app.listen(process.env.PORT || 3000);
