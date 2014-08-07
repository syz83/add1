module.exports = function(app) {

var mongoose = require('mongoose'); //require mongoose

// Create a Rank schema
var rankSchema = mongoose.Schema({
    place: Number,
    name: String,
    highscore: Number,
});

var Rank = mongoose.model('Rank', rankSchema, 'testData');

// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all ranks
	app.get('/api/ranks', function(req, res) {

		// use mongoose to get all ranks in the database
		Rank.find(function(err, ranks) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(ranks); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/ranks', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Rank.create({
			place: req.body.place,
    		name: req.body.name,
    		highscore: Number,
		}, function(err, rank) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, ranks) {
				if (err)
					res.send(err);
				res.json(ranks);
			});
		});

	});

	// delete a rank
	app.delete('/api/ranks/:rank_id', function(req, res) {
		Rank.remove({
			_id : req.params.rank_id
		}, function(err, rank) {
			if (err)
				res.send(err);

			// get and return all the ranks after you create another
			Todo.find(function(err, ranks) {
				if (err)
					res.send(err);
				res.json(ranks);
			});
		});
	});
};
