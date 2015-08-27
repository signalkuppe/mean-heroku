var express = require('express'), // express
		mongoose = require('mongoose'), // mongoose wrapper per mongo
		bodyParser = require('body-parser'), // body parser middleware
		app = express(), // l'app di express
		mongoDev = 'mongodb://@localhost/arch',
		mongoProd = process.env.MONGOLAB_URI,
		mongoUrl =  process.env.NODE_ENV ? mongoProd : mongoDev;
		connect = function () {
		  var options = { server: { socketOptions: { keepAlive: 1 } } };
		  mongoose.connect(mongoUrl, options);
		},
		ModelSchema = require('./server/models/model'), // schema d esempio di Mongoose
		ModelRoutes = require('./server/routes/model'); // le routes del modello di esempio
		ModelApi = require('./server/api/model'); // le api del modello di esempio

// Connetti to mongodb
connect();
mongoose.connection.on('error', function(err) { // se fallisce segnala
	throw err;
});
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('open', function () {
	console.info('connesso al database',mongoUrl);
});

// usa body parser per accettare le POST
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client'));

// CRUD
app.post('/rest/model', ModelRoutes.create);
app.get('/rest/model', ModelRoutes.read);
app.put('/rest/model/:id', ModelRoutes.update);
app.delete('/rest/model/:id', ModelRoutes.delete);

// API
app.get('/api/model/:limit?', ModelApi.list);



// ascolta sulla porta...
app.listen(process.env.PORT || 3000);
