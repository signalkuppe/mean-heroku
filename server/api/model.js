var mongoose = require('mongoose'),
	Model = mongoose.model('Model');

// simple list api, with limit as an optional parameter
exports.list = function(req, res) {

	var limit = 0 || req.params.limit,
		query = Model.find().limit(limit);

	query.exec(function(err, result) {

		if (err) {
			res.status(400).send(err);
		} else {
			res.json(result)
		}
	});

};
