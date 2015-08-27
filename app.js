var express = require('express'), // express
		mongoose = require('mongoose'), // mongoose wrapper for mongo
		bodyParser = require('body-parser'), // body parser middleware
		app = express(), // express app
		mongoDev = 'mongodb://@localhost/arch', // dev mongo url
		mongoProd = process.env.MONGOLAB_URI, // prod mongo url (heroku env property)
		mongoUrl =  process.env.NODE_ENV ? mongoProd : mongoDev;
		connect = function () {
		  var options = { server: { socketOptions: { keepAlive: 1 } } };
		  mongoose.connect(mongoUrl, options);
		},
		ModelSchema = require('./server/models/model'), // Mongoose example schema
		ModelRoutes = require('./server/routes/model'); // model routes
		ModelApi = require('./server/api/model'); // model api

// Mongo connection
connect();
mongoose.connection.on('error', function(err) {
	throw err;
});
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('open', function () {
	console.info('connected to ',mongoUrl);
});

// use body parser
app.use(bodyParser.json())
// static assets are found in /client dir
app.use(express.static(__dirname + '/client'));

// CRUD
app.post('/rest/model', ModelRoutes.create);
app.get('/rest/model', ModelRoutes.read);
app.put('/rest/model/:id', ModelRoutes.update);
app.delete('/rest/model/:id', ModelRoutes.delete);

// API
app.get('/api/model/:limit?', ModelApi.list);



// listen on...
app.listen(process.env.PORT || 3000);
